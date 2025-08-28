'use client'

import Link from 'next/link'
import { HomeIcon, ArrowLeftIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="animate-fade-in">
          {/* 404 Icon */}
          <div className="mb-8">
            <div className="text-8xl sm:text-9xl font-bold text-[#f7b34b] mb-4">
              404
            </div>
            <div className="text-6xl mb-6">🔧</div>
          </div>

          {/* Error Message */}
          <div className="mb-8 animate-slide-up">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Página no encontrada
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Lo sentimos, la página que buscas no existe o ha sido movida.
            </p>
            <p className="text-gray-500">
              Pero no te preocupes, tenemos muchos productos industriales esperándote.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            <Link
              href="/"
              className="inline-flex items-center bg-[#f7b34b] hover:bg-[#e6a02e] text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <HomeIcon className="w-5 h-5 mr-2" />
              Ir al Inicio
            </Link>
            
            <Link
              href="/productos"
              className="inline-flex items-center bg-white hover:bg-gray-50 text-[#f7b34b] font-semibold px-6 py-3 rounded-lg border-2 border-[#f7b34b] transition-all duration-200 transform hover:scale-105"
            >
              <MagnifyingGlassIcon className="w-5 h-5 mr-2" />
              Ver Productos
            </Link>
          </div>

          {/* Quick Links */}
          <div className="mt-12 pt-8 border-t border-gray-200 animate-slide-up">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Enlaces útiles
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Link
                href="/productos/construccion"
                className="text-sm text-gray-600 hover:text-[#f7b34b] transition-colors duration-200"
              >
                Construcción
              </Link>
              <Link
                href="/productos/agro"
                className="text-sm text-gray-600 hover:text-[#f7b34b] transition-colors duration-200"
              >
                Agro
              </Link>
              <Link
                href="/productos/manofactura"
                className="text-sm text-gray-600 hover:text-[#f7b34b] transition-colors duration-200"
              >
                Manufactura
              </Link>
              <Link
                href="/contacto"
                className="text-sm text-gray-600 hover:text-[#f7b34b] transition-colors duration-200"
              >
                Contacto
              </Link>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-8 animate-slide-up">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Volver atrás
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
