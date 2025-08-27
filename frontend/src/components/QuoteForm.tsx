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
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <CheckCircleIcon className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 mb-3 sm:mb-4">
              ¡Solicitud Enviada!
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
              Hemos recibido tu solicitud de cotización. Nuestro equipo se pondrá en contacto 
              contigo en las próximas 24 horas con una propuesta personalizada.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="btn-primary text-sm sm:text-base px-6 py-3"
            >
              Enviar Otra Cotización
            </button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <section className="section-padding bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
              Solicita tu <span className="gradient-text">Cotización Personalizada</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Completa el formulario y nuestro equipo te enviará una propuesta adaptada a tus necesidades específicas en menos de 24 horas.
            </p>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12"
          >
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              {/* Personal Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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

              {/* Company */}
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

              {/* Product Interest */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="productInterest" className="form-label">Producto de Interés *</label>
                  <input
                    type="text"
                    id="productInterest"
                    name="productInterest"
                    value={formData.productInterest}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                    placeholder="Ej: Motor industrial, válvula, etc."
                  />
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

              {/* Requirements */}
              <div>
                <label htmlFor="requirements" className="form-label">Requerimientos Específicos</label>
                <textarea
                  id="requirements"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  rows={4}
                  className="input-field resize-none"
                  placeholder="Describe tus necesidades específicas, especificaciones técnicas, etc."
                />
              </div>

              {/* Timeline */}
              <div>
                <label htmlFor="timeline" className="form-label">Timeline de Entrega</label>
                <select
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="urgent">Urgente (1-2 semanas)</option>
                  <option value="normal">Normal (3-4 semanas)</option>
                  <option value="flexible">Flexible (1-2 meses)</option>
                  <option value="custom">Personalizado</option>
                </select>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 rounded-lg p-4"
                >
                  <div className="flex items-center space-x-3">
                    <XMarkIcon className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                </motion.div>
              )}

              {/* Submit Button */}
              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary text-base sm:text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Enviando...' : 'Solicitar Cotización'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
