'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'

interface FormData {
  firstName: string
  lastName: string
  email: string
  company: string
  phone: string
  productInterest: string
  quantity: string
  requirements: string
  timeline: string
}

export function QuoteForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    productInterest: '',
    quantity: '',
    requirements: '',
    timeline: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/hubspot-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.error || 'Error al enviar a HubSpot')
      }

      setIsSubmitted(true)
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        phone: '',
        productInterest: '',
        quantity: '',
        requirements: '',
        timeline: ''
      })
    } catch (err:any) {
      setError(err?.message || 'Hubo un error al enviar tu solicitud. Por favor, inténtalo de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="section-padding bg-green-50"
      >
        <div className="container-custom text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircleIcon className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
              ¡Solicitud Enviada!
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Hemos recibido tu solicitud de cotización. Nuestro equipo se pondrá en contacto 
              contigo en las próximas 24 horas con una propuesta personalizada.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="btn-primary"
            >
              Enviar Otra Cotización
            </button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <section className="section-padding bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-display font-bold text-gray-900">
              Solicita tu <span className="gradient-text">Cotización</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Completa el formulario y nuestro equipo de expertos te enviará una cotización 
              personalizada en menos de 24 horas.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                  <CheckCircleIcon className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700">Cotización personalizada en 24h</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                  <CheckCircleIcon className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700">Asesoramiento técnico especializado</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                  <CheckCircleIcon className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700">Soporte post-venta completo</span>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="form-label">Nombre *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="form-label">Apellido *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                    placeholder="Tu apellido"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="form-label">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                    placeholder="tu@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="form-label">Teléfono</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="+34 600 000 000"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="form-label">Empresa</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="Nombre de tu empresa"
                />
              </div>

              {/* Product Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="productInterest" className="form-label">Producto de Interés *</label>
                  <select
                    id="productInterest"
                    name="productInterest"
                    value={formData.productInterest}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                  >
                    <option value="">Selecciona un producto</option>
                    <option value="compresores">Compresores</option>
                    <option value="bombas">Bombas</option>
                    <option value="valvulas">Válvulas</option>
                    <option value="motores">Motores</option>
                    <option value="otros">Otros</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="quantity" className="form-label">Cantidad</label>
                  <input
                    type="text"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Ej: 5 unidades"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="timeline" className="form-label">Timeline de Entrega</label>
                <select
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="">Selecciona timeline</option>
                  <option value="urgente">Urgente (1-2 semanas)</option>
                  <option value="normal">Normal (1-2 meses)</option>
                  <option value="flexible">Flexible (3+ meses)</option>
                </select>
              </div>

              <div>
                <label htmlFor="requirements" className="form-label">Requerimientos Específicos</label>
                <textarea
                  id="requirements"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  rows={4}
                  className="input-field"
                  placeholder="Describe tus necesidades específicas, especificaciones técnicas, o cualquier otro detalle importante..."
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <XMarkIcon className="w-5 h-5 text-red-600" />
                    <span className="text-red-800">{error}</span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando...' : 'Solicitar Cotización'}
              </button>

              <p className="text-sm text-gray-500 text-center">
                Al enviar este formulario, aceptas que nos pongamos en contacto contigo 
                para procesar tu solicitud de cotización.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
