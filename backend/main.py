from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from contextlib import asynccontextmanager
import uvicorn
from dotenv import load_dotenv
import os

# Importar routers
from api.v1.quotes import router as quotes_router
from api.v1.products import router as products_router
from api.v1.hubspot import router as hubspot_router
from api.v1.analytics import router as analytics_router

# Cargar variables de entorno
load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("🚀 Iniciando MaqOn API...")
    yield
    # Shutdown
    print("👋 Cerrando MaqOn API...")

# Crear aplicación FastAPI
app = FastAPI(
    title="MaqOn API",
    description="API para el sistema de cotizaciones de MaqOn",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Frontend Next.js
        "http://localhost:1337",  # Strapi CMS
        os.getenv("FRONTEND_URL", "https://maqon.com"),
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configurar hosts confiables
app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=[
        "localhost",
        "127.0.0.1",
        os.getenv("ALLOWED_HOSTS", "maqon.com").split(",")
    ]
)

# Incluir routers
app.include_router(quotes_router, prefix="/api/v1/quotes", tags=["quotes"])
app.include_router(products_router, prefix="/api/v1/products", tags=["products"])
app.include_router(hubspot_router, prefix="/api/v1/hubspot", tags=["hubspot"])
app.include_router(analytics_router, prefix="/api/v1/analytics", tags=["analytics"])

@app.get("/")
async def root():
    return {
        "message": "Bienvenido a la API de MaqOn",
        "version": "1.0.0",
        "status": "active"
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": "2024-01-01T00:00:00Z"
    }

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
