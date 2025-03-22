from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from .routers import users, accounts, deals, auth
from .database.config import engine
from .models.base import Base
from .utils.telegram_auth import verify_telegram_auth

app = FastAPI(
    title="TrustyTrade API",
    description="API для сервиса безопасной торговли игровыми аккаунтами",
    version="1.0.0"
)

# Настройка CORS для telegram.org
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://telegram.org",
        "https://*.telegram.org",
        "https://telegram-web-app.js.org",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Настройка CORS для Telegram Mini App
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://web.telegram.org"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Добавляем middleware для проверки Telegram авторизации
@app.middleware("http")
async def telegram_auth_middleware(request: Request, call_next):
    await verify_telegram_auth(request)
    response = await call_next(request)
    return response

# Подключаем роутеры
app.include_router(auth.router, prefix="/api/v1", tags=["auth"])
app.include_router(users.router, prefix="/api/v1", tags=["users"])
app.include_router(accounts.router, prefix="/api/v1", tags=["accounts"])
app.include_router(deals.router, prefix="/api/v1", tags=["deals"])

@app.on_event("startup")
async def startup():
    """Создаем таблицы при запуске приложения"""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

@app.get("/")
async def root():
    """Корневой эндпоинт"""
    return {
        "name": "TrustyTrade API",
        "version": "1.0.0",
        "status": "running"
    } 