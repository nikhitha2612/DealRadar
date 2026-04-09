from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, JSON, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True) # Firebase UID
    email = Column(String, unique=True, index=True)
    preferences = Column(JSON, default={"theme": "dark", "currency": "INR"})
    notification_settings = Column(JSON, default={"email": True, "browser": True})
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    watchlist = relationship("WatchlistItem", back_populates="user", cascade="all, delete-orphan")
    notifications = relationship("Notification", back_populates="user", cascade="all, delete-orphan")

class CachedScan(Base):
    __tablename__ = "cached_scans"

    id = Column(Integer, primary_key=True, index=True)
    query = Column(String, index=True, unique=True)
    product_name = Column(String)
    best_price = Column(Float)
    best_platform = Column(String)
    history = Column(JSON)
    comparisons = Column(JSON)
    ai_data = Column(JSON, nullable=True)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

class WatchlistItem(Base):
    __tablename__ = "watchlist_items"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), index=True)
    query = Column(String, index=True) # Search term tracked
    product_name = Column(String)
    best_price = Column(Float)
    best_platform = Column(String)
    best_url = Column(String) # Direct link to the retailer
    target_price = Column(Float, nullable=True)
    email = Column(String, nullable=True)
    added_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="watchlist")

class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), index=True)
    message = Column(String)
    notification_type = Column(String, default="target") # e.g. 'target', 'info', 'success', 'warning'
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="notifications")
