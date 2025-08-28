import Link from 'next/link'

export default function TestBreadcrumbPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Prueba de Navegación (Breadcrumb)
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Navegación Principal</h2>
            <div className="space-y-3">
              <Link 
                href="/" 
                className="block p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                🏠 Inicio
              </Link>
              <Link 
                href="/productos" 
                className="block p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
              >
                📦 Productos (Categorías)
              </Link>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Categorías de Productos</h2>
            <div className="space-y-3">
              <Link 
                href="/productos/construccion" 
                className="block p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                🏗️ Construcción
              </Link>
              <Link 
                href="/productos/agro" 
                className="block p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
              >
                🚜 Agro
              </Link>
              <Link 
                href="/productos/manofactura" 
                className="block p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
              >
                🏭 Manufactura
              </Link>
              <Link 
                href="/productos/elevacion" 
                className="block p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors"
              >
                📐 Elevación
              </Link>
              <Link 
                href="/productos/repuestos" 
                className="block p-3 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
              >
                🔧 Repuestos
              </Link>
              <Link 
                href="/productos/otros" 
                className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ⚙️ Otros
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Producto de Prueba</h2>
          <div className="space-y-3">
            <Link 
              href="/productos/vpjs4ztee95gytz5p7y0jcec" 
              className="block p-3 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors"
            >
              🔗 Mezcladora de concreto 50hp (Vista completa con breadcrumb)
            </Link>
          </div>
        </div>
        
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Instrucciones de Prueba</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Haz clic en "Productos (Categorías)" para ir a la página principal de productos</li>
            <li>Desde ahí, haz clic en cualquier categoría (ej: Construcción)</li>
            <li>Haz clic en un producto para ver la vista individual</li>
            <li>Verifica que el breadcrumb funcione: Inicio → Productos → Categoría → Producto</li>
            <li>Cada enlace del breadcrumb debe llevarte a la página correspondiente</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
