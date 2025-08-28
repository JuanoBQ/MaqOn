/**
 * cotizacion service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::cotizacion.cotizacion', ({ strapi }) => ({
  // Método personalizado para obtener cotizaciones con filtros avanzados
  async findWithFilters(params: any = {}) {
    const { filters = {}, sort = 'fecha_solicitud:desc', pagination = {} } = params;

    return await strapi.entityService.findMany('api::cotizacion.cotizacion', {
      filters,
      sort,
      pagination,
      populate: {
        // Agregar relaciones si las hay
      }
    });
  },

  // Método para generar reportes
  async generateReport(dateFrom: string, dateTo: string, estado: string | null = null) {
    const filters: any = {
      fecha_solicitud: {
        $gte: dateFrom,
        $lte: dateTo
      }
    };

    if (estado) {
      filters.estado = estado;
    }

    const cotizaciones = await strapi.entityService.findMany('api::cotizacion.cotizacion', {
      filters,
      sort: 'fecha_solicitud:desc'
    });

    // Generar estadísticas del reporte
    const stats = {
      total: cotizaciones.length,
      por_estado: {} as Record<string, number>,
      por_categoria: {} as Record<string, number>,
      por_mes: {} as Record<string, number>
    };

    cotizaciones.forEach((cotizacion: any) => {
      // Contar por estado
      const estado = cotizacion.estado;
      stats.por_estado[estado] = (stats.por_estado[estado] || 0) + 1;

      // Contar por categoría de producto
      const categoria = cotizacion.producto_categoria;
      if (categoria) {
        stats.por_categoria[categoria] = (stats.por_categoria[categoria] || 0) + 1;
      }

      // Contar por mes
      const mes = new Date(cotizacion.fecha_solicitud).toISOString().substring(0, 7);
      stats.por_mes[mes] = (stats.por_mes[mes] || 0) + 1;
    });

    return {
      cotizaciones,
      estadisticas: stats,
      periodo: {
        desde: dateFrom,
        hasta: dateTo
      }
    };
  },

  // Método para notificar seguimiento de cotizaciones
  async notifyFollowUp() {
    // Buscar cotizaciones pendientes de más de 3 días
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    const pendingQuotes = await strapi.entityService.findMany('api::cotizacion.cotizacion', {
      filters: {
        estado: 'pendiente',
        fecha_solicitud: {
          $lt: threeDaysAgo.toISOString()
        }
      }
    });

    // Enviar notificaciones (implementar según necesidades)
    console.log(`📋 ${pendingQuotes.length} cotizaciones pendientes requieren seguimiento`);
    
    return pendingQuotes;
  }
}));
