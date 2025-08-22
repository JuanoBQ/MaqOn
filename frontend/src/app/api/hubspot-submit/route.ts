import { NextRequest, NextResponse } from 'next/server';

const HUBSPOT_PORTAL_ID = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;
const HUBSPOT_FORM_ID = process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID;

export async function POST(request: NextRequest) {
  try {
    if (!HUBSPOT_PORTAL_ID || !HUBSPOT_FORM_ID) {
      return NextResponse.json(
        { error: 'Faltan variables de entorno de HubSpot' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      company,
      phone,
      productInterest,
      quantity,
      requirements,
      timeline,
    } = body;

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: 'Campos requeridos faltantes' },
        { status: 400 }
      );
    }

    // Contexto de HubSpot
    const hubspotutk = request.cookies.get('hubspotutk')?.value;
    const pageUri = request.headers.get('referer') || 'https://maqon.com/cotizacion';
    const pageName = 'Solicitud de Cotización - MaqOn';

    // Payload Forms API v3
    const payload = {
      fields: [
        { name: 'firstname', value: String(firstName) },
        { name: 'lastname', value: String(lastName) },
        { name: 'email', value: String(email) },
        { name: 'company', value: String(company || '') },
        { name: 'phone', value: String(phone || '') },
        { name: 'product_interest', value: String(productInterest || '') },
        { name: 'quantity', value: String(quantity || '') },
        { name: 'requirements', value: String(requirements || '') },
        { name: 'timeline', value: String(timeline || '') },
      ],
      context: {
        hutk: hubspotutk,
        pageUri,
        pageName,
      },
    } as const;

    const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`;

    const hsRes = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const hsJson = await hsRes.json().catch(() => ({}));

    if (!hsRes.ok) {
      return NextResponse.json(
        { error: 'Error al enviar a HubSpot', details: hsJson },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, hubspot: hsJson });
  } catch (error) {
    console.error('Error en API HubSpot:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
