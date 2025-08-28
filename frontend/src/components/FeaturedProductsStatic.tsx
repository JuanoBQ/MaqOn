'use client'

import Link from 'next/link'
import { ArrowRightIcon, StarIcon } from '@heroicons/react/24/solid'
import { useProductos } from '@/hooks/useStrapi';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';
import { OptimizedImage } from '@/components/ui/OptimizedImage';

export function FeaturedProductsStatic() {
  const { productos, loading, error } = useProductos();

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
            {[...Array(6)].map((_, i) => (
              <ProductCardSkeleton key={i} />
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

  if (!productos || !Array.isArray(productos) || productos.length === 0) {
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

  const featuredProducts = productos.slice(0, 6);

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header - Estático */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
            Nuestros <span className="gradient-text">Productos</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre nuestra selección de productos industriales de alta calidad. 
            Cada producto está diseñado para maximizar la eficiencia y durabilidad.
          </p>
        </div>

        {/* Products Grid - Estático */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-16">
          {featuredProducts.map((producto) => {
            if (!producto || !producto.nombre) {
              return null;
            }

            const { nombre, descripcion, categoria, caracteristicas, precio, imagenes, imagen } = producto;
            
            // Usar la primera imagen del array imagenes, o imagen como fallback
            const firstImage = imagenes && imagenes.length > 0 ? imagenes[0] : imagen;

            // Función para validar si el precio debe mostrarse
            const shouldShowPrice = (price: any): boolean => {
              if (price === null || price === undefined || price === '') {
                return false
              }
              const numPrice = Number(price)
              return !isNaN(numPrice) && numPrice > 0
            }

            return (
              <div
                key={producto.id}
                className="card group hover:shadow-xl transition-all duration-300"
              >
                {/* Product Image */}
                <div className="relative h-40 sm:h-48 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-t-xl mb-3 sm:mb-4 overflow-hidden">
                  {firstImage?.url ? (
                    <OptimizedImage
                      src={firstImage.url.startsWith('http') ? firstImage.url : `${process.env.NEXT_PUBLIC_STRAPI_URL}${firstImage.url}`}
                      alt={firstImage.alternativeText || nombre || 'Producto'}
                      width={400}
                      height={192}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      fallback="/images/placeholder-product.jpg"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-3xl sm:text-4xl">🏭</span>
                    </div>
                  )}
                  
                  {/* Multiple Images Indicator */}
                  {imagenes && imagenes.length > 1 && (
                    <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                      <span className="bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                        +{imagenes.length - 1}
                      </span>
                    </div>
                  )}
                  
                  {/* Category Badge */}
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                    <span className="bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
                      {categoria || 'Sin categoría'}
                    </span>
                  </div>
                </div>

                {/* Product Content */}
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-display font-bold text-secondary-900 mb-2 sm:mb-3 group-hover:text-primary-500 transition-colors duration-200 line-clamp-2">
                    {nombre || 'Producto sin nombre'}
                  </h3>

                  <p className="text-sm sm:text-base text-secondary-600 mb-3 sm:mb-4 line-clamp-3">
                    {descripcion || 'Sin descripción'}
                  </p>

                  {/* Features */}
                  <div className="space-y-1 sm:space-y-2 mb-4 sm:mb-6">
                    {caracteristicas && typeof caracteristicas === 'object' && Object.keys(caracteristicas).length > 0 ? (
                      Object.entries(caracteristicas).slice(0, 3).map(([key, value]) => (
                        <div key={key} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary-500 rounded-full flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-secondary-700">
                            <span className="font-medium">{key}:</span> {String(value)}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="text-xs sm:text-sm text-secondary-600">Características no disponibles</div>
                    )}
                  </div>

                  {/* Price and CTA */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                    {shouldShowPrice(precio) ? (
                      <div className="text-xl sm:text-2xl font-display font-bold text-primary-600">
                        €{Number(precio).toLocaleString()}
                      </div>
                    ) : (
                      <div className="text-base sm:text-lg font-medium text-secondary-600">
                        Precio a consultar
                      </div>
                    )}
                    
                                         <Link 
                       href={`/productos/${producto.id}`}
                       className="btn-outline group-hover:bg-primary-500 group-hover:text-white group-hover:border-primary-500"
                     >
                      Ver Detalles
                      <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section - Estático */}
        <div className="text-center">
          <Link href="/productos" className="btn-primary">
            Ver Todos los Productos
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
