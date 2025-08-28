/**
 * cotizacion router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::cotizacion.cotizacion', {
  config: {
    find: {
      middlewares: ['api::cotizacion.populate-cotizacion'],
    },
    findOne: {
      middlewares: ['api::cotizacion.populate-cotizacion'],
    },
  }
});
