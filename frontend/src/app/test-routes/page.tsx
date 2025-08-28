import Link from 'next/link'

export default function TestRoutesPage() {
  const routes = [
    { name: 'Inicio', href: '/', icon: '🏠' },
    { name: 'Productos', href: '/productos', icon: '📦' },
    { name: 'Construcción', href: '/productos/construccion', icon: '🏗️' },
    { name: 'Agro', href: '/productos/agro', icon: '🚜' },
    { name: 'Manufactura', href: '/productos/manofactura', icon: '🏭' },
    { name: 'Elevación', href: '/productos/elevacion', icon: '📐' },
    { name: 'Repuestos', href: '/productos/repuestos', icon: '🔧' },
    { name: 'Otros', href: '/productos/otros', icon: '⚙️' },
    { name: 'Producto Test', href: '/productos/vpjs4ztee95gytz5p7y0jcec', icon: '🔗' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Prueba de Rutas
        </h1>
        
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Estado de las Rutas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {routes.map((route, index) => (
              <Link
                key={index}
                href={route.href}
                className="flex items-center space-x-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
              >
                <span className="text-2xl">{route.icon}</span>
                <div>
                  <div className="font-medium text-gray-900">{route.name}</div>
                  <div className="text-sm text-gray-500">{route.href}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Instrucciones de Prueba</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Haz clic en cada ruta para verificar que funcione correctamente</li>
            <li>Verifica que no aparezcan errores 404</li>
            <li>Prueba especialmente las rutas de categorías de productos</li>
            <li>Verifica que el breadcrumb funcione desde la vista del producto</li>
          </ol>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Rutas que deberían funcionar:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>✅ /productos/construccion</li>
              <li>✅ /productos/agro</li>
              <li>✅ /productos/manofactura</li>
              <li>✅ /productos/elevacion</li>
              <li>✅ /productos/repuestos</li>
              <li>✅ /productos/otros</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
