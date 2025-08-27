import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utilidades para SEO y URLs
export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateShort(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Utilidades para metadatos del blog
export function generateBlogMetaTags(post: {
  title: string;
  excerpt: string;
  content: string;
  featuredImage?: { url: string; alternativeText?: string };
  publishedAt: string;
  author?: { username: string };
  category?: { name: string };
}) {
  const siteUrl = process.env.SITE_URL || 'http://localhost:3000';
  const readingTime = calculateReadingTime(post.content);
  
  return {
    title: `${post.title} | Blog MaqOn`,
    description: post.excerpt || truncateText(post.content, 160),
    keywords: [
      post.category?.name,
      'blog industrial',
      'maquinaria industrial',
      'productos industriales',
      'MaqOn'
    ].filter(Boolean).join(', '),
    openGraph: {
      title: post.title,
      description: post.excerpt || truncateText(post.content, 160),
      url: `${siteUrl}/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`,
      siteName: 'MaqOn Blog',
      images: post.featuredImage ? [
        {
          url: post.featuredImage.url,
          width: 1200,
          height: 630,
          alt: post.featuredImage.alternativeText || post.title,
        }
      ] : undefined,
      locale: 'es_ES',
      type: 'article',
      publishedTime: post.publishedAt,
      author: post.author?.username,
      section: post.category?.name,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || truncateText(post.content, 160),
      images: post.featuredImage ? [post.featuredImage.url] : undefined,
    },
    article: {
      publishedTime: post.publishedAt,
      author: post.author?.username,
      section: post.category?.name,
      tags: [post.category?.name, 'industrial', 'maquinaria'].filter(Boolean),
    },
  };
}

// Utilidades para productos
export function generateProductMetaTags(product: {
  nombre: string;
  descripcion?: string;
  categoria?: string;
  imagen?: { url: string; alternativeText?: string };
  precio?: number;
}) {
  const siteUrl = process.env.SITE_URL || 'http://localhost:3000';
  
  return {
    title: `${product.nombre} | Productos Industriales MaqOn`,
    description: product.descripcion || `Descubre ${product.nombre} de alta calidad industrial. Solicita tu cotización personalizada.`,
    keywords: [
      product.nombre,
      product.categoria,
      'productos industriales',
      'cotización',
      'MaqOn'
    ].filter(Boolean).join(', '),
    openGraph: {
      title: `${product.nombre} | MaqOn`,
      description: product.descripcion || `Descubre ${product.nombre} de alta calidad industrial.`,
      url: `${siteUrl}/productos/${product.nombre.toLowerCase().replace(/\s+/g, '-')}`,
      siteName: 'MaqOn',
      images: product.imagen ? [
        {
          url: product.imagen.url,
          width: 1200,
          height: 630,
          alt: product.imagen.alternativeText || product.nombre,
        }
      ] : undefined,
      locale: 'es_ES',
      type: 'product',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.nombre} | MaqOn`,
      description: product.descripcion || `Descubre ${product.nombre} de alta calidad industrial.`,
      images: product.imagen ? [product.imagen.url] : undefined,
    },
  };
}
