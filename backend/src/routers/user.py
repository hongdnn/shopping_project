from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel
from src.models import Token, User
from src.configuration import db_dependency, get_password_hash, verify_password
from dotenv import load_dotenv
import os
from jose import jwt

router = APIRouter(
    prefix='/users',
    tags=['users']
)

load_dotenv()

SECRET_KEY = os.getenv('SECRET_KEY')
ALGORITHM = os.getenv('ALGORITHM')
ACCESS_TOKEN_EXPIRE_MINUTES = os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES')

class UserCreateRequest(BaseModel):
    name: str
    email: str
    password: str

    
class UserResponse(BaseModel):
    id: int
    email: str
    name: str
    
def create_access_token(data: dict):
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

@router.post('/register', response_model=UserResponse)
async def register(db: db_dependency, request: UserCreateRequest):
    check = db.query(User).filter(User.email == request.email).first()
    if check:
        raise HTTPException(
            status_code=400,
            detail= {'error': 'Email exists'}
        )
    hash_passord = get_password_hash(request.password)
    user = User(name=request.name, email=request.email, password=hash_passord)
    db.add(user)
    db.commit()
    db.refresh(user)
    
    return user

@router.post('/login', response_model=Token)
async def login(db: db_dependency, form_data: OAuth2PasswordRequestForm = Depends()):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid email or password",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    encode = { 'id': user.id, 'name': user.name, 'email': user.email }
    expire = datetime.now(timezone.utc) + timedelta(minutes=int(ACCESS_TOKEN_EXPIRE_MINUTES))
    encode.update({'exp': expire})
    token = create_access_token(data=encode)
    
    return Token(access_token=token, token_type='bearer')

    