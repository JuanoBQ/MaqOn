'use client';

import Link from 'next/link'
import { motion } from 'framer-motion'

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
    <footer className="bg-gray-900 text-white">
      <div className="container-custom section-padding">
        <div className="grid lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="text-2xl font-display font-bold">MaqOn</span>
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              MaqOn es tu proveedor confiable de productos industriales de alta calidad. 
              Ofrecemos cotizaciones personalizadas y soporte técnico especializado para 
              satisfacer todas tus necesidades industriales.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors duration-200"
                  aria-label={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Productos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Productos</h3>
            <ul className="space-y-2">
              {footerLinks.productos.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2">
              {footerLinks.servicios.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Empresa</h3>
            <ul className="space-y-2">
              {footerLinks.empresa.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white">📍</span>
              </div>
              <div>
                <h4 className="font-semibold">Ubicación</h4>
                <p className="text-gray-300 text-sm">Calle Industrial 123, Zona Industrial, Madrid</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white">📞</span>
              </div>
              <div>
                <h4 className="font-semibold">Teléfono</h4>
                <p className="text-gray-300 text-sm">+34 91 123 45 67</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white">✉️</span>
              </div>
              <div>
                <h4 className="font-semibold">Email</h4>
                <p className="text-gray-300 text-sm">info@maqon.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 MaqOn. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacidad" className="text-gray-400 hover:text-white transition-colors duration-200">
                Política de Privacidad
              </Link>
              <Link href="/terminos" className="text-gray-400 hover:text-white transition-colors duration-200">
                Términos de Servicio
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors duration-200">
                Política de Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
