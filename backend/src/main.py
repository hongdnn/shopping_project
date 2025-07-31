from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.configuration import Base, engine
from .routers import user, category, product

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_headers=['*'],
    allow_methods=['*'],
)

Base.metadata.create_all(bind=engine)
app.include_router(user.router)
app.include_router(category.router)
app.include_router(product.router)

@app.get('/')
async def check():
    return { 'result': 'OK'}

