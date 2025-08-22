#!/bin/bash

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para imprimir mensajes con colores
print_message() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

# Función para verificar si un comando existe
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Función para verificar versiones mínimas
check_node_version() {
    if command_exists node; then
        local version=$(node --version | cut -d'v' -f2)
        local major=$(echo $version | cut -d'.' -f1)
        if [ "$major" -ge 18 ]; then
            print_message "Node.js $version encontrado ✓"
            return 0
        else
            print_error "Node.js $version encontrado, pero se requiere versión 18+"
            return 1
        fi
    else
        print_error "Node.js no está instalado"
        return 1
    fi
}

check_npm_version() {
    if command_exists npm; then
        local version=$(npm --version)
        print_message "npm $version encontrado ✓"
        return 0
    else
        print_error "npm no está instalado"
        return 1
    fi
}

check_git() {
    if command_exists git; then
        local version=$(git --version | cut -d' ' -f3)
        print_message "Git $version encontrado ✓"
        return 0
    else
        print_error "Git no está instalado"
        return 1
    fi
}

check_docker() {
    if command_exists docker; then
        local version=$(docker --version | cut -d' ' -f3 | cut -d',' -f1)
        print_message "Docker $version encontrado ✓"
        return 0
    else
        print_warning "Docker no está instalado (opcional para desarrollo local)"
        return 0
    fi
}

# Función para instalar dependencias del frontend
install_frontend_deps() {
    print_step "Instalando dependencias del frontend..."
    cd frontend
    
    if npm install; then
        print_message "Dependencias del frontend instaladas correctamente ✓"
    else
        print_error "Error al instalar dependencias del frontend"
        return 1
    fi
    
    cd ..
}

# Función para instalar dependencias del CMS
install_cms_deps() {
    print_step "Instalando dependencias del CMS..."
    cd cms
    
    # Limpiar node_modules si existe
    if [ -d "node_modules" ]; then
        print_message "Limpiando node_modules existente..."
        rm -rf node_modules package-lock.json
    fi
    
    if npm install; then
        print_message "Dependencias del CMS instaladas correctamente ✓"
    else
        print_error "Error al instalar dependencias del CMS"
        return 1
    fi
    
    cd ..
}

# Función para instalar dependencias del backend
install_backend_deps() {
    print_step "Instalando dependencias del backend..."
    cd backend
    
    # Verificar si Python está instalado
    if ! command_exists python3 && ! command_exists python; then
        print_error "Python no está instalado. Por favor, instala Python 3.9+"
        return 1
    fi
    
    # Crear entorno virtual
    if [ ! -d "venv" ]; then
        print_message "Creando entorno virtual Python..."
        if command_exists python3; then
            python3 -m venv venv
        else
            python -m venv venv
        fi
    fi
    
    # Activar entorno virtual
    print_message "Activando entorno virtual..."
    if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
        # Windows
        source venv/Scripts/activate
    else
        # Linux/Mac
        source venv/bin/activate
    fi
    
    # Instalar dependencias
    if pip install -r requirements.txt; then
        print_message "Dependencias del backend instaladas correctamente ✓"
    else
        print_error "Error al instalar dependencias del backend"
        return 1
    fi
    
    cd ..
}

# Función para crear archivos de configuración
create_config_files() {
    print_step "Creando archivos de configuración..."
    
    # Crear .gitignore
    if [ ! -f ".gitignore" ]; then
        cat > .gitignore << 'EOF'
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
EOF
        print_message ".gitignore creado ✓"
    fi
    
    # Crear archivos .env de ejemplo
    if [ ! -f "frontend/.env.local.example" ]; then
        cat > frontend/.env.local.example << 'EOF'
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
EOF
        print_message "frontend/.env.local.example creado ✓"
    fi
    
    if [ ! -f "cms/.env.example" ]; then
        cat > cms/.env.example << 'EOF'
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
EOF
        print_message "cms/.env.example creado ✓"
    fi
    
    if [ ! -f "backend/.env.example" ]; then
        cat > backend/.env.example << 'EOF'
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
EOF
        print_message "backend/.env.example creado ✓"
    fi
}

# Función para crear archivo de desarrollo
create_development_guide() {
    print_step "Creando guía de desarrollo..."
    
    cat > DEVELOPMENT.md << 'EOF'
# Guía de Desarrollo - MaqOn

## Inicio Rápido

### 1. Frontend (Next.js)
```bash
cd frontend
cp .env.local.example .env.local
# Editar .env.local con tus variables
npm run dev
```
Frontend disponible en: http://localhost:3000

### 2. CMS (Strapi)
```bash
cd cms
cp .env.example .env
# Editar .env con tus variables
npm run develop
```
CMS disponible en: http://localhost:1337
Admin en: http://localhost:1337/admin

### 3. Backend (FastAPI - Opcional)
```bash
cd backend
cp .env.example .env
# Editar .env con tus variables
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
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
- `NEXT_PUBLIC_STRAPI_URL`: URL del CMS Strapi
- `NEXT_PUBLIC_HUBSPOT_PORTAL_ID`: ID del portal HubSpot
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: ID de Google Analytics

### CMS
- `APP_KEYS`: Claves de aplicación Strapi
- `API_TOKEN_SALT`: Salt para tokens API
- `ADMIN_JWT_SECRET`: Secreto JWT para admin

### Backend
- `DATABASE_URL`: URL de la base de datos
- `HUBSPOT_API_KEY`: API key de HubSpot

## Comandos Útiles

### Frontend
- `npm run dev`: Desarrollo
- `npm run build`: Construir
- `npm run start`: Producción
- `npm run lint`: Linting

### CMS
- `npm run develop`: Desarrollo
- `npm run build`: Construir
- `npm run start`: Producción

### Backend
- `python main.py`: Desarrollo
- `pytest`: Tests

## Solución de Problemas

### Error de dependencias
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error de Strapi
```bash
cd cms
rm -rf .tmp
npm run develop
```

### Error de Python
```bash
cd backend
rm -rf venv
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## Recursos

- [Next.js Docs](https://nextjs.org/docs)
- [Strapi Docs](https://docs.strapi.io/)
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
EOF
    print_message "DEVELOPMENT.md creado ✓"
}

# Función principal
main() {
    print_message "🚀 Iniciando instalación de MaqOn..."
    print_message "Este script configurará tu entorno de desarrollo completo."
    
    # Verificar prerrequisitos
    print_step "Verificando prerrequisitos..."
    
    if ! check_node_version; then
        print_error "Por favor, instala Node.js 18+ antes de continuar"
        print_message "Descarga desde: https://nodejs.org/"
        exit 1
    fi
    
    if ! check_npm_version; then
        print_error "Por favor, instala npm antes de continuar"
        exit 1
    fi
    
    if ! check_git; then
        print_error "Por favor, instala Git antes de continuar"
        print_message "Descarga desde: https://git-scm.com/"
        exit 1
    fi
    
    check_docker
    
    # Instalar dependencias
    print_step "Instalando dependencias..."
    
    if ! install_frontend_deps; then
        print_error "Falló la instalación del frontend"
        exit 1
    fi
    
    if ! install_cms_deps; then
        print_error "Falló la instalación del CMS"
        exit 1
    fi
    
    if ! install_backend_deps; then
        print_warning "Falló la instalación del backend (opcional)"
    fi
    
    # Crear archivos de configuración
    create_config_files
    create_development_guide
    
    print_message "✅ Instalación completada exitosamente!"
    print_message ""
    print_message "🎯 Próximos pasos:"
    print_message "1. Edita los archivos .env.example y renómbralos a .env"
    print_message "2. Configura tus variables de entorno"
    print_message "3. Lee DEVELOPMENT.md para comenzar a desarrollar"
    print_message ""
    print_message "🚀 ¡Tu proyecto MaqOn está listo para usar!"
}

# Ejecutar función principal
main "$@"
