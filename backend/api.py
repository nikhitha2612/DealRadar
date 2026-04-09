from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
import datetime
from database import get_db
from models import CachedScan, WatchlistItem, Notification, User
from scraper import PriceEngine

router = APIRouter()

@router.post("/auth/sync")
async def sync_user(user_data: dict, db: AsyncSession = Depends(get_db)):
    uid = user_data.get("uid")
    email = user_data.get("email")
    if not uid:
        raise HTTPException(status_code=400, detail="UID is required")
    
    stmt = select(User).where(User.id == uid)
    result = await db.execute(stmt)
    user = result.scalar_one_or_none()
    
    if not user:
        user = User(id=uid, email=email)
        db.add(user)
        await db.commit()
        await db.refresh(user)
    
    return user

@router.get("/auth/profile/{user_id}")
async def get_profile(user_id: str, db: AsyncSession = Depends(get_db)):
    stmt = select(User).where(User.id == user_id)
    result = await db.execute(stmt)
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("/auth/profile/{user_id}/settings")
async def update_settings(user_id: str, settings: dict, db: AsyncSession = Depends(get_db)):
    stmt = select(User).where(User.id == user_id)
    result = await db.execute(stmt)
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if "preferences" in settings:
        # Merge preferences
        new_prefs = user.preferences.copy() if user.preferences else {}
        new_prefs.update(settings["preferences"])
        user.preferences = new_prefs
        
    if "notification_settings" in settings:
        # Merge settings
        new_notifs = user.notification_settings.copy() if user.notification_settings else {}
        new_notifs.update(settings["notification_settings"])
        user.notification_settings = new_notifs
    
    await db.commit()
    return user

@router.get("/scan")
async def scan(query: str, db: AsyncSession = Depends(get_db)):
    if not query:
        raise HTTPException(status_code=400, detail="Query parameter is required")
        
    query_lower = query.lower().strip()
    
    # Check cache (1 hour expiry)
    stmt = select(CachedScan).where(CachedScan.query == query_lower)
    result = await db.execute(stmt)
    cached = result.scalar_one_or_none()
    
    if cached:
        # Check if expired (reducing to 900s = 15 minutes for fresher data)
        # OR if the cached result is a 'Fallback', skip it and re-scan
        is_fallback = "(Fallback)" in (cached.product_name or "")
        is_expired = (datetime.datetime.utcnow() - cached.timestamp).total_seconds() > 900
        
        if not is_expired and not is_fallback:
            return {
                "product_name": cached.product_name,
                "best_price": cached.best_price,
                "best_platform": cached.best_platform,
                "history": cached.history,
                "comparisons": cached.comparisons,
                "ai_data": cached.ai_data,
                "cached": True
            }
        else:
            print(f">>> Bypassing Cache for {query_lower}: Expired={is_expired}, Fallback={is_fallback}")
            
    # If not cached or expired, run scrape
    scraped_data = await PriceEngine.scan(query_lower)
    
    # Save to db
    if cached:
        cached.product_name = scraped_data["product_name"]
        cached.best_price = scraped_data["best_price"]
        cached.best_platform = scraped_data["best_platform"]
        cached.history = scraped_data["history"]
        cached.comparisons = scraped_data["comparisons"]
        cached.ai_data = scraped_data.get("ai_data")
        cached.timestamp = datetime.datetime.utcnow()
    else:
        new_scan = CachedScan(
            query=query_lower,
            product_name=scraped_data["product_name"],
            best_price=scraped_data["best_price"],
            best_platform=scraped_data["best_platform"],
            history=scraped_data["history"],
            comparisons=scraped_data["comparisons"],
            ai_data=scraped_data.get("ai_data")
        )
        db.add(new_scan)
        
    await db.commit()
    
    scraped_data["cached"] = False
    return scraped_data

@router.post("/watchlist")
async def add_to_watchlist(query: str, user_id: str, target_price: float = None, email: str = None, db: AsyncSession = Depends(get_db)):
    query_lower = query.lower().strip()

    # Auto-upsert user to avoid FK constraint violation if auth/sync was missed
    user_stmt = select(User).where(User.id == user_id)
    user_result = await db.execute(user_stmt)
    if not user_result.scalar_one_or_none():
        db.add(User(id=user_id))
        await db.commit()

    # Check if already in watchlist for THIS user
    check_stmt = select(WatchlistItem).where(WatchlistItem.query == query_lower, WatchlistItem.user_id == user_id)
    existing = await db.execute(check_stmt)
    if existing.scalar_one_or_none():
        return {"message": "Item already in watchlist"}

    # Get latest data from scan/cache
    stmt = select(CachedScan).where(CachedScan.query == query_lower)
    result = await db.execute(stmt)
    cached = result.scalar_one_or_none()

    if not cached:
        # Trigger a scan if no cache exists
        data = await PriceEngine.scan(query_lower)
        product_name = data["product_name"]
        best_price = data["best_price"]
        best_platform = data["best_platform"]
        best_url = data.get("best_url", "")
    else:
        product_name = cached.product_name
        best_price = cached.best_price
        best_platform = cached.best_platform
        # Best URL might not be in older caches, we'll try to find it in comparisons
        # or just fallback to the query search if missing
        best_url = ""
        if cached.comparisons:
            for c in cached.comparisons:
                if c.get("site") == best_platform:
                    best_url = c.get("url", "")
                    break

    new_item = WatchlistItem(
        user_id=user_id,
        query=query_lower,
        product_name=product_name,
        best_price=best_price,
        best_platform=best_platform,
        best_url=best_url,
        target_price=target_price,
        email=email
    )
    db.add(new_item)
    await db.commit()
    return {"message": "Added to watchlist", "item": product_name}

@router.get("/watchlist")
async def get_watchlist(user_id: str, db: AsyncSession = Depends(get_db)):
    stmt = select(WatchlistItem).where(WatchlistItem.user_id == user_id)
    result = await db.execute(stmt)
    items = result.scalars().all()
    return items

# NOTE: /watchlist/report must come BEFORE /watchlist/{item_id} to avoid route shadowing
@router.get("/watchlist/report")
async def get_watchlist_report(user_id: str, db: AsyncSession = Depends(get_db)):
    stmt = select(WatchlistItem).where(WatchlistItem.user_id == user_id)
    result = await db.execute(stmt)
    items = result.scalars().all()
    
    if not items:
        return {"report": "Your watchlist is empty."}
        
    total_value = sum(item.best_price for item in items)
    count = len(items)
    
    report = f"# DealRadar Smart Watchlist Report\n\n"
    report += f"**Total Monitored Value:** ₹{total_value:,.2f}\n"
    report += f"**Total Items Tracked:** {count}\n\n"
    report += "| Product | Best Price | Platform |\n"
    report += "| :--- | :--- | :--- |\n"
    for item in items:
        report += f"| {item.product_name} | ₹{item.best_price:,.2f} | {item.best_platform} |\n"
        
    report += "\n\n*This report was generated automatically based on your tracked deals.*"
    return {"report": report, "total_value": total_value, "count": count}

@router.delete("/watchlist/{item_id}")
async def remove_from_watchlist(item_id: int, user_id: str, db: AsyncSession = Depends(get_db)):
    stmt = select(WatchlistItem).where(WatchlistItem.id == item_id, WatchlistItem.user_id == user_id)
    result = await db.execute(stmt)
    item = result.scalar_one_or_none()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found or access denied")
    await db.delete(item)
    await db.commit()
    return {"message": "Removed from watchlist"}

@router.get("/notifications")
async def get_notifications(user_id: str, db: AsyncSession = Depends(get_db)):
    try:
        stmt = select(Notification).where(Notification.user_id == user_id, Notification.is_read == False).order_by(Notification.created_at.desc())
        result = await db.execute(stmt)
        notifications = result.scalars().all()
        return [{"id": n.id, "message": n.message, "type": n.notification_type, "created_at": n.created_at} for n in notifications]
    except Exception as e:
        import traceback
        print("CRITICAL NOTIFICATION ERROR:", str(e))
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/notifications/mark-read")
async def mark_notifications_read(notification_ids: list[int], user_id: str, db: AsyncSession = Depends(get_db)):
    if not notification_ids:
        return {"message": "No IDs provided"}
    
    stmt = select(Notification).where(Notification.id.in_(notification_ids), Notification.user_id == user_id)
    result = await db.execute(stmt)
    notifications = result.scalars().all()
    
    for n in notifications:
        n.is_read = True
        
    await db.commit()
    return {"message": f"Marked {len(notifications)} notifications as read"}
