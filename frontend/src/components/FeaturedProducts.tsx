'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link'
import { ArrowRightIcon, StarIcon } from '@heroicons/react/24/solid'
import { useProductos } from '@/hooks/useStrapi';

export function FeaturedProducts() {
  const { productos, loading, error } = useProductos();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Debug: mostrar estructura de datos
  console.log('Productos recibidos:', productos);
  console.log('Tipo de productos:', typeof productos);
  console.log('Es array?', Array.isArray(productos));
  console.log('Length:', productos?.length);
  console.log('Primer producto:', productos?.[0]);

  if (loading) {
    return (
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Nuestros <span className="gradient-text">Productos</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cargando productos destacados...
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-xl mb-4"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
            Nuestros <span className="gradient-text">Productos</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Lo sentimos, hubo un error al cargar los productos.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-primary"
          >
            Intentar de Nuevo
          </button>
        </div>
      </section>
    );
  }

  // Debug: verificar datos antes de validar
  console.log('Antes de validar - productos:', productos);
  console.log('Antes de validar - es array:', Array.isArray(productos));
  console.log('Antes de validar - length:', productos?.length);

  // Validar que productos sea un array y tenga datos
  if (!productos || !Array.isArray(productos) || productos.length === 0) {
    console.log('Validación falló - productos:', productos);
    console.log('Validación falló - es array:', Array.isArray(productos));
    console.log('Validación falló - length:', productos?.length);
    
    return (
      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
            Nuestros <span className="gradient-text">Productos</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            No hay productos disponibles en este momento.
          </p>
          <Link href="/cotizacion" className="btn-primary">
            Solicitar Cotización
          </Link>
        </div>
      </section>
    );
  }

  // Debug: después de validar
  console.log('Después de validar - productos:', productos);
  console.log('Después de validar - length:', productos.length);

  // Mostrar solo los primeros 6 productos
  const featuredProducts = productos.slice(0, 6);
  console.log('Featured products:', featuredProducts);

  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
            Nuestros <span className="gradient-text">Productos</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre nuestra selección de productos industriales de alta calidad. 
            Cada producto está diseñado para maximizar la eficiencia y durabilidad.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featuredProducts.map((producto, index) => {
            console.log('Renderizando producto:', producto, 'index:', index);
            
            // Validar que el producto tenga la estructura correcta
            if (!producto || !producto.nombre) {
              console.warn('Producto inválido:', producto);
              return null;
            }

            const { nombre, descripcion, categoria, caracteristicas, precio, imagen } = producto;

            return (
              <motion.div
                key={producto.id}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card group hover:shadow-xl transition-all duration-300"
              >
                {/* Product Image */}
                <div className="relative h-48 bg-gradient-to-br from-primary-100 to-accent-100 rounded-t-xl mb-4 overflow-hidden">
                  {imagen?.url ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${imagen.url}`}
                      alt={imagen.alternativeText || nombre || 'Producto'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-4xl">🏭</span>
                    </div>
                  )}
                  
                  {/* Category Badge */}
                  {categoria && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
                        {categoria}
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Content */}
                <div className="p-6">
                  <h3 className="text-xl font-display font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-200">
                    {nombre || 'Producto sin nombre'}
                  </h3>
                  
                  {descripcion && (
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {descripcion}
                    </p>
                  )}

                  {/* Features */}
                  {caracteristicas && typeof caracteristicas === 'object' && (
                    <div className="space-y-2 mb-6">
                      {Object.entries(caracteristicas).slice(0, 3).map(([key, value]) => (
                        <div key={key} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0" />
                          <span className="text-sm text-gray-700">
                            <span className="font-medium">{key}:</span> {String(value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    {precio ? (
                      <div className="text-2xl font-display font-bold text-primary-600">
                        €{Number(precio).toLocaleString()}
                      </div>
                    ) : (
                      <div className="text-lg font-medium text-gray-600">
                        Precio a consultar
                      </div>
                    )}
                    
                    <Link 
                      href={`/productos/${producto.id}`} 
                      className="btn-outline group-hover:bg-primary-600 group-hover:text-white transition-all duration-200"
                    >
                      Ver Detalles
                      <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">
            ¿No encuentras lo que buscas?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Nuestro equipo puede ayudarte a encontrar la solución perfecta para tus necesidades específicas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/productos" className="btn-primary">
              Ver Todos los Productos
            </Link>
            <Link href="/cotizacion" className="btn-outline">
              Solicitar Cotización
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
