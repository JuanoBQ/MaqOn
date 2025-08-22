export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import Link from 'next/link'
import { strapiClient } from '@/lib/strapi'

interface ProductoParams {
  params: { id: string }
}

async function fetchProducto(id: string) {
  const numericId = Number(id)
  if (!Number.isFinite(numericId)) return null

  // Intento 1: endpoint directo /productos/:id
  try {
    const res = await strapiClient.getProducto(numericId)
    const productoDirecto = (res && (res.data ?? res)) || null
    if (productoDirecto) {
      console.log('[producto detalle] obtenido por /productos/:id', productoDirecto)
      return productoDirecto
    }
  } catch (e) {
    console.warn('[producto detalle] fallo en /productos/:id, intentando filtro', e)
  }

  // Intento 2: filtrar por id
  try {
    const alt = await strapiClient.fetch<any>(`/productos?filters[id][$eq]=${numericId}&populate=*`)
    const productoFiltrado = alt?.data?.[0] || null
    console.log('[producto detalle] obtenido por filtro', productoFiltrado)
    return productoFiltrado
  } catch (e) {
    console.error('[producto detalle] error al obtener por filtro', e)
    return null
  }
}

export async function generateMetadata({ params }: ProductoParams): Promise<Metadata> {
  const producto = await fetchProducto(params.id)
  if (!producto) {
    return {
      title: 'Producto no encontrado',
      description: 'El producto solicitado no está disponible.',
      robots: { index: false },
    }
  }

  const siteUrl = process.env.SITE_URL || 'https://maqon.com'
  const title = `${producto.nombre} | MaqOn`
  const description = producto.descripcion || 'Producto industrial disponible por cotización con MaqOn.'
  const imageUrl = producto.imagen?.url ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${producto.imagen.url}` : `${siteUrl}/og-image.jpg`
  const canonical = `/productos/${producto.id}`

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: `${siteUrl}${canonical}`,
      images: [{ url: imageUrl }],
      type: 'website',
      siteName: 'MaqOn',
    },
  }
}

export default async function ProductoPage({ params }: ProductoParams) {
  const producto = await fetchProducto(params.id)

  const nombre = producto?.nombre ?? `Producto #${params.id}`
  const descripcion = producto?.descripcion
  const categoria = producto?.categoria
  const caracteristicas = producto?.caracteristicas
  const precio = producto?.precio
  const imagen = producto?.imagen
  const imageUrl = imagen?.url ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${imagen.url}` : null

  return (
    <div className="min-h-screen">
      <div className="section-padding bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="container-custom">
          <nav className="text-sm text-gray-600 mb-6">
            <Link href="/">Inicio</Link>
            <span className="mx-2">/</span>
            <Link href="/productos">Productos</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{nombre}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="relative w-full h-80 bg-gray-100 flex items-center justify-center">
                {imageUrl ? (
                  <img src={imageUrl} alt={imagen?.alternativeText || nombre} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-6xl">🏭</span>
                )}
              </div>
              {categoria && (
                <div className="px-6 py-3">
                  <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
                    {categoria}
                  </span>
                </div>
              )}
            </div>

            <div>
              <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">{nombre}</h1>

              {producto ? (
                <>
                  {precio ? (
                    <div className="text-3xl font-display font-bold text-primary-600 mb-6">€{Number(precio).toLocaleString()}</div>
                  ) : (
                    <div className="text-xl font-medium text-gray-700 mb-6">Precio a consultar</div>
                  )}

                  {descripcion && (
                    <p className="text-gray-700 leading-relaxed mb-8">{descripcion}</p>
                  )}

                  {caracteristicas && typeof caracteristicas === 'object' && (
                    <div className="mb-8">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">Características</h2>
                      <div className="grid md:grid-cols-2 gap-3">
                        {Object.entries(caracteristicas).map(([key, value]) => (
                          <div key={key} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0" />
                            <span className="text-gray-700"><span className="font-medium capitalize">{key}:</span> {String(value)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 text-yellow-800">
                  No se pudo cargar la información del producto. Verifica que el ID existe y que el CMS está disponible.
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/cotizacion" className="btn-primary">Solicitar Cotización</Link>
                <Link href="/productos" className="btn-outline">Volver a Productos</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
