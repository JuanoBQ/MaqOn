import { NextRequest, NextResponse } from 'next/server'

// Interfaz para los datos de cotización
interface CotizacionData {
  producto: {
    id: number
    nombre: string
    categoria: string
    precio?: number
  }
  cliente: {
    nombre: string
    email: string
    telefono: string
    cantidad: number
    mensaje: string
  }
  fecha: string
  origen: string
}

// Función para enviar email de notificación (ejemplo con servicio de email)
async function sendEmailNotification(data: CotizacionData) {
  // Aquí puedes integrar con servicios como SendGrid, Nodemailer, etc.
  console.log('📧 Enviando notificación de cotización:', {
    cliente: data.cliente.nombre,
    producto: data.producto.nombre,
    email: data.cliente.email
  })
  
  // Ejemplo de integración con SendGrid (comentado)
  /*
  const sgMail = require('@sendgrid/mail')
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  
  const msg = {
    to: process.env.ADMIN_EMAIL,
    from: process.env.FROM_EMAIL,
    subject: `Nueva Cotización: ${data.producto.nombre}`,
    html: `
      <h2>Nueva Solicitud de Cotización</h2>
      <h3>Información del Cliente:</h3>
      <p><strong>Nombre:</strong> ${data.cliente.nombre}</p>
      <p><strong>Email:</strong> ${data.cliente.email}</p>
      <p><strong>Teléfono:</strong> ${data.cliente.telefono}</p>
      
      <h3>Información del Producto:</h3>
      <p><strong>Producto:</strong> ${data.producto.nombre}</p>
      <p><strong>Categoría:</strong> ${data.producto.categoria}</p>
      <p><strong>Cantidad:</strong> ${data.cliente.cantidad}</p>
      ${data.producto.precio ? `<p><strong>Precio de referencia:</strong> $${data.producto.precio}</p>` : ''}
      
      <h3>Mensaje:</h3>
      <p>${data.cliente.mensaje || 'Sin mensaje adicional'}</p>
      
      <p><strong>Fecha:</strong> ${new Date(data.fecha).toLocaleString('es-ES')}</p>
      <p><strong>Origen:</strong> ${data.origen}</p>
    `
  }
  
  await sgMail.send(msg)
  */
}

// Función para guardar en Strapi CRM
async function saveToStrapi(data: CotizacionData) {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
  const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN // Token de API de Strapi
  
  try {
    const cotizacionData = {
      data: {
        cliente_nombre: data.cliente.nombre,
        cliente_email: data.cliente.email,
        cliente_telefono: data.cliente.telefono,
        producto_id: data.producto.id,
        producto_nombre: data.producto.nombre,
        producto_categoria: data.producto.categoria,
        producto_precio: data.producto.precio,
        cantidad: data.cliente.cantidad,
        mensaje: data.cliente.mensaje,
        fecha_solicitud: data.fecha,
        origen: data.origen,
        estado: 'pendiente', // Estados: pendiente, procesando, enviada, cerrada
        prioridad: 'normal' // Prioridades: baja, normal, alta
      }
    }
    
    const response = await fetch(`${STRAPI_URL}/api/cotizaciones`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_TOKEN}`
      },
      body: JSON.stringify(cotizacionData)
    })
    
    if (!response.ok) {
      throw new Error(`Error saving to Strapi: ${response.statusText}`)
    }
    
    const result = await response.json()
    console.log('✅ Cotización guardada en Strapi:', result.data?.id)
    return result
    
  } catch (error) {
    console.error('❌ Error saving to Strapi:', error)
    throw error
  }
}

// Función para integrar con CRM externo (opcional)
async function saveToExternalCRM(data: CotizacionData) {
  // Ejemplo de integración con HubSpot, Salesforce, etc.
  console.log('🔗 Integrando con CRM externo:', data.cliente.email)
  
  // Ejemplo con HubSpot (comentado)
  /*
  const hubspotClient = require('@hubspot/api-client')
  const hubspot = new hubspotClient.Client({
    accessToken: process.env.HUBSPOT_ACCESS_TOKEN
  })
  
  const contactObj = {
    properties: {
      email: data.cliente.email,
      firstname: data.cliente.nombre.split(' ')[0],
      lastname: data.cliente.nombre.split(' ').slice(1).join(' '),
      phone: data.cliente.telefono,
      company: 'Prospecto Web',
      lifecyclestage: 'lead'
    }
  }
  
  await hubspot.crm.contacts.basicApi.create(contactObj)
  */
}

export async function POST(request: NextRequest) {
  try {
    const data: CotizacionData = await request.json()
    
    // Validar datos requeridos
    if (!data.cliente.nombre || !data.cliente.email || !data.cliente.telefono) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.cliente.email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      )
    }
    
    console.log('📝 Procesando nueva cotización:', {
      cliente: data.cliente.nombre,
      producto: data.producto.nombre,
      fecha: new Date(data.fecha).toLocaleString('es-ES')
    })
    
    // Procesar la cotización en paralelo
    const promises = [
      sendEmailNotification(data),
      saveToStrapi(data),
      // saveToExternalCRM(data) // Descomenta si usas CRM externo
    ]
    
    await Promise.allSettled(promises)
    
    // Respuesta exitosa
    return NextResponse.json({
      success: true,
      message: 'Cotización procesada exitosamente',
      data: {
        id: Date.now(), // ID temporal
        cliente: data.cliente.nombre,
        producto: data.producto.nombre,
        fecha: data.fecha
      }
    })
    
  } catch (error) {
    console.error('❌ Error procesando cotización:', error)
    
    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        message: 'No se pudo procesar la cotización. Por favor, intenta de nuevo.'
      },
      { status: 500 }
    )
  }
}

// Método GET para obtener cotizaciones (opcional, para panel admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit') || '10'
    const page = searchParams.get('page') || '1'
    
    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
    const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN
    
    const response = await fetch(
      `${STRAPI_URL}/api/cotizaciones?pagination[page]=${page}&pagination[pageSize]=${limit}&sort=fecha_solicitud:desc`,
      {
        headers: {
          'Authorization': `Bearer ${STRAPI_TOKEN}`
        }
      }
    )
    
    if (!response.ok) {
      throw new Error(`Error fetching from Strapi: ${response.statusText}`)
    }
    
    const data = await response.json()
    return NextResponse.json(data)
    
  } catch (error) {
    console.error('❌ Error obteniendo cotizaciones:', error)
    return NextResponse.json(
      { error: 'Error obteniendo cotizaciones' },
      { status: 500 }
    )
  }
}
