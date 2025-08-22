# MaqOn - Documentación del Proyecto

## Descripción General

MaqOn es una landing page moderna diseñada para ofrecer productos industriales por cotización. El proyecto está construido con tecnologías modernas y optimizado para SEO y conversión.

## Arquitectura del Sistema

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   CMS           │
│   Next.js       │◄──►│   FastAPI       │◄──►│   Strapi        │
│   React + TS    │    │   Python        │    │   Headless CMS  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Analytics     │    │   CRM           │    │   Database      │
│   GA4 + GSC     │    │   HubSpot       │    │   PostgreSQL    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Tecnologías Utilizadas

### Frontend
- **Next.js 14** - Framework React con App Router
- **React 18** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework CSS utility-first
- **Framer Motion** - Animaciones y transiciones
- **next-seo** - Optimización SEO avanzada

### Backend (Opcional)
- **FastAPI** - API backend en Python
- **SQLAlchemy** - ORM para base de datos
- **Pydantic** - Validación de datos
- **Celery** - Tareas asíncronas

### CMS
- **Strapi** - CMS headless
- **PostgreSQL** - Base de datos principal
- **SQLite** - Base de datos de desarrollo

### Integraciones
- **HubSpot** - CRM y gestión de leads
- **Google Analytics 4** - Seguimiento de usuarios
- **Google Search Console** - Monitoreo SEO

## Estructura del Proyecto

```
MaqOn/
├── frontend/                 # Aplicación Next.js
│   ├── src/
│   │   ├── app/             # App Router de Next.js
│   │   ├── components/      # Componentes React
│   │   ├── lib/             # Utilidades y helpers
│   │   ├── types/           # Tipos TypeScript
│   │   └── utils/           # Funciones utilitarias
│   ├── public/              # Archivos estáticos
│   ├── package.json         # Dependencias Node.js
│   ├── tailwind.config.js   # Configuración Tailwind
│   └── next.config.js       # Configuración Next.js
├── backend/                  # API FastAPI (opcional)
│   ├── api/                 # Endpoints de la API
│   ├── models/              # Modelos de datos
│   ├── services/            # Lógica de negocio
│   ├── main.py              # Punto de entrada
│   └── requirements.txt     # Dependencias Python
├── cms/                     # Configuración Strapi
│   ├── config/              # Configuración del CMS
│   ├── src/                 # Código fuente del CMS
│   └── package.json         # Dependencias Strapi
├── docs/                    # Documentación
├── scripts/                 # Scripts de automatización
└── README.md                # Documentación principal
```

## Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- Python 3.9+ (para backend)
- PostgreSQL 13+ (para producción)
- Git

### 1. Clonar el Repositorio
```bash
git clone https://github.com/tu-usuario/maqon.git
cd maqon
```

### 2. Configurar Frontend
```bash
cd frontend
npm install
cp .env.example .env.local
# Editar .env.local con tus variables
npm run dev
```

### 3. Configurar CMS Strapi
```bash
cd cms
npm install
cp .env.example .env
# Editar .env con tus variables
npm run develop
```

### 4. Configurar Backend (Opcional)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Editar .env con tus variables
python main.py
```

## Variables de Entorno

### Frontend (.env.local)
```bash
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_HUBSPOT_PORTAL_ID=tu_portal_id
NEXT_PUBLIC_HUBSPOT_FORM_ID=tu_form_id
NEXT_PUBLIC_GA_MEASUREMENT_ID=tu_ga_id
GOOGLE_SITE_VERIFICATION=tu_verification_code
```

### Backend (.env)
```bash
DATABASE_URL=postgresql://user:password@localhost/maqon_db
HUBSPOT_API_KEY=tu_api_key
STRIPE_SECRET_KEY=tu_stripe_key
JWT_SECRET=tu_jwt_secret
```

### CMS (.env)
```bash
HOST=0.0.0.0
PORT=1337
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=tu_salt
ADMIN_JWT_SECRET=tu_admin_secret
JWT_SECRET=tu_jwt_secret
```

## Desarrollo

### Comandos Útiles

#### Frontend
```bash
npm run dev          # Servidor de desarrollo
npm run build        # Construir para producción
npm run start        # Servidor de producción
npm run lint         # Linting
npm run type-check   # Verificación de tipos
```

#### Backend
```bash
python main.py       # Servidor de desarrollo
uvicorn main:app --reload  # Servidor con recarga
pytest               # Ejecutar tests
```

#### CMS
```bash
npm run develop      # Modo desarrollo
npm run build        # Construir para producción
npm run start        # Modo producción
```

### Estructura de Componentes

Los componentes están organizados en:
- **Layout**: Header, Footer, Navigation
- **Sections**: Hero, Products, Services, About, etc.
- **Forms**: Quote form, Contact form
- **UI**: Botones, inputs, cards, etc.

### Estilos y Diseño

- **Tailwind CSS** para estilos base
- **Componentes personalizados** para elementos específicos
- **Sistema de colores** consistente (primary, secondary, accent)
- **Tipografías**: Inter para texto, Poppins para títulos
- **Responsive design** mobile-first

## Despliegue

### Frontend (Vercel/Netlify)
```bash
npm run build
# Subir archivos de /out o configurar CI/CD
```

### Backend (Docker)
```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### CMS (Strapi Cloud/Heroku)
```bash
npm run build
# Configurar variables de entorno en la plataforma
```

## SEO y Performance

### Optimizaciones Implementadas
- **SSR/SSG** con Next.js
- **Meta tags** dinámicos
- **Sitemap** automático
- **Open Graph** para redes sociales
- **Schema.org** markup
- **Lazy loading** de imágenes
- **Code splitting** automático

### Métricas de Performance
- **Core Web Vitals** optimizados
- **Lighthouse Score** > 90
- **First Contentful Paint** < 1.5s
- **Largest Contentful Paint** < 2.5s

## Integraciones

### HubSpot
- Formularios de cotización
- Seguimiento de leads
- Automatización de marketing
- CRM integrado

### Google Analytics 4
- Seguimiento de usuarios
- Eventos personalizados
- Conversiones y objetivos
- Reportes en tiempo real

### Strapi CMS
- Gestión de contenido
- API REST/GraphQL
- Panel de administración
- Gestión de usuarios

## Mantenimiento

### Actualizaciones
- **Dependencias**: Mensual
- **Next.js**: Seguir LTS
- **Strapi**: Seguir releases
- **Python**: Seguir 3.9+

### Monitoreo
- **Logs**: Aplicación y servidor
- **Métricas**: Performance y errores
- **SEO**: Google Search Console
- **Analytics**: GA4 y reportes

## Contribución

### Guías de Desarrollo
1. Fork del repositorio
2. Crear rama feature: `git checkout -b feature/nueva-funcionalidad`
3. Commit cambios: `git commit -am 'Agregar nueva funcionalidad'`
4. Push a la rama: `git push origin feature/nueva-funcionalidad`
5. Crear Pull Request

### Estándares de Código
- **TypeScript** estricto
- **ESLint** + **Prettier**
- **Conventional Commits**
- **Testing** para nuevas funcionalidades

## Soporte

### Recursos
- [Documentación Next.js](https://nextjs.org/docs)
- [Documentación Strapi](https://docs.strapi.io/)
- [Documentación FastAPI](https://fastapi.tiangolo.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Contacto
- **Email**: dev@maqon.com
- **Issues**: GitHub Issues
- **Discord**: Servidor de la comunidad

## Licencia

Este proyecto está bajo la licencia MIT. Ver [LICENSE](../LICENSE) para más detalles.
