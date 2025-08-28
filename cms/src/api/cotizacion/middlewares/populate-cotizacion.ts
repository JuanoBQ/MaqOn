/**
 * `populate-cotizacion` middleware
 */

export default (config, { strapi }) => {
  return async (ctx, next) => {
    // Agregar población automática de campos relacionados si es necesario
    if (ctx.query.populate === undefined) {
      ctx.query.populate = {
        // Agregar campos a popular automáticamente
        // Por ejemplo, si hay relaciones con usuarios o productos
      };
    }

    await next();
  };
};
