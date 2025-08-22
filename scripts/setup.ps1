# MaqOn - Script de Instalación para Windows (PowerShell)
# Este script configura automáticamente el entorno de desarrollo

# Configurar colores para output
$Host.UI.RawUI.ForegroundColor = "White"

function Write-Info {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

function Write-Step {
    param([string]$Message)
    Write-Host "[STEP] $Message" -ForegroundColor Blue
}

# Función para verificar si un comando existe
function Test-Command {
    param([string]$Command)
    try {
        Get-Command $Command -ErrorAction Stop | Out-Null
        return $true
    } catch {
        return $false
    }
}

# Función para verificar versiones mínimas
function Test-NodeVersion {
    if (Test-Command "node") {
        $version = (node --version).TrimStart('v')
        $major = [int]($version.Split('.')[0])
        if ($major -ge 18) {
            Write-Info "Node.js $version encontrado ✓"
            return $true
        } else {
            Write-Error "Node.js $version encontrado, pero se requiere versión 18+"
            return $false
        }
    } else {
        Write-Error "Node.js no está instalado"
        return $false
    }
}

function Test-NpmVersion {
    if (Test-Command "npm") {
        $version = npm --version
        Write-Info "npm $version encontrado ✓"
        return $true
    } else {
        Write-Error "npm no está instalado"
        return $false
    }
}

function Test-Git {
    if (Test-Command "git") {
        $version = (git --version).Split(' ')[2]
        Write-Info "Git $version encontrado ✓"
        return $true
    } else {
        Write-Error "Git no está instalado"
        return $false
    }
}

function Test-Docker {
    if (Test-Command "docker") {
        $version = (docker --version).Split(' ')[2].TrimEnd(',')
        Write-Info "Docker $version encontrado ✓"
        return $true
    } else {
        Write-Warning "Docker no está instalado (opcional para desarrollo local)"
        return $true
    }
}

# Función para instalar dependencias del frontend
function Install-FrontendDeps {
    Write-Step "Instalando dependencias del frontend..."
    Set-Location frontend
    
    try {
        npm install
        Write-Info "Dependencias del frontend instaladas correctamente ✓"
        Set-Location ..
        return $true
    } catch {
        Write-Error "Error al instalar dependencias del frontend"
        Set-Location ..
        return $false
    }
}

# Función para instalar dependencias del CMS
function Install-CmsDeps {
    Write-Step "Instalando dependencias del CMS..."
    Set-Location cms
    
    # Limpiar node_modules si existe
    if (Test-Path "node_modules") {
        Write-Info "Limpiando node_modules existente..."
        Remove-Item -Recurse -Force node_modules
        if (Test-Path "package-lock.json") {
            Remove-Item package-lock.json
        }
    }
    
    try {
        npm install
        Write-Info "Dependencias del CMS instaladas correctamente ✓"
        Set-Location ..
        return $true
    } catch {
        Write-Error "Error al instalar dependencias del CMS"
        Set-Location ..
        return $false
    }
}

# Función para instalar dependencias del backend
function Install-BackendDeps {
    Write-Step "Instalando dependencias del backend..."
    Set-Location backend
    
    # Verificar si Python está instalado
    if (-not (Test-Command "python") -and -not (Test-Command "python3")) {
        Write-Error "Python no está instalado. Por favor, instala Python 3.9+"
        Set-Location ..
        return $false
    }
    
    # Crear entorno virtual
    if (-not (Test-Path "venv")) {
        Write-Info "Creando entorno virtual Python..."
        if (Test-Command "python3") {
            python3 -m venv venv
        } else {
            python -m venv venv
        }
    }
    
    # Activar entorno virtual
    Write-Info "Activando entorno virtual..."
    & ".\venv\Scripts\Activate.ps1"
    
    # Instalar dependencias
    try {
        pip install -r requirements.txt
        Write-Info "Dependencias del backend instaladas correctamente ✓"
        Set-Location ..
        return $true
    } catch {
        Write-Error "Error al instalar dependencias del backend"
        Set-Location ..
        return $false
    }
}

# Función para crear archivos de configuración
function Create-ConfigFiles {
    Write-Step "Creando archivos de configuración..."
    
    # Crear .gitignore
    if (-not (Test-Path ".gitignore")) {
        $gitignoreContent = @"
# Dependencies
node_modules/
*/node_modules/
*/venv/
*/__pycache__/
*.pyc

# Build outputs
.next/
out/
build/
dist/

# Environment files
.env
.env.local
.env.production
.env.development

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# Strapi
.tmp/
exports/
*.cache

# Database
*.db
*.sqlite
*.sqlite3

# Docker
.dockerignore
"@
        $gitignoreContent | Out-File -FilePath ".gitignore" -Encoding UTF8
        Write-Info ".gitignore creado ✓"
    }
    
    # Crear archivos .env de ejemplo
    if (-not (Test-Path "frontend\.env.local.example")) {
        $frontendEnvContent = @"
# Strapi CMS
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337

# HubSpot
NEXT_PUBLIC_HUBSPOT_PORTAL_ID=your_portal_id
NEXT_PUBLIC_HUBSPOT_FORM_ID=your_form_id

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_id

# Google Search Console
GOOGLE_SITE_VERIFICATION=your_verification_code

# Site URL
SITE_URL=https://maqon.com
"@
        $frontendEnvContent | Out-File -FilePath "frontend\.env.local.example" -Encoding UTF8
        Write-Info "frontend\.env.local.example creado ✓"
    }
    
    if (-not (Test-Path "cms\.env.example")) {
        $cmsEnvContent = @"
# Strapi Configuration
HOST=0.0.0.0
PORT=1337
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=your_api_token_salt
ADMIN_JWT_SECRET=your_admin_jwt_secret
JWT_SECRET=your_jwt_secret

# Database (SQLite for development)
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# For PostgreSQL in production, uncomment and configure:
# DATABASE_CLIENT=postgres
# DATABASE_HOST=localhost
# DATABASE_PORT=5432
# DATABASE_NAME=maqon_cms
# DATABASE_USERNAME=strapi
# DATABASE_PASSWORD=strapi_password
# DATABASE_SSL=false
"@
        $cmsEnvContent | Out-File -FilePath "cms\.env.example" -Encoding UTF8
        Write-Info "cms\.env.example creado ✓"
    }
    
    if (-not (Test-Path "backend\.env.example")) {
        $backendEnvContent = @"
# Database
DATABASE_URL=postgresql://strapi:strapi_password@localhost:5432/maqon_cms

# HubSpot
HUBSPOT_API_KEY=your_hubspot_api_key

# Stripe (optional)
STRIPE_SECRET_KEY=your_stripe_secret_key

# JWT
JWT_SECRET=your_jwt_secret

# Strapi
STRAPI_URL=http://localhost:1337

# Redis
REDIS_URL=redis://localhost:6379
"@
        $backendEnvContent | Out-File -FilePath "backend\.env.example" -Encoding UTF8
        Write-Info "backend\.env.example creado ✓"
    }
}

# Función para crear archivo de desarrollo
function Create-DevelopmentGuide {
    Write-Step "Creando guía de desarrollo..."
    
    $devGuideContent = @"
# Guía de Desarrollo - MaqOn

## Inicio Rápido

### 1. Frontend (Next.js)
```bash
cd frontend
copy .env.local.example .env.local
# Editar .env.local con tus variables
npm run dev
```
Frontend disponible en: http://localhost:3000

### 2. CMS (Strapi)
```bash
cd cms
copy .env.example .env
# Editar .env con tus variables
npm run develop
```
CMS disponible en: http://localhost:1337
Admin en: http://localhost:1337/admin

### 3. Backend (FastAPI - Opcional)
```bash
cd backend
copy .env.example .env
# Editar .env con tus variables
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python main.py
```
API disponible en: http://localhost:8000
Docs en: http://localhost:8000/docs

### 4. Con Docker (Opcional)
```bash
docker-compose up -d
```

## Estructura del Proyecto

```
MaqOn/
├── frontend/          # Next.js App
├── cms/              # Strapi CMS
├── backend/          # FastAPI (opcional)
├── docs/             # Documentación
└── scripts/          # Scripts de automatización
```

## Variables de Entorno Requeridas

### Frontend
- NEXT_PUBLIC_STRAPI_URL: URL del CMS Strapi
- NEXT_PUBLIC_HUBSPOT_PORTAL_ID: ID del portal HubSpot
- NEXT_PUBLIC_GA_MEASUREMENT_ID: ID de Google Analytics

### CMS
- APP_KEYS: Claves de aplicación Strapi
- API_TOKEN_SALT: Salt para tokens API
- ADMIN_JWT_SECRET: Secreto JWT para admin

### Backend
- DATABASE_URL: URL de la base de datos
- HUBSPOT_API_KEY: API key de HubSpot

## Comandos Útiles

### Frontend
- npm run dev: Desarrollo
- npm run build: Construir
- npm run start: Producción
- npm run lint: Linting

### CMS
- npm run develop: Desarrollo
- npm run build: Construir
- npm run start: Producción

### Backend
- python main.py: Desarrollo
- pytest: Tests

## Solución de Problemas

### Error de dependencias
```bash
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### Error de Strapi
```bash
cd cms
Remove-Item -Recurse -Force .tmp
npm run develop
```

### Error de Python
```bash
cd backend
Remove-Item -Recurse -Force venv
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

## Recursos

- [Next.js Docs](https://nextjs.org/docs)
- [Strapi Docs](https://docs.strapi.io/)
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
"@
    $devGuideContent | Out-File -FilePath "DEVELOPMENT.md" -Encoding UTF8
    Write-Info "DEVELOPMENT.md creado ✓"
}

# Función principal
function Main {
    Write-Info "🚀 Iniciando instalación de MaqOn..."
    Write-Info "Este script configurará tu entorno de desarrollo completo."
    
    # Verificar prerrequisitos
    Write-Step "Verificando prerrequisitos..."
    
    if (-not (Test-NodeVersion)) {
        Write-Error "Por favor, instala Node.js 18+ antes de continuar"
        Write-Info "Descarga desde: https://nodejs.org/"
        exit 1
    }
    
    if (-not (Test-NpmVersion)) {
        Write-Error "Por favor, instala npm antes de continuar"
        exit 1
    }
    
    if (-not (Test-Git)) {
        Write-Error "Por favor, instala Git antes de continuar"
        Write-Info "Descarga desde: https://git-scm.com/"
        exit 1
    }
    
    Test-Docker
    
    # Instalar dependencias
    Write-Step "Instalando dependencias..."
    
    if (-not (Install-FrontendDeps)) {
        Write-Error "Falló la instalación del frontend"
        exit 1
    }
    
    if (-not (Install-CmsDeps)) {
        Write-Error "Falló la instalación del CMS"
        exit 1
    }
    
    if (-not (Install-BackendDeps)) {
        Write-Warning "Falló la instalación del backend (opcional)"
    }
    
    # Crear archivos de configuración
    Create-ConfigFiles
    Create-DevelopmentGuide
    
    Write-Info "✅ Instalación completada exitosamente!"
    Write-Info ""
    Write-Info "🎯 Próximos pasos:"
    Write-Info "1. Edita los archivos .env.example y renómbralos a .env"
    Write-Info "2. Configura tus variables de entorno"
    Write-Info "3. Lee DEVELOPMENT.md para comenzar a desarrollar"
    Write-Info ""
    Write-Info "🚀 ¡Tu proyecto MaqOn está listo para usar!"
}

# Ejecutar función principal
Main
