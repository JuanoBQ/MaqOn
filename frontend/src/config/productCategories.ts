export interface ProductCategory {
  id: string
  name: string
  description: string
  icon: string
  image: string
  href: string
  features: string[]
  color: string
  gradient: string
  heroGradient: string
}

export const productCategories: ProductCategory[] = [
  {
    id: 'construccion',
    name: 'Equipos de Construcción',
    description: 'Maquinaria pesada, equipos de obra y herramientas especializadas para construcción civil e industrial.',
    icon: '🏗️',
    image: '/images/industries/construction.jpg',
    href: '/productos/construccion',
    features: ['Excavadoras', 'Grúas', 'Hormigoneras', 'Andamios'],
    color: 'from-blue-500 to-blue-600',
    gradient: 'from-blue-600 to-blue-800',
    heroGradient: 'from-blue-600 to-blue-800'
  },
  {
    id: 'agro',
    name: 'Equipos para el Agro',
    description: 'Tecnología agrícola moderna, tractores, sistemas de riego y equipos de procesamiento agroindustrial.',
    icon: '🚜',
    image: '/images/industries/agro.jpg',
    href: '/productos/agro',
    features: ['Tractores', 'Sistemas de Riego', 'Procesadoras', 'Almacenamiento'],
    color: 'from-green-500 to-green-600',
    gradient: 'from-green-600 to-green-800',
    heroGradient: 'from-green-600 to-green-800'
  },
  {
    id: 'metalmecanica',
    name: 'Metalmecánica',
    description: 'Equipos de corte, soldadura, maquinado y herramientas de precisión para la industria metalmecánica.',
    icon: '⚙️',
    image: '/images/industries/metalmecanica.jpg',
    href: '/productos/metalmecanica',
    features: ['Tornos CNC', 'Fresadoras', 'Soldadoras', 'Herramientas'],
    color: 'from-gray-500 to-gray-600',
    gradient: 'from-gray-600 to-gray-800',
    heroGradient: 'from-gray-600 to-gray-800'
  },
  {
    id: 'manufactura',
    name: 'Manufactura',
    description: 'Líneas de producción automatizadas, robots industriales y sistemas de control de calidad.',
    icon: '🏭',
    image: '/images/industries/manufacturing.jpg',
    href: '/productos/manufactura',
    features: ['Líneas de Producción', 'Robots', 'Control de Calidad', 'Automatización'],
    color: 'from-purple-500 to-purple-600',
    gradient: 'from-purple-600 to-purple-800',
    heroGradient: 'from-purple-600 to-purple-800'
  },
  {
    id: 'elevacion',
    name: 'Equipos de Elevación',
    description: 'Montacargas, grúas móviles, plataformas elevadoras y sistemas de izaje industrial.',
    icon: '📐',
    image: '/images/industries/elevacion.jpg',
    href: '/productos/elevacion',
    features: ['Montacargas', 'Grúas Móviles', 'Plataformas', 'Sistemas de Izaje'],
    color: 'from-orange-500 to-orange-600',
    gradient: 'from-orange-600 to-orange-800',
    heroGradient: 'from-orange-600 to-orange-800'
  },
  {
    id: 'repuestos',
    name: 'Repuestos',
    description: 'Repuestos originales y alternativos para toda nuestra línea de equipos industriales.',
    icon: '🔧',
    image: '/images/industries/repuestos.jpg',
    href: '/productos/repuestos',
    features: ['Repuestos Originales', 'Alternativos', 'Mantenimiento', 'Garantía'],
    color: 'from-red-500 to-red-600',
    gradient: 'from-red-600 to-red-800',
    heroGradient: 'from-red-600 to-red-800'
  }
]

export function getCategoryById(id: string): ProductCategory | undefined {
  return productCategories.find(category => category.id === id)
}

export function getCategoryBySlug(slug: string): ProductCategory | undefined {
  return productCategories.find(category => category.id === slug)
}
