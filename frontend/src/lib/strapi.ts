import { BlogPost } from '@/types/blog'

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
