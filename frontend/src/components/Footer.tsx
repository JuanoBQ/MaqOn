'use client';

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Logo } from '@/components/ui/Logo'

const footerLinks = {
  productos: [
    { name: 'Compresores', href: '/productos/compresores' },
    { name: 'Bombas', href: '/productos/bombas' },
    { name: 'Válvulas', href: '/productos/valvulas' },
    { name: 'Motores', href: '/productos/motores' },
  ],
  servicios: [
    { name: 'Cotizaciones', href: '/servicios/cotizaciones' },
    { name: 'Asesoría Técnica', href: '/servicios/asesoria' },
    { name: 'Instalación', href: '/servicios/instalacion' },
    { name: 'Mantenimiento', href: '/servicios/mantenimiento' },
  ],
  empresa: [
    { name: 'Nosotros', href: '/nosotros' },
    { name: 'Blog', href: '/blog' },
    { name: 'Historia', href: '/nosotros/historia' },
    { name: 'Equipo', href: '/nosotros/equipo' },
    { name: 'Certificaciones', href: '/nosotros/certificaciones' },
  ],
  contacto: [
    { name: 'Contacto', href: '/contacto' },
    { name: 'Soporte', href: '/soporte' },
    { name: 'Ubicación', href: '/contacto#ubicacion' },
    { name: 'Horarios', href: '/contacto#horarios' },
  ]
}

const socialLinks = [
  { name: 'LinkedIn', href: '#', icon: '💼' },
  { name: 'Twitter', href: '#', icon: '🐦' },
  { name: 'Facebook', href: '#', icon: '📘' },
  { name: 'Instagram', href: '#', icon: '📷' },
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
            <div className="flex space-x-3 sm:space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-secondary-800 hover:bg-primary-500 rounded-lg flex items-center justify-center transition-colors duration-200"
                  aria-label={social.name}
                >
                  <span className="text-base sm:text-lg">{social.icon}</span>
                </motion.a>
              ))}
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
