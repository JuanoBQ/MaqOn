/**
 * cotizacion controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::cotizacion.cotizacion', ({ strapi }) => ({
  // Método personalizado para obtener estadísticas de cotizaciones
  async stats(ctx) {
    try {
      const { query } = ctx

      // Obtener todas las cotizaciones para procesar estadísticas
      const allCotizaciones = await strapi.db.query('api::cotizacion.cotizacion').findMany({
        select: ['estado', 'fecha_solicitud', 'producto_nombre'],
      })

      // Procesar conteos por estado
      const estadoStats: Record<string, number> = {}
      allCotizaciones.forEach((item: any) => {
        estadoStats[item.estado] = (estadoStats[item.estado] || 0) + 1
      })

      // Obtener cotizaciones por mes (últimos 6 meses)
      const sixMonthsAgo = new Date()
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

      const monthlyData: Record<string, number> = {}
      allCotizaciones.forEach((item: any) => {
        const fechaSolicitud = new Date(item.fecha_solicitud)
        if (fechaSolicitud >= sixMonthsAgo) {
          const month = fechaSolicitud.toISOString().substring(0, 7) // YYYY-MM
          monthlyData[month] = (monthlyData[month] || 0) + 1
        }
      })

      // Productos más solicitados
      const productStats: Record<string, number> = {}
      allCotizaciones.forEach((item: any) => {
        if (item.producto_nombre) {
          productStats[item.producto_nombre] = (productStats[item.producto_nombre] || 0) + 1
        }
      })

      // Convertir a array y ordenar por popularidad
      const productStatsArray = Object.entries(productStats)
        .map(([nombre, count]) => ({ producto_nombre: nombre, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10)

      ctx.body = {
        estados: estadoStats,
        mensual: monthlyData,
        productos_populares: productStatsArray,
        total: allCotizaciones.length
      }
    } catch (err) {
      ctx.throw(500, err)
    }
  },

  // Método para actualizar estado de cotización
  async updateEstado(ctx) {
    try {
      const { id } = ctx.params
      const { estado, notas_internas, usuario_asignado } = ctx.request.body

      const updatedData: any = { estado }
      
      if (notas_internas) updatedData.notas_internas = notas_internas
      if (usuario_asignado) updatedData.usuario_asignado = usuario_asignado
      
      // Si se marca como enviada, agregar fecha de respuesta
      if (estado === 'enviada') {
        updatedData.fecha_respuesta = new Date().toISOString()
      }

      const entity = await strapi.db.query('api::cotizacion.cotizacion').update({
        where: { id },
        data: updatedData,
      })

      ctx.body = entity
    } catch (err) {
      ctx.throw(500, err)
    }
  },

  // Override del método create para agregar validaciones adicionales
  async create(ctx) {
    try {
      const { data } = ctx.request.body

      // Validar que el email no esté duplicado en las últimas 24 horas para el mismo producto
      const oneDayAgo = new Date()
      oneDayAgo.setDate(oneDayAgo.getDate() - 1)

      const existingQuote = await strapi.db.query('api::cotizacion.cotizacion').findOne({
        where: {
          cliente_email: data.cliente_email,
          producto_id: data.producto_id,
          fecha_solicitud: {
            $gte: oneDayAgo.toISOString()
          }
        }
      })

      if (existingQuote) {
        return ctx.badRequest('Ya existe una cotización reciente para este producto y email')
      }

      // Crear la cotización
      const entity = await strapi.db.query('api::cotizacion.cotizacion').create({
        data: {
          ...data,
          fecha_solicitud: data.fecha_solicitud || new Date().toISOString()
        }
      })

      // Enviar notificación por email (opcional)
      try {
        await strapi.plugins['email'].services.email.send({
          to: process.env.ADMIN_EMAIL || 'admin@maqon.com',
          from: process.env.FROM_EMAIL || 'noreply@maqon.com',
          subject: `Nueva Cotización: ${data.producto_nombre}`,
          html: `
            <h2>Nueva Solicitud de Cotización</h2>
            <p><strong>Cliente:</strong> ${data.cliente_nombre}</p>
            <p><strong>Email:</strong> ${data.cliente_email}</p>
            <p><strong>Teléfono:</strong> ${data.cliente_telefono}</p>
            <p><strong>Producto:</strong> ${data.producto_nombre}</p>
            <p><strong>Cantidad:</strong> ${data.cantidad}</p>
            <p><strong>Mensaje:</strong> ${data.mensaje || 'Sin mensaje'}</p>
          `
        })
      } catch (emailError) {
        console.error('Error enviando email de notificación:', emailError)
        // No fallar la creación si el email falla
      }

      ctx.body = entity
    } catch (err) {
      ctx.throw(500, err)
    }
  }
}))
