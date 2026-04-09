import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import declarative_base, sessionmaker

# Use absolute path so the DB location never depends on process CWD
_DB_DIR = os.path.dirname(os.path.abspath(__file__))
_DB_NAME = "dealradar_v3.db"

# On Vercel, the filesystem is read-only except for /tmp
if os.environ.get("VERCEL"):
    DATABASE_PATH = os.path.join("/tmp", _DB_NAME)
else:
    DATABASE_PATH = os.path.join(_DB_DIR, _DB_NAME)

DATABASE_URL = os.getenv("DATABASE_URL", f"sqlite+aiosqlite:///{DATABASE_PATH}")


engine = create_async_engine(DATABASE_URL, echo=False)
AsyncSessionLocal = sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)

Base = declarative_base()

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
