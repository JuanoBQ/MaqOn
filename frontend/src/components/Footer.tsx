'use client';

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Logo } from '@/components/ui/Logo'

const footerLinks = {
  productos: [
    { name: 'Construcción', href: '/productos/construccion' },
    { name: 'Agro', href: '/productos/agro' },
    { name: 'Manufactura', href: '/productos/manofactura' },
    { name: 'Elevación', href: '/productos/elevacion' },
    { name: 'Repuestos', href: '/productos/repuestos' },
    { name: 'Otros', href: '/productos/otros' },
  ],
  servicios: [
    { name: 'Cotizaciones', href: '/cotizacion' },
    { name: 'Servicios', href: '/servicios' },
    { name: 'Asesoría Técnica', href: '/servicios' },
    { name: 'Soporte', href: '/contacto' },
  ],
  empresa: [
    { name: 'Nosotros', href: '/nosotros' },
    { name: 'Blog', href: '/blog' },
    { name: 'Equipo', href: '/nosotros' },
    { name: 'Contacto', href: '/contacto' },
  ],
  contacto: [
    { name: 'Contacto', href: '/contacto' },
    { name: 'Cotización', href: '/cotizacion' },
    { name: 'Ubicación', href: '/contacto#ubicacion' },
    { name: 'Horarios', href: '/contacto#horarios' },
  ]
}

const socialLinks = [
  { 
    name: 'LinkedIn', 
    href: '#', 
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
      </svg>
    ),
    comingSoon: true 
  },
  { 
    name: 'Facebook', 
    href: '#', 
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
      </svg>
    ),
    comingSoon: true 
  },
  { 
    name: 'Instagram', 
    href: '#', 
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    comingSoon: true 
  }
]

export function Footer() {
  return (
    <footer className="bg-[#030303] text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="mb-4 sm:mb-6">
              <Logo size="lg" showText={true} />
            </div>
            <p className="text-sm sm:text-base text-secondary-300 mb-4 sm:mb-6 leading-relaxed">
              MaqOn es tu proveedor confiable de productos industriales de alta calidad. 
              Ofrecemos cotizaciones personalizadas y soporte técnico especializado para 
              satisfacer todas tus necesidades industriales.
            </p>
            
            {/* Social Links */}
            <div className="flex flex-col space-y-2">
              <div className="flex space-x-3 sm:space-x-4">
                {socialLinks.map((social) => (
                  <motion.div
                    key={social.name}
                    whileHover={{ scale: 1.05 }}
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-secondary-800 rounded-lg flex items-center justify-center transition-colors duration-200 relative group"
                    title={`${social.name} - Próximamente`}
                  >
                    <div className="opacity-60">{social.icon}</div>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                      Próximamente
                    </div>
                  </motion.div>
                ))}
              </div>
              <p className="text-xs text-secondary-500">Redes sociales próximamente</p>
            </div>
          </div>

          {/* Productos */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Productos</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {footerLinks.productos.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm sm:text-base text-secondary-300 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Servicios</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {footerLinks.servicios.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm sm:text-base text-secondary-300 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Empresa</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {footerLinks.empresa.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm sm:text-base text-secondary-300 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Contacto</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {footerLinks.contacto.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm sm:text-base text-secondary-300 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-secondary-800 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <p className="text-sm sm:text-base text-secondary-400 text-center sm:text-left">
              © 2024 MaqOn. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 sm:space-x-8">
              <Link href="/privacidad" className="text-sm sm:text-base text-secondary-400 hover:text-white transition-colors duration-200">
                Política de Privacidad
              </Link>
              <Link href="/terminos" className="text-sm sm:text-base text-secondary-400 hover:text-white transition-colors duration-200">
                Términos de Servicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
