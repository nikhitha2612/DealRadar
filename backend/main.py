from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import asyncio
import os
from sqlalchemy.future import select

from database import engine, Base, AsyncSessionLocal
from api import router as api_router
from models import WatchlistItem, Notification
from scraper import PriceEngine

app = FastAPI(title="DealRadar API")

# Setup CORS (Keeping for development flexibility, though redundant in unified serving)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory set to prevent duplicate alerts for the same item reaching the target
notified_targets = set()

async def price_monitor_task():
    while True:
        try:
            async with AsyncSessionLocal() as session:
                # Fetch all watchlist items that have a target price
                stmt = select(WatchlistItem).where(WatchlistItem.target_price.isnot(None))
                result = await session.execute(stmt)
                items = result.scalars().all()

                for item in items:
                    if item.id in notified_targets:
                        continue
                    
                    # Scan price (which creates mock realistic fluctuations)
                    scraped_data = await PriceEngine.scan(item.query)
                    new_best = scraped_data["best_price"]

                    # Update db if needed
                    item.best_price = new_best
                    await session.commit()

                    if new_best <= item.target_price:
                        # Target hit
                        msg = f"Target Reached for {item.product_name}! Now available at ₹{new_best:,.2f} on {scraped_data['best_platform']}"
                        new_notif = Notification(message=msg, notification_type="target", user_id=item.user_id)
                        session.add(new_notif)
                        await session.commit()
                        notified_targets.add(item.id)
                        
                        # Simulate Email/SMS Notification
                        if item.email:
                            print("\n=========================================================")
                            print(f"📧 EMAIL & SMS ALERT DISPATCHED TO: {item.email}")
                            print(f"Subject: Deal Alert! {item.product_name} dropped to ₹{new_best:,.2f}")
                            print(f"Body: Hello! Your targeted product just hit your price objective.")
                            print(f"Check {scraped_data['best_platform']} immediately to securely purchase.")
                            print("Direct Link: " + scraped_data['best_url'])
                            print("=========================================================\n")
                        
        except Exception as e:
            print(f"Error in price monitor task: {e}")
            
        await asyncio.sleep(15) # Check every 15 seconds for demo

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    asyncio.create_task(price_monitor_task())

# Include API routes
app.include_router(api_router, prefix="/api")

# Serve Frontend Static Files
frontend_dist = os.path.join(os.path.dirname(__file__), "..", "frontend", "dist")

if os.path.exists(frontend_dist):
    # Mount assets folder for static files
    app.mount("/assets", StaticFiles(directory=os.path.join(frontend_dist, "assets")), name="assets")

    # Catch-all route to serve index.html for any frontend route
    @app.get("/{full_path:path}")
    async def serve_frontend(full_path: str):
        # Ignore calls to favicon or other direct public files if needed, but index.html is the fallback
        return FileResponse(os.path.join(frontend_dist, "index.html"))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
