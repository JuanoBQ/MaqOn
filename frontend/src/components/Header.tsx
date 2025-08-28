'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Bars3Icon, XMarkIcon, ChevronDownIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { Logo } from '@/components/ui/Logo'

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Servicios', href: '/servicios' },
  { name: 'Nosotros', href: '/nosotros' },
  { name: 'Contacto', href: '/contacto' },
]

import { productCategories } from '@/config/productCategories'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false)
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (dropdownTimeout) {
        clearTimeout(dropdownTimeout)
      }
    }
  }, [dropdownTimeout])

  // Funciones para manejar el dropdown de productos
  const handleDropdownMouseEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout)
      setDropdownTimeout(null)
    }
    setProductsDropdownOpen(true)
  }

  const handleDropdownMouseLeave = () => {
    const timeout = setTimeout(() => {
      setProductsDropdownOpen(false)
    }, 300) // 300ms de delay para permitir navegación
    setDropdownTimeout(timeout)
  }

  const handleDropdownItemMouseEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout)
      setDropdownTimeout(null)
    }
    setProductsDropdownOpen(true)
  }



  return (
    <header className={`bg-[#030303] sticky top-0 z-50 border-b border-secondary-800 transition-all duration-300 ${
      scrolled ? 'shadow-lg bg-[#030303]/98' : ''
    }`}>
      <nav className="container-custom section-padding py-3 sm:py-4">
        <div className="flex items-center justify-between">
                     {/* Logo */}
           <Logo size="lg" showText={true} clickable={true} />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white hover:text-[#f7b34b] font-medium transition-colors duration-200 text-sm relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#f7b34b] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            
                         {/* Productos Dropdown - Entre Inicio y Servicios */}
             <div 
               className={`relative products-dropdown ${productsDropdownOpen ? 'z-50' : ''}`}
               onMouseEnter={handleDropdownMouseEnter}
               onMouseLeave={handleDropdownMouseLeave}
             >
               <Link
                 href="/productos"
                 className={`text-white font-medium transition-colors duration-200 text-sm flex items-center space-x-1 relative ${
                   productsDropdownOpen ? 'text-[#f7b34b]' : 'hover:text-[#f7b34b]'
                 }`}
               >
                 <span>Productos</span>
                 <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${
                   productsDropdownOpen ? 'rotate-180' : ''
                 }`} />
                 {/* Indicador visual sutil */}
                 <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#f7b34b] transition-all duration-300 ${
                   productsDropdownOpen ? 'w-full' : 'w-0'
                 }`}></span>
               </Link>
               
                               {/* Dropdown Menu - Se activa con estado controlado */}
                <div 
                  className={`absolute top-full left-0 mt-3 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 transition-all duration-200 ease-out transform ${
                    productsDropdownOpen 
                      ? 'opacity-100 visible translate-y-0 pointer-events-auto' 
                      : 'opacity-0 invisible translate-y-1 pointer-events-none'
                  }`}
                  onMouseEnter={handleDropdownItemMouseEnter}
                  onMouseLeave={handleDropdownMouseLeave}
                >
                                   {/* Arrow del dropdown */}
                  <div className={`absolute -top-2 left-6 w-4 h-4 bg-white border-l border-t border-gray-200 transform rotate-45 transition-all duration-200 ${
                    productsDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                  }`}></div>
                 {productCategories.map((category, index) => (
                   <div key={category.id}>
                     <Link
                       href={category.href}
                       className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-[#f7b34b] hover:bg-gray-50 transition-all duration-200 group"
                       style={{
                         animationDelay: `${index * 50}ms`
                       }}
                     >

                       <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                         {category.name}
                       </span>
                     </Link>
                     {index < productCategories.length - 1 && (
                       <div className="mx-4 border-t border-gray-100"></div>
                     )}
                   </div>
                 ))}
                 
                 {/* Footer del Dropdown */}
                 <div className="border-t border-gray-200 mt-2 pt-2">
                   <Link
                     href="/productos"
                     className="flex items-center justify-center space-x-2 px-4 py-3 text-[#f7b34b] hover:text-[#e6a02e] hover:bg-[#f7b34b]/5 transition-all duration-200 group font-medium"
                   >
                     <span>Ver Todas las Categorías</span>
                     <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                   </Link>
                 </div>
               </div>
             </div>
          </div>

                    {/* CTA Button */}
          <div className="hidden lg:block">
            <Link href="/cotizacion" className="bg-[#f7b34b] hover:bg-[#e6a02e] text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 text-sm">
              Solicitar Cotización
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              type="button"
                             className="text-white hover:text-[#f7b34b] p-2 rounded-lg hover:bg-secondary-800 transition-colors duration-200"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Abrir menú de navegación"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-50"
          >
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm" 
              onClick={() => setMobileMenuOpen(false)} 
            />
            
                        {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-[#030303]">
                <div onClick={() => setMobileMenuOpen(false)}>
                  <Logo size="md" clickable={true} />
                </div>
               <button
                 type="button"
                 className="text-white hover:text-[#f7b34b] p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                 onClick={() => setMobileMenuOpen(false)}
                 aria-label="Cerrar menú de navegación"
               >
                 <XMarkIcon className="h-6 w-6" />
               </button>
             </div>
              
              {/* Navigation Items */}
              <div className="p-4 sm:p-6 space-y-2 bg-gray-50 flex-1">
                {/* Welcome Message */}
                <div className="mb-6 pb-4 border-b border-gray-200">
                  <h3 className="text-gray-800 font-semibold text-lg">Navegación</h3>
                  <p className="text-gray-600 text-sm mt-1">Explora nuestros productos y servicios</p>
                </div>


                
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block text-gray-800 hover:text-[#f7b34b] font-medium py-3 px-4 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200 text-base"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {/* Productos en Móvil */}
                <div className="border-t border-gray-200 my-4 pt-4">
                  <div className="text-gray-600 font-medium px-4 mb-3 text-sm uppercase tracking-wide">
                    Productos
                  </div>
                  <div className="space-y-1">
                    {productCategories.map((category) => (
                      <Link
                        key={category.id}
                        href={category.href}
                        className="flex items-center space-x-3 py-2 px-4 text-gray-700 hover:text-[#f7b34b] hover:bg-white hover:shadow-sm rounded-lg transition-all duration-200 text-sm"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="text-base">{category.icon}</span>
                        <span>{category.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* Divider */}
                <div className="border-t border-gray-200 my-4"></div>
                
                                {/* CTA Button */}
                <div className="pt-2 px-2">
                  <Link
                    href="/cotizacion"
                    className="bg-[#f7b34b] hover:bg-[#e6a02e] text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 text-base w-full text-center block shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Solicitar Cotización
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
