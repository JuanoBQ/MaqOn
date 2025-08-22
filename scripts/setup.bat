@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo 🚀 Iniciando instalación de MaqOn...
echo Este script configurará tu entorno de desarrollo completo.
echo.

echo [STEP] Verificando prerrequisitos...

REM Verificar Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js no está instalado
    echo Por favor, instala Node.js 18+ desde: https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [INFO] Node.js !NODE_VERSION! encontrado ✓

REM Verificar npm
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm no está instalado
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo [INFO] npm !NPM_VERSION! encontrado ✓

REM Verificar Git
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Git no está instalado
    echo Por favor, instala Git desde: https://git-scm.com/
    pause
    exit /b 1
)

echo [INFO] Git encontrado ✓

REM Verificar Docker (opcional)
docker --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [INFO] Docker encontrado ✓
) else (
    echo [WARNING] Docker no está instalado (opcional para desarrollo local)
)

echo.
echo [STEP] Instalando dependencias del frontend...
cd frontend
call npm install
if %errorlevel% equ 0 (
    echo [INFO] Dependencias del frontend instaladas correctamente ✓
) else (
    echo [ERROR] Error al instalar dependencias del frontend
)
cd ..

echo.
echo [STEP] Instalando dependencias del CMS...
cd cms

REM Limpiar node_modules si existe
if exist node_modules (
    echo [INFO] Limpiando node_modules existente...
    rmdir /s /q node_modules
    if exist package-lock.json del package-lock.json
)

call npm install
if %errorlevel% equ 0 (
    echo [INFO] Dependencias del CMS instaladas correctamente ✓
) else (
    echo [ERROR] Error al instalar dependencias del CMS
)
cd ..

echo.
echo [STEP] Instalando dependencias del backend...
cd backend

REM Verificar si Python está instalado
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [INFO] Python encontrado ✓
    
    REM Crear entorno virtual
    if not exist venv (
        echo [INFO] Creando entorno virtual Python...
        python -m venv venv
    )
    
    REM Activar entorno virtual
    echo [INFO] Activando entorno virtual...
    call venv\Scripts\activate.bat
    
    REM Instalar dependencias
    call pip install -r requirements.txt
    if %errorlevel% equ 0 (
        echo [INFO] Dependencias del backend instaladas correctamente ✓
    ) else (
        echo [WARNING] Error al instalar dependencias del backend
    )
) else (
    echo [WARNING] Python no está instalado. Backend será omitido.
)
cd ..

echo.
echo [STEP] Creando archivos de configuración...

REM Crear .gitignore
if not exist .gitignore (
    (
        echo # Dependencies
        echo node_modules/
        echo */node_modules/
        echo */venv/
        echo */__pycache__/
        echo *.pyc
        echo.
        echo # Build outputs
        echo .next/
        echo out/
        echo build/
        echo dist/
        echo.
        echo # Environment files
        echo .env
        echo .env.local
        echo .env.production
        echo .env.development
        echo.
        echo # IDE files
        echo .vscode/
        echo .idea/
        echo *.swp
        echo *.swo
        echo.
        echo # OS files
        echo .DS_Store
        echo Thumbs.db
        echo.
        echo # Logs
        echo *.log
        echo npm-debug.log*
        echo yarn-debug.log*
        echo yarn-error.log*
        echo.
        echo # Runtime data
        echo pids
        echo *.pid
        echo *.seed
        echo *.pid.lock
        echo.
        echo # Coverage directory
        echo coverage/
        echo.
        echo # Strapi
        echo .tmp/
        echo exports/
        echo *.cache
        echo.
        echo # Database
        echo *.db
        echo *.sqlite
        echo *.sqlite3
        echo.
        echo # Docker
        echo .dockerignore
    ) > .gitignore
    echo [INFO] .gitignore creado ✓
)

REM Crear archivos .env de ejemplo
if not exist "frontend\.env.local.example" (
    (
        echo # Strapi CMS
        echo NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
        echo.
        echo # HubSpot
        echo NEXT_PUBLIC_HUBSPOT_PORTAL_ID=your_portal_id
        echo NEXT_PUBLIC_HUBSPOT_FORM_ID=your_form_id
        echo.
        echo # Google Analytics
        echo NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_id
        echo.
        echo # Google Search Console
        echo GOOGLE_SITE_VERIFICATION=your_verification_code
        echo.
        echo # Site URL
        echo SITE_URL=https://maqon.com
    ) > "frontend\.env.local.example"
    echo [INFO] frontend\.env.local.example creado ✓
)

if not exist "cms\.env.example" (
    (
        echo # Strapi Configuration
        echo HOST=0.0.0.0
        echo PORT=1337
        echo APP_KEYS=key1,key2,key3,key4
        echo API_TOKEN_SALT=your_api_token_salt
        echo ADMIN_JWT_SECRET=your_admin_jwt_secret
        echo JWT_SECRET=your_jwt_secret
        echo.
        echo # Database (SQLite for development)
        echo DATABASE_CLIENT=sqlite
        echo DATABASE_FILENAME=.tmp/data.db
        echo.
        echo # For PostgreSQL in production, uncomment and configure:
        echo # DATABASE_CLIENT=postgres
        echo # DATABASE_HOST=localhost
        echo # DATABASE_PORT=5432
        echo # DATABASE_NAME=maqon_cms
        echo # DATABASE_USERNAME=strapi
        echo # DATABASE_PASSWORD=strapi_password
        echo # DATABASE_SSL=false
    ) > "cms\.env.example"
    echo [INFO] cms\.env.example creado ✓
)

if not exist "backend\.env.example" (
    (
        echo # Database
        echo DATABASE_URL=postgresql://strapi:strapi_password@localhost:5432/maqon_cms
        echo.
        echo # HubSpot
        echo HUBSPOT_API_KEY=your_hubspot_api_key
        echo.
        echo # Stripe (optional)
        echo STRIPE_SECRET_KEY=your_stripe_secret_key
        echo.
        echo # JWT
        echo JWT_SECRET=your_jwt_secret
        echo.
        echo # Strapi
        echo STRAPI_URL=http://localhost:1337
        echo.
        echo # Redis
        echo REDIS_URL=redis://localhost:6379
    ) > "backend\.env.example"
    echo [INFO] backend\.env.example creado ✓
)

echo.
echo [STEP] Creando guía de desarrollo...
(
    echo # Guía de Desarrollo - MaqOn
    echo.
    echo ## Inicio Rápido
    echo.
    echo ### 1. Frontend (Next.js)
    echo ```bash
    echo cd frontend
    echo copy .env.local.example .env.local
    echo # Editar .env.local con tus variables
    echo npm run dev
    echo ```
    echo Frontend disponible en: http://localhost:3000
    echo.
    echo ### 2. CMS (Strapi)
    echo ```bash
    echo cd cms
    echo copy .env.example .env
    echo # Editar .env con tus variables
    echo npm run develop
    echo ```
    echo CMS disponible en: http://localhost:1337
    echo Admin en: http://localhost:1337/admin
    echo.
    echo ### 3. Backend (FastAPI - Opcional)
    echo ```bash
    echo cd backend
    echo copy .env.example .env
    echo # Editar .env con tus variables
    echo python -m venv venv
    echo venv\Scripts\activate.bat
    echo pip install -r requirements.txt
    echo python main.py
    echo ```
    echo API disponible en: http://localhost:8000
    echo Docs en: http://localhost:8000/docs
    echo.
    echo ## Variables de Entorno Requeridas
    echo.
    echo ### Frontend
    echo - NEXT_PUBLIC_STRAPI_URL: URL del CMS Strapi
    echo - NEXT_PUBLIC_HUBSPOT_PORTAL_ID: ID del portal HubSpot
    echo - NEXT_PUBLIC_GA_MEASUREMENT_ID: ID de Google Analytics
    echo.
    echo ### CMS
    echo - APP_KEYS: Claves de aplicación Strapi
    echo - API_TOKEN_SALT: Salt para tokens API
    echo - ADMIN_JWT_SECRET: Secreto JWT para admin
    echo.
    echo ## Comandos Útiles
    echo.
    echo ### Frontend
    echo - npm run dev: Desarrollo
    echo - npm run build: Construir
    echo - npm run start: Producción
    echo.
    echo ### CMS
    echo - npm run develop: Desarrollo
    echo - npm run build: Construir
    echo - npm run start: Producción
) > DEVELOPMENT.md
echo [INFO] DEVELOPMENT.md creado ✓

echo.
echo ✅ Instalación completada exitosamente!
echo.
echo 🎯 Próximos pasos:
echo 1. Edita los archivos .env.example y renómbralos a .env
echo 2. Configura tus variables de entorno
echo 3. Lee DEVELOPMENT.md para comenzar a desarrollar
echo.
echo 🚀 ¡Tu proyecto MaqOn está listo para usar!
echo.
pause
