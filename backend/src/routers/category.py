from fastapi import APIRouter
from pydantic import BaseModel
from src.models import Category
from src.configuration import db_dependency, user_dependency

router = APIRouter(
    prefix='/categories',
    tags=['categories']
)

class CreateRequest(BaseModel):
    name: str
    image: str

@router.post('/')
async def createCategory(db: db_dependency, request: CreateRequest, current_user: user_dependency):
    category = Category(name=request.name, image=request.image)
    db.add(category)
    db.commit()
    db.refresh(category)
    return category

@router.get('/')
async def getCategories(db: db_dependency, current_user: user_dependency):
    return db.query(Category).all()