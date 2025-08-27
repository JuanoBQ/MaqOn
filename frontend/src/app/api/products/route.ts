import { NextRequest, NextResponse } from 'next/server'

// Simulación de productos - En producción esto vendría de Strapi
const mockProducts = [
  {
    id: 1,
    documentId: "prod001",
    nombre: "Excavadora Hidráulica CAT 320",
    descripcion: "Excavadora hidráulica de 20 toneladas con brazo extendido, ideal para obras de construcción civil y minera.",
    categoria: "construccion",
    caracteristicas: {
      "Peso": "20 toneladas",
      "Potencia": "103 HP",
      "Capacidad": "1.0 m³"
    },
    precio: 85000,
    disponible: true,
    imagen: "/images/industries/construction.jpg",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  },
  {
    id: 2,
    documentId: "prod002",
    nombre: "Grúa Torre Liebherr",
    descripcion: "Grúa torre de alta capacidad para construcción de edificios y estructuras de gran altura.",
    categoria: "construccion",
    caracteristicas: {
      "Capacidad": "8 toneladas",
      "Alcance": "50 metros",
      "Altura": "200 metros"
    },
    precio: 125000,
    disponible: true,
    imagen: "/images/industries/construction.jpg",
    createdAt: "2024-01-16T10:00:00Z",
    updatedAt: "2024-01-16T10:00:00Z"
  },
  {
    id: 3,
    documentId: "prod003",
    nombre: "Tractor Agrícola John Deere",
    descripcion: "Tractor agrícola de alta potencia para labores de campo y preparación de suelos.",
    categoria: "agro",
    caracteristicas: {
      "Potencia": "150 HP",
      "Tracción": "4x4",
      "Combustible": "Diesel"
    },
    precio: 45000,
    disponible: true,
    imagen: "/images/industries/agro.jpg",
    createdAt: "2024-01-17T10:00:00Z",
    updatedAt: "2024-01-17T10:00:00Z"
  },
  {
    id: 4,
    documentId: "prod004",
    nombre: "Torno CNC Haas ST-20",
    descripcion: "Torno CNC de alta precisión para mecanizado de piezas metálicas complejas.",
    categoria: "metalmecanica",
    caracteristicas: {
      "Diámetro": "508 mm",
      "Longitud": "762 mm",
      "Control": "Haas CNC"
    },
    precio: 65000,
    disponible: true,
    imagen: "/images/industries/metalmecanica.jpg",
    createdAt: "2024-01-18T10:00:00Z",
    updatedAt: "2024-01-18T10:00:00Z"
  },
  {
    id: 5,
    documentId: "prod005",
    nombre: "Robot Industrial ABB",
    descripcion: "Robot industrial de 6 ejes para automatización de líneas de producción.",
    categoria: "manufactura",
    caracteristicas: {
      "Carga": "10 kg",
      "Alcance": "1.45 metros",
      "Precisión": "±0.02 mm"
    },
    precio: 35000,
    disponible: true,
    imagen: "/images/industries/manufacturing.jpg",
    createdAt: "2024-01-19T10:00:00Z",
    updatedAt: "2024-01-19T10:00:00Z"
  },
  {
    id: 6,
    documentId: "prod006",
    nombre: "Montacargas Toyota",
    descripcion: "Montacargas eléctrico de alta capacidad para operaciones logísticas y almacenes.",
    categoria: "elevacion",
    caracteristicas: {
      "Capacidad": "2.5 toneladas",
      "Altura": "6 metros",
      "Tipo": "Eléctrico"
    },
    precio: 28000,
    disponible: true,
    imagen: "/images/industries/elevacion.jpg",
    createdAt: "2024-01-20T10:00:00Z",
    updatedAt: "2024-01-20T10:00:00Z"
  },
  {
    id: 7,
    documentId: "prod007",
    nombre: "Kit de Repuestos Motor Diesel",
    descripcion: "Kit completo de repuestos para motores diesel industriales de 50-100 HP.",
    categoria: "repuestos",
    caracteristicas: {
      "Aplicación": "50-100 HP",
      "Incluye": "Pistones, anillos, válvulas",
      "Garantía": "12 meses"
    },
    precio: 1200,
    disponible: true,
    imagen: "/images/industries/repuestos.jpg",
    createdAt: "2024-01-21T10:00:00Z",
    updatedAt: "2024-01-21T10:00:00Z"
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    
    let filteredProducts = mockProducts
    
    // Filtrar por categoría si se especifica
    if (category) {
      filteredProducts = mockProducts.filter(product => 
        product.categoria.toLowerCase() === category.toLowerCase()
      )
    }
    
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return NextResponse.json({
      success: true,
      products: filteredProducts,
      total: filteredProducts.length,
      category: category || 'all'
    })
    
  } catch (error) {
    console.error('Error en API de productos:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error interno del servidor' 
      },
      { status: 500 }
    )
  }
}
