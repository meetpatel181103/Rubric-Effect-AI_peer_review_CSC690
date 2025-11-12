from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    # Add more as you need (DB URL, API keys, etc)
    ENV: str = "dev"
    OPENAI_API_KEY: str | None = None
    DATABASE_URL: str | None = None

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

settings = Settings()
