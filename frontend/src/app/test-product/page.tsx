import Link from 'next/link'

export default function TestProductPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Prueba de Productos
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Productos de Prueba</h2>
            <div className="space-y-3">
              <Link 
                href="/productos/1" 
                className="block p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                Producto ID 1 (numérico)
              </Link>
                             <Link 
                 href="/productos/prod001" 
                 className="block p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
               >
                 Producto documentId prod001
               </Link>
               <Link 
                 href="/productos/vpjs4ztee95gytz5p7y0jcec" 
                 className="block p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors"
               >
                 Producto documentId vpjs4ztee95gytz5p7y0jcec
               </Link>
              <Link 
                href="/productos/2" 
                className="block p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
              >
                Producto ID 2 (numérico)
              </Link>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">APIs de Debug</h2>
            <div className="space-y-3">
              <a 
                href="/api/debug/products" 
                target="_blank"
                className="block p-3 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors"
              >
                Debug: Todos los productos
              </a>
                             <a 
                 href="/api/debug/product?id=1" 
                 target="_blank"
                 className="block p-3 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
               >
                 Debug: Producto ID 1
               </a>
               <a 
                 href="/api/debug/product?id=vpjs4ztee95gytz5p7y0jcec" 
                 target="_blank"
                 className="block p-3 bg-pink-50 hover:bg-pink-100 rounded-lg transition-colors"
               >
                 Debug: Producto vpjs4ztee95gytz5p7y0jcec
               </a>
               <a 
                 href="/api/debug/image?id=vpjs4ztee95gytz5p7y0jcec" 
                 target="_blank"
                 className="block p-3 bg-cyan-50 hover:bg-cyan-100 rounded-lg transition-colors"
               >
                 Debug: Imagen vpjs4ztee95gytz5p7y0jcec
               </a>
              <a 
                href="/api/products" 
                target="_blank"
                className="block p-3 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
              >
                API: Lista de productos
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Instrucciones</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Haz clic en los enlaces de productos para probar la navegación</li>
            <li>Si obtienes 404, revisa la consola del navegador para ver los logs</li>
            <li>Usa las APIs de debug para verificar qué datos están disponibles</li>
            <li>Verifica que Strapi esté funcionando en <code>http://localhost:1337</code></li>
          </ol>
        </div>
      </div>
    </div>
  )
}
