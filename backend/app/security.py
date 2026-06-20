from datetime import datetime, timedelta
import hashlib

from jose import jwt
import bcrypt

from backend.app.models import User
from backend.app.config import (
    SECRET_KEY,
    ALGORITHM,
    ACCESS_TOKEN_EXPIRE_MINUTES
)


def _normalize_password(password: str) -> bytes:
    password_bytes = password.encode("utf-8")
    if len(password_bytes) > 72:
        password_bytes = hashlib.sha256(password_bytes).digest()
    return password_bytes


def hash_password(password: str) -> str:
    password_bytes = _normalize_password(password)
    password_hash = bcrypt.hashpw(password_bytes, bcrypt.gensalt())
    return password_hash.decode("utf-8")


def verify_password(
    plain_password: str,
    hashed_password: str
):
    password_bytes = _normalize_password(plain_password)
    return bcrypt.checkpw(
        password_bytes,
        hashed_password.encode("utf-8")
    )


def authenticate_user(
    db,
    email: str,
    password: str
):
    user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if not user:
        return None

    if not verify_password(
        password,
        user.password_hash
    ):
        return None

    return user


def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({"exp": expire})

    return jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )