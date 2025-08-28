# API de Cotizaciones - MaqOn CMS

## Descripción
Sistema completo de gestión de cotizaciones para productos industriales. Permite recibir, procesar y gestionar solicitudes de cotización desde el sitio web.

## Modelo de Datos

### Schema: `cotizacion`
```json
{
  "cliente_nombre": "string (required)",
  "cliente_email": "email (required)",
  "cliente_telefono": "string (required)",
  "producto_id": "integer",
  "producto_nombre": "string (required)",
  "producto_categoria": "string",
  "producto_precio": "decimal",
  "cantidad": "integer (default: 1)",
  "mensaje": "text",
  "fecha_solicitud": "datetime (required)",
  "origen": "string (default: 'web')",
  "estado": "enum ['pendiente', 'procesando', 'enviada', 'cerrada'] (default: 'pendiente')",
  "prioridad": "enum ['baja', 'normal', 'alta'] (default: 'normal')",
  "notas_internas": "text",
  "fecha_respuesta": "datetime",
  "usuario_asignado": "string"
}
```

## Endpoints Disponibles

### CRUD Básico
- `GET /api/cotizaciones` - Listar cotizaciones
- `GET /api/cotizaciones/:id` - Obtener cotización específica
- `POST /api/cotizaciones` - Crear nueva cotización
- `PUT /api/cotizaciones/:id` - Actualizar cotización
- `DELETE /api/cotizaciones/:id` - Eliminar cotización

### Endpoints Personalizados
- `GET /api/cotizaciones/stats` - Estadísticas de cotizaciones
- `PUT /api/cotizaciones/:id/estado` - Actualizar estado de cotización

## Funcionalidades

### 1. Creación de Cotizaciones
- Validación de datos de entrada
- Prevención de duplicados (mismo email + producto en 24h)
- Notificación automática por email
- Asignación automática de fecha y estado

### 2. Gestión de Estados
- **pendiente**: Cotización recién recibida
- **procesando**: En proceso de elaboración
- **enviada**: Cotización enviada al cliente
- **cerrada**: Proceso completado

### 3. Estadísticas y Reportes
- Conteo por estado
- Tendencias mensuales
- Productos más solicitados
- Reportes personalizados por fecha

### 4. Seguimiento
- Notificaciones de seguimiento para cotizaciones pendientes
- Asignación de usuarios responsables
- Notas internas para el equipo

## Configuración

### Variables de Entorno
```env
ADMIN_EMAIL=admin@maqon.com
FROM_EMAIL=noreply@maqon.com
```

### Permisos
Configurar permisos en Strapi Admin:
- **Public**: Solo CREATE (para el formulario web)
- **Authenticated**: READ, UPDATE (para usuarios del CMS)
- **Admin**: ALL (para administradores)

## Integración Frontend

### Crear Cotización
```javascript
const response = await fetch('/api/cotizaciones', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    data: {
      cliente_nombre: "Juan Pérez",
      cliente_email: "juan@example.com",
      cliente_telefono: "+57 300 123 4567",
      producto_nombre: "Excavadora CAT 320",
      cantidad: 1,
      mensaje: "Necesito cotización urgente"
    }
  })
})
```

### Obtener Estadísticas
```javascript
const stats = await fetch('/api/cotizaciones/stats')
const data = await stats.json()
```

## Flujo de Trabajo Recomendado

1. **Recepción**: Cotización llega desde el formulario web
2. **Notificación**: Email automático al equipo de ventas
3. **Asignación**: Asignar usuario responsable
4. **Procesamiento**: Cambiar estado a "procesando"
5. **Elaboración**: Crear cotización detallada
6. **Envío**: Marcar como "enviada" (fecha automática)
7. **Seguimiento**: Notas internas y seguimiento
8. **Cierre**: Marcar como "cerrada" al finalizar

## Mantenimiento

### Tareas Automáticas
- Notificaciones de seguimiento para cotizaciones > 3 días
- Limpieza de cotizaciones antiguas (configurar cron job)
- Reportes automáticos semanales/mensuales

### Monitoreo
- Revisar cotizaciones pendientes diariamente
- Analizar tendencias mensuales
- Verificar productos más solicitados

## Extensiones Futuras

### Posibles Mejoras
- Integración con CRM externo (HubSpot, Salesforce)
- Plantillas de cotización automáticas
- Workflow de aprobación para cotizaciones grandes
- Dashboard en tiempo real
- API webhooks para notificaciones
- Integración con sistema de inventario
