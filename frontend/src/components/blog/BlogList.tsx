'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CalendarIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline'
import { useBlogPosts } from '@/hooks/useBlog'
import { BlogCardSkeleton } from '@/components/ui/Skeleton'
import { formatDateShort, calculateReadingTime } from '@/lib/utils'
import { OptimizedImage } from '@/components/ui/OptimizedImage'

export function BlogList() {
  const { posts, loading, error } = useBlogPosts()
  
  console.log('📝 BlogList - Posts recibidos:', posts)
  console.log('📝 BlogList - Loading:', loading)
  console.log('📝 BlogList - Error:', error)

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <BlogCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-lg mb-4">Error al cargar los posts</div>
        <button 
          onClick={() => window.location.reload()} 
          className="btn-primary"
        >
          Intentar de nuevo
        </button>
      </div>
    )
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-4">No hay posts disponibles</div>
        <p className="text-gray-400">Pronto publicaremos contenido interesante.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
          Últimos Artículos
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Mantente actualizado con las últimas tendencias y guías técnicas del sector industrial
        </p>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
                         {/* Featured Image */}
             <div className="relative h-48 overflow-hidden">
                               {post.featuredImage?.url ? (
                  <OptimizedImage
                    src={post.featuredImage.url}
                    alt={post.title}
                    width={400}
                    height={192}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    fallback="/images/placeholder-blog.jpg"
                  />
                ) : (
                 <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                   <span className="text-primary-500 text-4xl font-bold">M</span>
                 </div>
               )}
              
              {/* Featured Badge */}
              {post.featured && (
                <div className="absolute top-4 left-4 bg-accent-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Destacado
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Meta Info */}
              <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  {new Date(post.publishedAt).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>
                {post.readingTime && (
                  <div className="flex items-center">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    {post.readingTime} min
                  </div>
                )}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-primary-600 transition-colors">
                <Link href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h3>

              {/* Excerpt */}
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              {/* Author */}
              {post.author && (
                <div className="flex items-center text-sm text-gray-500">
                  <UserIcon className="h-4 w-4 mr-2" />
                  {post.author.username || 'Equipo MaqOn'}
                </div>
              )}

              {/* Read More */}
              <div className="mt-6">
                <Link 
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                  Leer más
                  <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  )
}
