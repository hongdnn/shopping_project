# Models
from typing import Optional
from pydantic import BaseModel
from sqlalchemy import Column, Float, ForeignKey, Integer, String
from src.configuration import Base
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True)
    password = Column(String)

class Category(Base):
    __tablename__ = "categories"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    image = Column(String)
    
class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    image = Column(String)
    starRating = Column(Float)
    price = Column(Float)
    category_id = Column(Integer, ForeignKey('categories.id'))
    category = relationship('Category')

# Pydantic
class Token(BaseModel):
    access_token: str
    token_type: str
