import os
from dotenv import load_dotenv
from datetime import timedelta
load_dotenv()

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-key-please-change'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///vikasana.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = 'your_jwt_secret_key'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=15)
    WTF_CSRF_ENABLED = False
    JWT_COOKIE_CSRF_PROTECT = False
    JWT_COOKIE_SECURE = False  # Allow cookies over HTTP for localhost
    JWT_TOKEN_LOCATION = ["cookies"]
    JWT_COOKIE_SAMESITE = "Lax"