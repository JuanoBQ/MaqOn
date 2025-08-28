export interface ProductImage {
  id?: number
  documentId?: string
  name?: string
  url: string
  alternativeText?: string
  caption?: string
  width?: number
  height?: number
  formats?: any
  hash?: string
  ext?: string
  mime?: string
  size?: number
  previewUrl?: string
  provider?: string
  provider_metadata?: any
  createdAt?: string
  updatedAt?: string
}

export interface Product {
  id: number
  documentId: string
  nombre: string
  descripcion: string
  categoria: string
  caracteristicas: Record<string, any>
  precio: number
  disponible: boolean
  createdAt: string
  updatedAt: string
  // Cambio principal: imagenes es ahora un array
  imagenes?: ProductImage[]
  // Mantener imagen como deprecated para compatibilidad
  /** @deprecated Use imagenes instead */
  imagen?: string | ProductImage
}

export interface ProductsResponse {
  data: Product[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface ProductResponse {
  data: Product
  meta: {}
}
