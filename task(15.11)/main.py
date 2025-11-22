from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine
from models import Base
from routers import items, users, chatgpt

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="FastAPI + ChatGPT Integration",
    description="CRUD приложение с роутингом и ChatGPT",
    version="2.0.0"
)

# CORS: разрешаем dev-frontend на 5173
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(items.router)
app.include_router(users.router)
app.include_router(chatgpt.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to FastAPI CRUD API with ChatGPT Integration"}

@app.get("/health")
def health_check():
    return {"status": "healthy", "version": "2.0.0"}
