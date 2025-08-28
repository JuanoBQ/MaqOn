import { BlogPost } from '@/types/blog'
import { Product, ProductImage } from '@/types/product'

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
  // Nuevo campo para múltiples imágenes
  imagenes?: {
    data?: Array<{
      id: number;
      documentId: string;
      attributes: ProductImage;
    }>;
  };
  // Mantener imagen para compatibilidad
  /** @deprecated Use imagenes instead */
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

  async getProductos(categoria?: string) {
    const endpoint = categoria 
      ? `/productos?filters[categoria][$eq]=${categoria}&populate=*`
      : '/productos?populate=*';
    return this.fetch<any>(endpoint);
  }

  async getAllProductos() {
    try {
      console.log('🔍 Obteniendo todos los productos desde Strapi...');
      
      const response = await fetch(`${this.baseUrl}/api/productos?populate=*`);
      
      console.log('📡 Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Error response:', errorText);
        throw new Error(`Error al obtener productos: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('📊 Todos los productos recibidos:', data);
      
      if (data.data && Array.isArray(data.data)) {
        console.log('📋 Productos encontrados:');
        data.data.forEach((item: any, index: number) => {
          console.log(`${index + 1}. ID: ${item.id}, Nombre: "${item.nombre}", Categoría: "${item.categoria}"`);
        });
        
        return data.data.map((item: any) => this.processProduct(item));
      }
      
      return [];
    } catch (error) {
      console.error('❌ Error fetching all productos:', error);
      return [];
    }
  }

  async getProductosByCategory(categoria: string) {
    try {
      console.log('🔍 Obteniendo productos para categoría:', categoria);
      
      // Normalizar la categoría para hacer el matching más flexible
      const normalizedCategory = categoria.toLowerCase().trim();
      
      // Intentar diferentes variaciones de la categoría
      const categoryVariations = [
        categoria, // Original
        normalizedCategory, // Minúscula
        categoria.charAt(0).toUpperCase() + categoria.slice(1).toLowerCase(), // Primera letra mayúscula
        categoria.toUpperCase(), // Mayúscula
        // Mapeos específicos para las categorías de Strapi
        ...(normalizedCategory === 'construccion' ? ['Construccion', 'Construcción'] : []),
        ...(normalizedCategory === 'agro' ? ['Agro', 'Agricultura'] : []),
        ...(normalizedCategory === 'manofactura' ? ['Manofactura', 'Manufactura'] : []),
        ...(normalizedCategory === 'elevacion' ? ['Elevacion', 'Elevación'] : []),
        ...(normalizedCategory === 'repuestos' ? ['Repuestos'] : []),
        ...(normalizedCategory === 'otros' ? ['Otros'] : [])
      ];
      
      console.log('🔄 Variaciones de categoría a probar:', categoryVariations);
      
      // Probar cada variación hasta encontrar productos
      for (const categoryVar of categoryVariations) {
        try {
          console.log(`🔍 Probando categoría: "${categoryVar}"`);
          
          const response = await fetch(
            `${this.baseUrl}/api/productos?filters[categoria][$eq]=${encodeURIComponent(categoryVar)}&populate=*`
          );
          
          console.log('📡 Response status:', response.status);
          
          if (!response.ok) {
            console.warn(`⚠️ Error con categoría "${categoryVar}":`, response.statusText);
            continue;
          }

          const data = await response.json();
          console.log(`📊 Productos encontrados para "${categoryVar}":`, data.data?.length || 0);
          
          // Si encontramos productos, procesarlos
          if (data.data && Array.isArray(data.data) && data.data.length > 0) {
            console.log('✅ Productos encontrados, procesando...');
            
            return data.data.map((item: any) => {
              const processed = this.processProduct(item);
              processed.categoria = this.normalizeCategory(item.categoria || 'general');
              return processed;
            });
          }
        } catch (categoryError) {
          console.warn(`⚠️ Error con categoría "${categoryVar}":`, categoryError);
          continue;
        }
      }
      
      console.log('❌ No se encontraron productos para ninguna variación de la categoría');
      return [];
    } catch (error) {
      console.error('❌ Error fetching productos:', error);
      return [];
    }
  }

  // Método auxiliar para normalizar categorías
  private normalizeCategory(categoria: string): string {
    const categoryMap: Record<string, string> = {
      // Construcción
      'construccion': 'construccion',
      'Construccion': 'construccion',
      'Construcción': 'construccion',
      
      // Agro
      'agro': 'agro',
      'Agro': 'agro',
      'Agricultura': 'agro',
      
      // Manufactura (maneja la variación "Manofactura")
      'manufactura': 'manofactura',
      'Manufactura': 'manofactura',
      'manofactura': 'manofactura',
      'Manofactura': 'manofactura',
      
      // Elevación
      'elevacion': 'elevacion',
      'Elevacion': 'elevacion',
      'Elevación': 'elevacion',
      
      // Repuestos
      'repuestos': 'repuestos',
      'Repuestos': 'repuestos',
      
      // Otros
      'otros': 'otros',
      'Otros': 'otros'
    };
    
    return categoryMap[categoria] || categoria.toLowerCase();
  }

  // Método auxiliar para procesar múltiples imágenes
  private processMultipleImages(imagenes: any, fallbackAlt: string): ProductImage[] | undefined {
    if (!imagenes) return undefined;

    // Estructura: imagenes.data (array)
    if (imagenes.data && Array.isArray(imagenes.data)) {
      return imagenes.data.map((imgData: any) => {
        const img = imgData.attributes || imgData;
        return {
          id: imgData.id,
          documentId: imgData.documentId,
          name: img.name,
          url: img.url?.startsWith('http') ? img.url : `${this.baseUrl}${img.url}`,
          alternativeText: img.alternativeText || fallbackAlt,
          caption: img.caption,
          width: img.width,
          height: img.height,
          formats: img.formats,
          hash: img.hash,
          ext: img.ext,
          mime: img.mime,
          size: img.size,
          previewUrl: img.previewUrl,
          provider: img.provider,
          provider_metadata: img.provider_metadata,
          createdAt: img.createdAt,
          updatedAt: img.updatedAt
        };
      });
    }

    // Estructura: array directo
    if (Array.isArray(imagenes)) {
      return imagenes.map((img: any, index: number) => ({
        id: img.id || index,
        documentId: img.documentId,
        name: img.name,
        url: img.url?.startsWith('http') ? img.url : `${this.baseUrl}${img.url}`,
        alternativeText: img.alternativeText || fallbackAlt,
        caption: img.caption,
        width: img.width,
        height: img.height,
        formats: img.formats,
        hash: img.hash,
        ext: img.ext,
        mime: img.mime,
        size: img.size,
        previewUrl: img.previewUrl,
        provider: img.provider,
        provider_metadata: img.provider_metadata,
        createdAt: img.createdAt,
        updatedAt: img.updatedAt
      }));
    }

    return undefined;
  }

  // Método público para procesar un producto completo
  public processProduct(item: any): any {
    return {
      id: item.id,
      documentId: item.documentId,
      nombre: item.nombre || 'Sin nombre',
      descripcion: item.descripcion || 'Sin descripción',
      categoria: item.categoria || 'general',
      caracteristicas: item.caracteristicas || {},
      precio: item.precio || 0,
      disponible: item.disponible !== undefined ? item.disponible : true,
      imagenes: this.processMultipleImages(item.imagenes, item.nombre),
      // Mantener imagen para compatibilidad hacia atrás
      imagen: this.processMultipleImages(item.imagenes, item.nombre)?.[0] || this.processSingleImage(item.imagen, item.nombre),
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    };
  }

  // Método auxiliar para procesar una sola imagen (compatibilidad)
  private processSingleImage(imagen: any, fallbackAlt: string): ProductImage | undefined {
    if (!imagen) return undefined;
    
    // Estructura: imagen.data.attributes
    if (imagen.data?.attributes?.url) {
      return {
        id: imagen.data.id,
        documentId: imagen.data.documentId,
        name: imagen.data.attributes.name,
        url: `${this.baseUrl}${imagen.data.attributes.url}`,
        alternativeText: imagen.data.attributes.alternativeText || fallbackAlt,
        caption: imagen.data.attributes.caption,
        width: imagen.data.attributes.width,
        height: imagen.data.attributes.height,
        formats: imagen.data.attributes.formats,
        hash: imagen.data.attributes.hash,
        ext: imagen.data.attributes.ext,
        mime: imagen.data.attributes.mime,
        size: imagen.data.attributes.size,
        previewUrl: imagen.data.attributes.previewUrl,
        provider: imagen.data.attributes.provider,
        provider_metadata: imagen.data.attributes.provider_metadata,
        createdAt: imagen.data.attributes.createdAt,
        updatedAt: imagen.data.attributes.updatedAt
      };
    }
    
    // Estructura: imagen.url (directa)
    if (imagen.url) {
      return {
        id: imagen.id,
        documentId: imagen.documentId,
        name: imagen.name,
        url: imagen.url.startsWith('http') ? imagen.url : `${this.baseUrl}${imagen.url}`,
        alternativeText: imagen.alternativeText || fallbackAlt,
        caption: imagen.caption,
        width: imagen.width,
        height: imagen.height,
        formats: imagen.formats,
        hash: imagen.hash,
        ext: imagen.ext,
        mime: imagen.mime,
        size: imagen.size,
        previewUrl: imagen.previewUrl,
        provider: imagen.provider,
        provider_metadata: imagen.provider_metadata,
        createdAt: imagen.createdAt,
        updatedAt: imagen.updatedAt
      };
    }
    
    // Estructura: imagen como string
    if (typeof imagen === 'string') {
      return {
        url: imagen.startsWith('http') ? imagen : `${this.baseUrl}${imagen}`,
        alternativeText: fallbackAlt
      };
    }
    
    return undefined;
  }

  async getTestimonios() {
    return this.fetch<any>('/testimonials?populate=*');
  }

  async getServicios() {
    return this.fetch<any>('/services?populate=*');
  }

  async getProducto(id: number) {
    try {
      console.log('🔍 Obteniendo producto con ID:', id);
      console.log('📡 URL:', `${this.baseUrl}/api/productos/${id}?populate=*`);
      
      const response = await fetch(`${this.baseUrl}/api/productos/${id}?populate=*`);
      
      console.log('📡 Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Error response:', errorText);
        throw new Error(`Producto no encontrado: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('📊 Producto recibido raw:', data);
      
      // Procesar el producto usando las mismas funciones que los otros métodos
      if (data.data) {
        const processedProduct = this.processProduct(data.data);
        
        console.log('📊 Producto procesado:', processedProduct);
        console.log('🖼️ Imagenes procesadas:', processedProduct.imagenes);
        console.log('🖼️ Imagen principal procesada:', processedProduct.imagen);
        
        return { data: processedProduct };
      }
      
      return data;
    } catch (error) {
      console.error('❌ Error fetching producto:', error);
      throw error;
    }
  }

  async getBlogPosts(page: number = 1, pageSize: number = 10): Promise<BlogPost[]> {
    try {
      // Primero probamos una query simple para ver qué devuelve Strapi
      console.log('🔍 Probando API de Strapi...');
      
      // Query simple sin filtros complejos
      const response = await fetch(
        `${this.baseUrl}/api/blog-posts?populate=*`
      );
      
      console.log('📡 Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Error response:', errorText);
        throw new Error(`Error al obtener posts del blog: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('📊 Data recibida:', data);
      
      // Transformar la respuesta de Strapi al formato que esperamos
      if (data.data && Array.isArray(data.data)) {
        console.log('🖼️ Estructura de imagen del primer post:', data.data[0]?.featuredImage);
        
        return data.data.map((item: any) => ({
          id: item.id,
          title: item.Title || item.title || 'Sin título',
          slug: item.slug || `post-${item.id}`,
          excerpt: item.excerpt || 'Sin descripción',
          content: item.content || 'Sin contenido',
          featuredImage: item.featuredImage?.data ? {
            url: `${this.baseUrl}${item.featuredImage.data.attributes.url}`,
            alternativeText: item.featuredImage.data.attributes.alternativeText
          } : undefined,
          category: item.category?.data ? {
            id: item.category.data.id,
            name: item.category.data.attributes.name,
            slug: item.category.data.attributes.slug,
            description: item.category.data.attributes.description,
            color: item.category.data.attributes.color,
            icon: item.category.data.attributes.icon
          } : undefined,
          tags: item.tags?.data ? item.tags.data.map((tag: any) => ({
            id: tag.id,
            name: tag.attributes.name,
            slug: tag.attributes.slug,
            description: tag.attributes.description
          })) : [],
          author: item.author?.data ? {
            id: item.author.data.id,
            username: item.author.data.attributes.username,
            email: item.author.data.attributes.email
          } : undefined,
          publishedAt: item.publishedAt || new Date().toISOString(),
          status: item.status || 'published',
          readingTime: item.readingTime || 5,
          featured: item.featured || false,
          seo: item.seo ? {
            metaTitle: item.seo.metaTitle,
            metaDescription: item.seo.metaDescription,
            keywords: item.seo.keywords,
            ogTitle: item.seo.ogTitle,
            ogDescription: item.seo.ogDescription,
            ogImage: item.seo.ogImage?.data ? {
              url: item.seo.ogImage.data.attributes.url,
              alternativeText: item.seo.ogImage.data.attributes.alternativeText
            } : undefined,
            twitterCardType: item.seo.twitterCardType
          } : undefined
        }));
      }
      
      return [];
    } catch (error) {
      console.error('❌ Error fetching blog posts:', error);
      return [];
    }
  }

  async getBlogPost(slug: string): Promise<BlogPost | null> {
    try {
      console.log('🔍 Buscando post con slug:', slug);
      
      // Query simple sin filtros complejos
      const response = await fetch(
        `${this.baseUrl}/api/blog-posts?populate=*`
      );
      
      console.log('📡 Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Error response:', errorText);
        throw new Error(`Error al obtener el post: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('📊 Data recibida para post individual:', data);
      
      // Buscar el post por slug en los datos recibidos
      if (data.data && Array.isArray(data.data)) {
        const item = data.data.find((post: any) => post.slug === slug);
        
                 if (item) {
           console.log('✅ Post encontrado:', item);
           console.log('🖼️ Estructura de imagen del post:', item.featuredImage);
           return {
             id: item.id,
             title: item.Title || item.title,
             slug: item.slug,
             excerpt: item.excerpt,
             content: item.content,
             featuredImage: item.featuredImage?.data ? {
               url: `${this.baseUrl}${item.featuredImage.data.attributes.url}`,
               alternativeText: item.featuredImage.data.attributes.alternativeText
             } : undefined,
            category: item.category?.data ? {
              id: item.category.data.id,
              name: item.category.data.attributes.name,
              slug: item.category.data.attributes.slug,
              description: item.category.data.attributes.description,
              color: item.category.data.attributes.color,
              icon: item.category.data.attributes.icon
            } : undefined,
            tags: item.tags?.data ? item.tags.data.map((tag: any) => ({
              id: tag.id,
              name: tag.attributes.name,
              slug: tag.attributes.slug,
              description: tag.attributes.description
            })) : [],
            author: item.author?.data ? {
              id: item.author.data.id,
              username: item.author.data.attributes.username,
              email: item.author.data.attributes.email
            } : undefined,
            publishedAt: item.publishedAt,
            status: item.status,
            readingTime: item.readingTime,
            featured: item.featured || false,
            seo: item.seo ? {
              metaTitle: item.seo.metaTitle,
              metaDescription: item.seo.metaDescription,
              keywords: item.seo.keywords,
              ogTitle: item.seo.ogTitle,
              ogDescription: item.seo.ogDescription,
              ogImage: item.seo.ogImage?.data ? {
                url: item.seo.ogImage.data.attributes.url,
                alternativeText: item.seo.ogImage.data.attributes.alternativeText
              } : undefined,
              twitterCardType: item.seo.twitterCardType
            } : undefined
          };
        } else {
          console.log('❌ Post no encontrado con slug:', slug);
          console.log('📝 Slugs disponibles:', data.data.map((post: any) => post.slug));
        }
      }
      
      return null;
    } catch (error) {
      console.error('❌ Error fetching blog post:', error);
      return null;
    }
  }

  async getBlogCategories(): Promise<any[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/blog-categories?populate=*`);
      if (!response.ok) {
        throw new Error(`Error al obtener categorías: ${response.statusText}`);
      }
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching blog categories:', error);
      return [];
    }
  }

  async getBlogTags(): Promise<any[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/blog-tags?populate=*`);
      if (!response.ok) {
        throw new Error(`Error al obtener tags: ${response.statusText}`);
      }
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching blog tags:', error);
      return [];
    }
  }
}

export const strapiClient = new StrapiClient();
