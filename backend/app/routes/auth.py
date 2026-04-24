from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel

from app.security import create_access_token, get_current_user, verify_admin_credentials

router = APIRouter(prefix="/auth", tags=["auth"])


class LoginRequest(BaseModel):
    username: str
    password: str


@router.post("/login")
def login(payload: LoginRequest):
    if not verify_admin_credentials(payload.username, payload.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
        )

    token = create_access_token(payload.username)
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {"username": payload.username},
    }


@router.get("/me")
def me(current_user: dict = Depends(get_current_user)):
    return current_user
