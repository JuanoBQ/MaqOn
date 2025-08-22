import { NextRequest, NextResponse } from 'next/server';

const HUBSPOT_PORTAL_ID = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;
const HUBSPOT_FORM_ID = process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, company, phone, productInterest, quantity, requirements, timeline } = body;

    // Validar campos requeridos
    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: 'Campos requeridos faltantes' },
        { status: 400 }
      );
    }

    // Preparar datos para HubSpot
    const hubspotData = {
      fields: [
        { name: 'firstname', value: firstName },
        { name: 'lastname', value: lastName },
        { name: 'email', value: email },
        { name: 'company', value: company || '' },
        { name: 'phone', value: phone || '' },
        { name: 'product_interest', value: productInterest || '' },
        { name: 'quantity', value: quantity || '' },
        { name: 'requirements', value: requirements || '' },
        { name: 'timeline', value: timeline || '' }
      ],
      context: {
        pageUri: 'https://maqon.com/cotizacion',
        pageName: 'Solicitud de Cotización - MaqOn'
      }
    };

    // Enviar a HubSpot (simulado por ahora)
    // En producción, usar la API real de HubSpot
    console.log('Datos para HubSpot:', hubspotData);

    // Simular respuesta exitosa
    return NextResponse.json({
      success: true,
      message: 'Formulario enviado correctamente',
      data: hubspotData
    });

  } catch (error) {
    console.error('Error en API HubSpot:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
