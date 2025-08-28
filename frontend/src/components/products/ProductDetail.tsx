'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeftIcon, 
  ArrowRightIcon, 
  CheckCircleIcon,
  CurrencyDollarIcon,
  TruckIcon,
  ShieldCheckIcon,
  PhoneIcon,
  EnvelopeIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { Product } from '@/types/product'

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [showQuoteForm, setShowQuoteForm] = useState(false)
  const [showFullscreen, setShowFullscreen] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  
  // Estados del formulario de cotización
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    empresa: '',
    telefono: '',
    cantidad: 1,
    mensaje: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  // Función para validar si el precio debe mostrarse
  const shouldShowPrice = (price: any): boolean => {
    // Verificar si el precio existe y es válido
    if (price === null || price === undefined || price === '') {
      return false
    }
    
    // Convertir a número y verificar que sea mayor a 0
    const numPrice = Number(price)
    return !isNaN(numPrice) && numPrice > 0
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'construccion': 'bg-blue-100 text-blue-800',
      'agro': 'bg-green-100 text-green-800',
      'manofactura': 'bg-purple-100 text-purple-800',
      'elevacion': 'bg-orange-100 text-orange-800',
      'repuestos': 'bg-red-100 text-red-800',
      'otros': 'bg-gray-100 text-gray-800',
    }
    return colors[category.toLowerCase()] || 'bg-gray-100 text-gray-800'
  }

  const getCategoryName = (category: string) => {
    const names: Record<string, string> = {
      'construccion': 'Construcción',
      'agro': 'Agro',
      'manofactura': 'Manufactura',
      'elevacion': 'Elevación',
      'repuestos': 'Repuestos',
      'otros': 'Otros',
    }
    return names[category.toLowerCase()] || category
  }

  const getCategoryRoute = (category: string) => {
    // Mapear categorías de Strapi a rutas correctas
    const routeMap: Record<string, string> = {
      'construccion': '/productos/construccion',
      'agro': '/productos/agro',
      'manofactura': '/productos/manofactura',
      'elevacion': '/productos/elevacion',
      'repuestos': '/productos/repuestos',
      'otros': '/productos/otros',
    }
    return routeMap[category.toLowerCase()] || '/productos'
  }

  const getWhatsAppUrl = () => {
    const phoneNumber = '573001234567' // Reemplazar con el número real de WhatsApp
    const message = encodeURIComponent(
      `¡Hola! Me interesa el producto: ${product.nombre}\n\n` +
      `Categoría: ${getCategoryName(product.categoria)}\n` +
      `${shouldShowPrice(product.precio) ? `Precio de referencia: ${formatPrice(Number(product.precio))}\n` : ''}` +
      `Me gustaría obtener más información y una cotización.\n\n` +
      `Enlace del producto: ${window.location.href}`
    )
    return `https://wa.me/${phoneNumber}?text=${message}`
  }

  // Usar el nuevo campo imagenes, con fallback a imagen para compatibilidad
  const images = product.imagenes && product.imagenes.length > 0 
    ? product.imagenes 
    : (product.imagen ? [product.imagen] : [])

  // Debug: Verificar que las imágenes se están procesando correctamente
  if (process.env.NODE_ENV === 'development') {
    console.log('🖼️ ProductDetail - images procesadas:', images.length, 'imágenes')
  }

  // Funciones de navegación
  const goToPrevious = useCallback(() => {
    setSelectedImage(prev => prev > 0 ? prev - 1 : images.length - 1)
  }, [images.length])

  const goToNext = useCallback(() => {
    setSelectedImage(prev => prev < images.length - 1 ? prev + 1 : 0)
  }, [images.length])

  // Manejo de gestos táctiles
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0) // Reset para evitar swipe accidental
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && images.length > 1) {
      goToNext()
    }
    if (isRightSwipe && images.length > 1) {
      goToPrevious()
    }
  }

  // Navegación con teclado
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (images.length > 1) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault()
          goToPrevious()
        } else if (e.key === 'ArrowRight') {
          e.preventDefault()
          goToNext()
        } else if (e.key === 'Escape' && showFullscreen) {
          setShowFullscreen(false)
        }
      } else if (e.key === 'Escape' && showFullscreen) {
        setShowFullscreen(false)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [showFullscreen, goToPrevious, goToNext, images.length])

  // Prevenir scroll del body cuando está en fullscreen
  useEffect(() => {
    if (showFullscreen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showFullscreen])

  // Manejar cambios en el formulario
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Enviar formulario de cotización
  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Dividir el nombre en firstName y lastName
      const nameParts = formData.nombre.trim().split(' ')
      const firstName = nameParts[0] || ''
      const lastName = nameParts.slice(1).join(' ') || firstName // Si no hay apellido, usar el nombre como apellido
      
      // Validación adicional
      if (!firstName || !lastName) {
        throw new Error('Nombre y apellido son requeridos')
      }

      // Preparar datos para HubSpot
      const hubspotData = {
        firstName,
        lastName,
        email: formData.email,
        company: formData.empresa,
        phone: formData.telefono,
        productInterest: `${product.nombre} (${getCategoryName(product.categoria)})`,
        quantity: formData.cantidad.toString(),
        requirements: `${formData.mensaje}${formData.mensaje ? '\n\n' : ''}Producto solicitado: ${product.nombre}\nCategoría: ${getCategoryName(product.categoria)}${shouldShowPrice(product.precio) ? `\nPrecio de referencia: ${formatPrice(Number(product.precio))}` : ''}`,
        timeline: 'normal' // Valor por defecto
      }

      // Enviar a HubSpot
      const response = await fetch('/api/hubspot-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hubspotData)
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        // Limpiar formulario
        setFormData({
          nombre: '',
          email: '',
          empresa: '',
          telefono: '',
          cantidad: 1,
          mensaje: ''
        })
        
        // Cerrar modal después de 3 segundos
        setTimeout(() => {
          setShowQuoteForm(false)
          setSubmitStatus('idle')
        }, 3000)
      } else {
        throw new Error(result.error || 'Error al enviar cotización')
      }
    } catch (error) {
      console.error('Error al enviar cotización:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Inicio
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/productos" className="text-gray-500 hover:text-gray-700">
              Productos
            </Link>
            <span className="text-gray-400">/</span>
            <Link 
              href={getCategoryRoute(product.categoria)} 
              className="text-gray-500 hover:text-gray-700"
            >
              {getCategoryName(product.categoria)}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{product.nombre}</span>
          </nav>
        </div>
      </div>

      {/* Product Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image Carousel */}
            <div 
              className="relative bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
              onClick={() => images.length > 0 && setShowFullscreen(true)}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="relative w-full h-[400px] sm:h-[450px] lg:h-[500px]">
                <AnimatePresence mode="wait">
                  {images.length > 0 ? (
                    <motion.img
                      key={selectedImage}
                      src={typeof images[selectedImage] === 'string' ? images[selectedImage] as string : images[selectedImage].url}
                      alt={typeof images[selectedImage] === 'string' ? product.nombre : (images[selectedImage].alternativeText || product.nombre)}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <div className="text-6xl text-gray-400">⚙️</div>
                    </div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Fullscreen Indicator */}
              {images.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm"
                >
                  🔍 Click para ampliar
                </motion.div>
              )}
              
              {/* Image Counter */}
              {images.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {selectedImage + 1} / {images.length}
                </div>
              )}
              
              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      goToPrevious()

                    }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                    aria-label="Imagen anterior"
                    title="Imagen anterior"
                  >
                    <ArrowLeftIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      goToNext()

                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                    aria-label="Imagen siguiente"
                    title="Imagen siguiente"
                  >
                    <ArrowRightIcon className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Dots Indicator */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedImage(index)
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === selectedImage 
                          ? 'bg-white scale-125' 
                          : 'bg-white/50'
                      }`}
                      aria-label={`Ir a imagen ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <motion.button
                    key={typeof image === 'string' ? index : (image.id || index)}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === index 
                        ? 'border-gray-300' 
                        : 'border-gray-200'
                    }`}
                    aria-label={`Ver imagen ${index + 1}`}
                  >
                    <img
                      src={typeof image === 'string' ? image : image.url}
                      alt={typeof image === 'string' ? `Vista ${index + 1}` : (image.alternativeText || `Vista ${index + 1}`)}
                      className="w-full h-full object-cover transition-all duration-300"
                    />

                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(product.categoria)}`}>
                  {getCategoryName(product.categoria)}
                </span>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {product.nombre}
              </h1>
              
              {/* Solo mostrar precio si es mayor a 0 */}
              {shouldShowPrice(product.precio) && (
                <div className="text-3xl font-bold text-[#f7b34b] mb-6">
                  {formatPrice(Number(product.precio))}
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Descripción</h2>
              <p className="text-gray-600 leading-relaxed">
                {product.descripcion}
              </p>
            </div>

            {/* Characteristics */}
            {product.caracteristicas && Object.keys(product.caracteristicas).length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Características Técnicas</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(product.caracteristicas).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                        {key}
                      </div>
                      <div className="text-lg font-semibold text-gray-900">
                        {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Import Benefits */}
            <div className="bg-gradient-to-r from-[#f7b34b]/10 to-[#f7b34b]/5 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Beneficios de Importación con MaqOn
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Importación directa desde fabricantes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Gestión completa de trámites aduaneros</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Entrega en toda Colombia</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-4">
              {product.disponible ? (
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => setShowQuoteForm(true)}
                    className="flex-1 bg-[#f7b34b] hover:bg-[#e6a02e] text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <CurrencyDollarIcon className="w-5 h-5" />
                    <span>Solicitar Cotización</span>
                  </button>
                  
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-white hover:bg-gray-50 text-[#25D366] font-semibold py-4 px-6 rounded-lg border-2 border-[#25D366] transition-all duration-200 flex items-center justify-center space-x-2 hover:bg-[#25D366] hover:text-white"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.309"/>
                    </svg>
                    <span>Contactar por WhatsApp</span>
                  </a>
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 mb-4">Este producto no está disponible actualmente</p>
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-[#25D366] hover:bg-[#1da851] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 space-x-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.309"/>
                    </svg>
                    <span>Notificarme por WhatsApp</span>
                  </a>
                </div>
              )}
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center">
                <TruckIcon className="w-8 h-8 text-[#f7b34b] mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900">Entrega</div>
                <div className="text-xs text-gray-500">En toda Colombia</div>
              </div>
              <div className="text-center">
                <ShieldCheckIcon className="w-8 h-8 text-[#f7b34b] mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900">Garantía</div>
                <div className="text-xs text-gray-500">Original del fabricante</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {showFullscreen && images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            onClick={() => setShowFullscreen(false)}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Close Button */}
              <button
                onClick={() => setShowFullscreen(false)}
                className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200"
                aria-label="Cerrar pantalla completa"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>

              {/* Main Image */}
              <div 
                className="relative max-w-7xl max-h-full mx-4"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    src={typeof images[selectedImage] === 'string' ? images[selectedImage] as string : images[selectedImage].url}
                    alt={typeof images[selectedImage] === 'string' ? product.nombre : (images[selectedImage].alternativeText || product.nombre)}
                    className="max-w-full max-h-[90vh] object-contain"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    onClick={(e) => e.stopPropagation()}
                  />
                </AnimatePresence>
              </div>

              {/* Navigation in Fullscreen */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      goToPrevious()

                    }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-4 rounded-full transition-all duration-200 hover:scale-110"
                    aria-label="Imagen anterior"
                  >
                    <ArrowLeftIcon className="w-6 h-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      goToNext()

                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-4 rounded-full transition-all duration-200 hover:scale-110"
                    aria-label="Imagen siguiente"
                  >
                    <ArrowRightIcon className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Counter in Fullscreen */}
              {images.length > 1 && (
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full">
                  {selectedImage + 1} / {images.length}
                </div>
              )}

              {/* Dots in Fullscreen */}
              {images.length > 1 && (
                <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-3">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedImage(index)
                      }}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${
                        index === selectedImage 
                          ? 'bg-white scale-125' 
                          : 'bg-white/50'
                      }`}
                      aria-label={`Ir a imagen ${index + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Instructions */}
              <div className="absolute top-4 left-4 text-white/70 text-sm bg-black/30 px-3 py-2 rounded-lg backdrop-blur-sm">
                <p className="flex items-center space-x-2">
                  <span>← →</span> <span>Navegar</span>
                  <span className="mx-2">•</span>
                  <span>ESC</span> <span>Cerrar</span>
                </p>
                <p className="text-xs mt-1 opacity-75">
                  📱 Desliza • 🖱️ Click para cerrar
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quote Form Modal */}
      <AnimatePresence>
        {showQuoteForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowQuoteForm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Solicitar Cotización
              </h3>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600 mb-2">Producto solicitado:</p>
                <p className="font-semibold text-gray-900">{product.nombre}</p>
                <p className="text-sm text-gray-500">Categoría: {getCategoryName(product.categoria)}</p>
                {shouldShowPrice(product.precio) && (
                  <p className="text-sm text-gray-500">Precio de referencia: {formatPrice(Number(product.precio))}</p>
                )}
              </div>

              {/* Mensaje de estado */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4"
                >
                  <div className="flex items-center">
                    <CheckCircleIcon className="w-5 h-5 mr-2" />
                    <span>¡Cotización enviada exitosamente! Te contactaremos pronto.</span>
                  </div>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4"
                >
                  <div className="flex items-center">
                    <XMarkIcon className="w-5 h-5 mr-2" />
                    <span>Error al enviar la cotización. Por favor, intenta de nuevo.</span>
                  </div>
                </motion.div>
              )}
              
              <form onSubmit={handleSubmitQuote} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre y apellido *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleFormChange}
                    required
                    disabled={isSubmitting || submitStatus === 'success'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f7b34b] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Juan Pérez"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    disabled={isSubmitting || submitStatus === 'success'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f7b34b] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="tu@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Empresa
                  </label>
                  <input
                    type="text"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleFormChange}
                    disabled={isSubmitting || submitStatus === 'success'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f7b34b] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Nombre de tu empresa"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleFormChange}
                    required
                    disabled={isSubmitting || submitStatus === 'success'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f7b34b] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="+57 300 123 4567"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cantidad requerida
                  </label>
                  <input
                    type="number"
                    name="cantidad"
                    value={formData.cantidad}
                    onChange={handleFormChange}
                    min="1"
                    disabled={isSubmitting || submitStatus === 'success'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f7b34b] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="1"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mensaje adicional
                  </label>
                  <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleFormChange}
                    rows={3}
                    disabled={isSubmitting || submitStatus === 'success'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f7b34b] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Información adicional sobre tu requerimiento..."
                  />
                </div>
                
                <div className="flex space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowQuoteForm(false)}
                    disabled={isSubmitting}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || submitStatus === 'success'}
                    className="flex-1 bg-[#f7b34b] hover:bg-[#e6a02e] text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enviando...
                      </>
                    ) : submitStatus === 'success' ? (
                      <>
                        <CheckCircleIcon className="w-5 h-5 mr-2" />
                        Enviado
                      </>
                    ) : (
                      'Enviar Cotización'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Related Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Productos Relacionados
          </h2>
          <p className="text-lg text-gray-600">
            Descubre otros equipos de la misma categoría
          </p>
        </div>
        
        <div className="text-center">
          <Link
            href={getCategoryRoute(product.categoria)}
            className="inline-flex items-center bg-[#f7b34b] hover:bg-[#e6a02e] text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 space-x-2"
          >
            <span>Ver todos los productos de {getCategoryName(product.categoria)}</span>
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
