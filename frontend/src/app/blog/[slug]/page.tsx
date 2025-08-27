import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlogPost } from '@/components/blog/BlogPost'
import { strapiClient } from '@/lib/strapi'

interface BlogPostPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const post = await strapiClient.getBlogPost(params.slug)
    
    if (!post) {
      return {
        title: 'Post no encontrado - Blog MaqOn',
        description: 'El artículo que buscas no está disponible.',
      }
    }

    return {
      title: `${post.title} - Blog MaqOn`,
      description: post.excerpt,
      keywords: post.seo?.keywords || [],
      openGraph: {
        title: post.seo?.ogTitle || post.title,
        description: post.seo?.ogDescription || post.excerpt,
        type: 'article',
        images: post.featuredImage?.url ? [post.featuredImage.url] : [],
      },
    }
  } catch (error) {
    return {
      title: 'Blog - MaqOn',
      description: 'Artículo del blog de MaqOn',
    }
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  console.log('🔍 BlogPostPage - Params recibidos:', params);
  console.log('🔍 BlogPostPage - Slug a buscar:', params.slug);
  
  try {
    const post = await strapiClient.getBlogPost(params.slug)
    console.log('📝 BlogPostPage - Post obtenido:', post);
    
    if (!post) {
      console.log('❌ BlogPostPage - Post no encontrado, llamando notFound()');
      notFound()
    }

    console.log('✅ BlogPostPage - Renderizando post:', post.title);
    return (
      <div className="min-h-screen bg-gray-50">
        <BlogPost post={post} />
      </div>
    )
  } catch (error) {
    console.error('❌ BlogPostPage - Error:', error);
    notFound()
  }
}
