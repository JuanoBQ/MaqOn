const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiItem<T> {
  id: number;
  documentId: string;
  nombre: string;
  descripcion?: string;
  categoria?: string;
  caracteristicas?: Record<string, any>;
  precio?: number;
  imagen?: {
    id: number;
    documentId: string;
    name: string;
    url?: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: any;
    hash?: string;
    ext?: string;
    mime?: string;
    size?: number;
    previewUrl?: string;
    provider?: string;
    provider_metadata?: any;
    createdAt?: string;
    updatedAt?: string;
  };
  disponible?: boolean;
  createdAt: string;
  updatedAt: string;
}

export class StrapiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = STRAPI_URL;
  }

  async fetch<T>(endpoint: string): Promise<StrapiResponse<T>> {
    const response = await fetch(`${this.baseUrl}/api${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.statusText}`);
    }

    return response.json();
  }

  async getProductos() {
    return this.fetch<any>('/productos?populate=*');
  }

  async getTestimonios() {
    return this.fetch<any>('/testimonials?populate=*');
  }

  async getServicios() {
    return this.fetch<any>('/services?populate=*');
  }

  async getProducto(id: number) {
    const response = await fetch(`${this.baseUrl}/api/productos/${id}?populate=*`);
    if (!response.ok) {
      throw new Error(`Producto no encontrado: ${response.statusText}`);
    }
    return response.json();
  }
}

export const strapiClient = new StrapiClient();
