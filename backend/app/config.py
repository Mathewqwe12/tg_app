from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    """Настройки приложения"""
    database_url: str = "sqlite+aiosqlite:///./trustytrade.db"
    bot_token: str = ""  # Добавить в .env

    model_config = SettingsConfigDict(env_file=".env")

settings = Settings() 