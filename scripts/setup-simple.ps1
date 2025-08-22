# MaqOn - Script de Instalación Simplificado para Windows
# Este script configura automáticamente el entorno de desarrollo

Write-Host "🚀 Iniciando instalación de MaqOn..." -ForegroundColor Green
Write-Host "Este script configurará tu entorno de desarrollo completo." -ForegroundColor White

# Verificar prerrequisitos
Write-Host "`n[STEP] Verificando prerrequisitos..." -ForegroundColor Blue

# Verificar Node.js
try {
    $nodeVersion = node --version
    if ($nodeVersion -match "v(\d+)") {
        $major = [int]$matches[1]
        if ($major -ge 18) {
            Write-Host "[INFO] Node.js $nodeVersion encontrado ✓" -ForegroundColor Green
        } else {
            Write-Host "[ERROR] Node.js $nodeVersion encontrado, pero se requiere versión 18+" -ForegroundColor Red
            Write-Host "Por favor, instala Node.js 18+ desde: https://nodejs.org/" -ForegroundColor Yellow
            exit 1
        }
    }
} catch {
    Write-Host "[ERROR] Node.js no está instalado" -ForegroundColor Red
    Write-Host "Por favor, instala Node.js 18+ desde: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Verificar npm
try {
    $npmVersion = npm --version
    Write-Host "[INFO] npm $npmVersion encontrado ✓" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] npm no está instalado" -ForegroundColor Red
    exit 1
}

# Verificar Git
try {
    $gitVersion = git --version
    Write-Host "[INFO] Git encontrado ✓" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Git no está instalado" -ForegroundColor Red
    Write-Host "Por favor, instala Git desde: https://git-scm.com/" -ForegroundColor Yellow
    exit 1
}

# Verificar Docker (opcional)
try {
    $dockerVersion = docker --version
    Write-Host "[INFO] Docker encontrado ✓" -ForegroundColor Green
} catch {
    Write-Host "[WARNING] Docker no está instalado (opcional para desarrollo local)" -ForegroundColor Yellow
}

# Instalar dependencias del frontend
Write-Host "`n[STEP] Instalando dependencias del frontend..." -ForegroundColor Blue
Set-Location frontend
try {
    npm install
    Write-Host "[INFO] Dependencias del frontend instaladas correctamente ✓" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Error al instalar dependencias del frontend" -ForegroundColor Red
}
Set-Location ..

# Instalar dependencias del CMS
Write-Host "`n[STEP] Instalando dependencias del CMS..." -ForegroundColor Blue
Set-Location cms

# Limpiar node_modules si existe
if (Test-Path "node_modules") {
    Write-Host "[INFO] Limpiando node_modules existente..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force node_modules
    if (Test-Path "package-lock.json") {
        Remove-Item package-lock.json
    }
}

try {
    npm install
    Write-Host "[INFO] Dependencias del CMS instaladas correctamente ✓" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Error al instalar dependencias del CMS" -ForegroundColor Red
}
Set-Location ..

# Instalar dependencias del backend (opcional)
Write-Host "`n[STEP] Instalando dependencias del backend..." -ForegroundColor Blue
Set-Location backend

# Verificar si Python está instalado
try {
    $pythonVersion = python --version
    Write-Host "[INFO] Python encontrado ✓" -ForegroundColor Green
    
    # Crear entorno virtual
    if (-not (Test-Path "venv")) {
        Write-Host "[INFO] Creando entorno virtual Python..." -ForegroundColor Yellow
        python -m venv venv
    }
    
    # Activar entorno virtual
    Write-Host "[INFO] Activando entorno virtual..." -ForegroundColor Yellow
    & ".\venv\Scripts\Activate.ps1"
    
    # Instalar dependencias
    try {
        pip install -r requirements.txt
        Write-Host "[INFO] Dependencias del backend instaladas correctamente ✓" -ForegroundColor Green
    } catch {
        Write-Host "[WARNING] Error al instalar dependencias del backend" -ForegroundColor Yellow
    }
} catch {
    Write-Host "[WARNING] Python no está instalado. Backend será omitido." -ForegroundColor Yellow
}
Set-Location ..

# Crear archivos de configuración
Write-Host "`n[STEP] Creando archivos de configuración..." -ForegroundColor Blue

# Crear .gitignore
if (-not (Test-Path ".gitignore")) {
    $gitignoreLines = @(
        "# Dependencies",
        "node_modules/",
        "*/node_modules/",
        "*/venv/",
        "*/__pycache__/",
        "*.pyc",
        "",
        "# Build outputs",
        ".next/",
        "out/",
        "build/",
        "dist/",
        "",
        "# Environment files",
        ".env",
        ".env.local",
        ".env.production",
        ".env.development",
        "",
        "# IDE files",
        ".vscode/",
        ".idea/",
        "*.swp",
        "*.swo",
        "",
        "# OS files",
        ".DS_Store",
        "Thumbs.db",
        "",
        "# Logs",
        "*.log",
        "npm-debug.log*",
        "yarn-debug.log*",
        "yarn-error.log*",
        "",
        "# Runtime data",
        "pids",
        "*.pid",
        "*.seed",
        "*.pid.lock",
        "",
        "# Coverage directory",
        "coverage/",
        "",
        "# Strapi",
        ".tmp/",
        "exports/",
        "*.cache",
        "",
        "# Database",
        "*.db",
        "*.sqlite",
        "*.sqlite3",
        "",
        "# Docker",
        ".dockerignore"
    )
    $gitignoreLines | Out-File -FilePath ".gitignore" -Encoding UTF8
    Write-Host "[INFO] .gitignore creado ✓" -ForegroundColor Green
}

# Crear archivos .env de ejemplo
if (-not (Test-Path "frontend\.env.local.example")) {
    $frontendEnvLines = @(
        "# Strapi CMS",
        "NEXT_PUBLIC_STRAPI_URL=http://localhost:1337",
        "",
        "# HubSpot",
        "NEXT_PUBLIC_HUBSPOT_PORTAL_ID=your_portal_id",
        "NEXT_PUBLIC_HUBSPOT_FORM_ID=your_form_id",
        "",
        "# Google Analytics",
        "NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_id",
        "",
        "# Google Search Console",
        "GOOGLE_SITE_VERIFICATION=your_verification_code",
        "",
        "# Site URL",
        "SITE_URL=https://maqon.com"
    )
    $frontendEnvLines | Out-File -FilePath "frontend\.env.local.example" -Encoding UTF8
    Write-Host "[INFO] frontend\.env.local.example creado ✓" -ForegroundColor Green
}

if (-not (Test-Path "cms\.env.example")) {
    $cmsEnvLines = @(
        "# Strapi Configuration",
        "HOST=0.0.0.0",
        "PORT=1337",
        "APP_KEYS=key1,key2,key3,key4",
        "API_TOKEN_SALT=your_api_token_salt",
        "ADMIN_JWT_SECRET=your_admin_jwt_secret",
        "JWT_SECRET=your_jwt_secret",
        "",
        "# Database (SQLite for development)",
        "DATABASE_CLIENT=sqlite",
        "DATABASE_FILENAME=.tmp/data.db",
        "",
        "# For PostgreSQL in production, uncomment and configure:",
        "# DATABASE_CLIENT=postgres",
        "# DATABASE_HOST=localhost",
        "# DATABASE_PORT=5432",
        "# DATABASE_NAME=maqon_cms",
        "# DATABASE_USERNAME=strapi",
        "# DATABASE_PASSWORD=strapi_password",
        "# DATABASE_SSL=false"
    )
    $cmsEnvLines | Out-File -FilePath "cms\.env.example" -Encoding UTF8
    Write-Host "[INFO] cms\.env.example creado ✓" -ForegroundColor Green
}

if (-not (Test-Path "backend\.env.example")) {
    $backendEnvLines = @(
        "# Database",
        "DATABASE_URL=postgresql://strapi:strapi_password@localhost:5432/maqon_cms",
        "",
        "# HubSpot",
        "HUBSPOT_API_KEY=your_hubspot_api_key",
        "",
        "# Stripe (optional)",
        "STRIPE_SECRET_KEY=your_stripe_secret_key",
        "",
        "# JWT",
        "JWT_SECRET=your_jwt_secret",
        "",
        "# Strapi",
        "STRAPI_URL=http://localhost:1337",
        "",
        "# Redis",
        "REDIS_URL=redis://localhost:6379"
    )
    $backendEnvLines | Out-File -FilePath "backend\.env.example" -Encoding UTF8
    Write-Host "[INFO] backend\.env.example creado ✓" -ForegroundColor Green
}

# Crear guía de desarrollo
Write-Host "`n[STEP] Creando guía de desarrollo..." -ForegroundColor Blue
$devGuideLines = @(
    "# Guía de Desarrollo - MaqOn",
    "",
    "## Inicio Rápido",
    "",
    "### 1. Frontend (Next.js)",
    "```bash",
    "cd frontend",
    "copy .env.local.example .env.local",
    "# Editar .env.local con tus variables",
    "npm run dev",
    "```",
    "Frontend disponible en: http://localhost:3000",
    "",
    "### 2. CMS (Strapi)",
    "```bash",
    "cd cms",
    "copy .env.example .env",
    "# Editar .env con tus variables",
    "npm run develop",
    "```",
    "CMS disponible en: http://localhost:1337",
    "Admin en: http://localhost:1337/admin",
    "",
    "### 3. Backend (FastAPI - Opcional)",
    "```bash",
    "cd backend",
    "copy .env.example .env",
    "# Editar .env con tus variables",
    "python -m venv venv",
    ".\venv\Scripts\Activate.ps1",
    "pip install -r requirements.txt",
    "python main.py",
    "```",
    "API disponible en: http://localhost:8000",
    "Docs en: http://localhost:8000/docs",
    "",
    "## Variables de Entorno Requeridas",
    "",
    "### Frontend",
    "- NEXT_PUBLIC_STRAPI_URL: URL del CMS Strapi",
    "- NEXT_PUBLIC_HUBSPOT_PORTAL_ID: ID del portal HubSpot",
    "- NEXT_PUBLIC_GA_MEASUREMENT_ID: ID de Google Analytics",
    "",
    "### CMS",
    "- APP_KEYS: Claves de aplicación Strapi",
    "- API_TOKEN_SALT: Salt para tokens API",
    "- ADMIN_JWT_SECRET: Secreto JWT para admin",
    "",
    "## Comandos Útiles",
    "",
    "### Frontend",
    "- npm run dev: Desarrollo",
    "- npm run build: Construir",
    "- npm run start: Producción",
    "",
    "### CMS",
    "- npm run develop: Desarrollo",
    "- npm run build: Construir",
    "- npm run start: Producción"
)
$devGuideLines | Out-File -FilePath "DEVELOPMENT.md" -Encoding UTF8
Write-Host "[INFO] DEVELOPMENT.md creado ✓" -ForegroundColor Green

# Mensaje final
Write-Host "`n✅ Instalación completada exitosamente!" -ForegroundColor Green
Write-Host ""
Write-Host "🎯 Próximos pasos:" -ForegroundColor White
Write-Host "1. Edita los archivos .env.example y renómbralos a .env" -ForegroundColor White
Write-Host "2. Configura tus variables de entorno" -ForegroundColor White
Write-Host "3. Lee DEVELOPMENT.md para comenzar a desarrollar" -ForegroundColor White
Write-Host ""
Write-Host "🚀 ¡Tu proyecto MaqOn está listo para usar!" -ForegroundColor Green
