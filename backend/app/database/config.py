from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

# Загружаем переменные окружения
load_dotenv()

# Параметры подключения к БД
DB_USER = os.getenv("DB_USER", "trustytrade")
DB_PASSWORD = os.getenv("DB_PASSWORD", "trustytrade")
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_NAME = os.getenv("DB_NAME", "trustytrade_db")

# URL для подключения к БД
DATABASE_URL = f"postgresql+asyncpg://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# Создаем асинхронный движок SQLAlchemy
engine = create_async_engine(DATABASE_URL, echo=True)

# Создаем фабрику асинхронных сессий
AsyncSessionLocal = sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False,
)

async def get_db() -> AsyncSession:
    """Функция-генератор для получения асинхронной сессии БД"""
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close() 