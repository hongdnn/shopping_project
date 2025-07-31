from fastapi import APIRouter
from pydantic import BaseModel
from src.models import Product
from src.configuration import db_dependency, user_dependency
from sqlalchemy.orm import joinedload

router = APIRouter(
    prefix='/products',
    tags=['products']
)

class CreateRequest(BaseModel):
    name: str
    image: str
    starRating: float
    price: float
    categoryId: int

@router.post('/')
async def createCategory(db: db_dependency, request: CreateRequest, current_user: user_dependency):
    product = Product(name=request.name, image=request.image, starRating=request.starRating,
                       price=request.price,category_id=request.categoryId)
    db.add(product)
    db.commit()
    db.refresh(product)
    return product

@router.get('/')
async def getProducts(db: db_dependency, current_user: user_dependency):
    return db.query(Product).options(joinedload(Product.category)).order_by(Product.id).all()

@router.get('/{product_id}')
async def getProductDetail(db: db_dependency, product_id: int, current_user: user_dependency):
    return db.query(Product).filter(Product.id == product_id).options(joinedload(Product.category)).first()