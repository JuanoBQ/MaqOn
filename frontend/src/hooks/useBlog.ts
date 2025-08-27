import { useState, useEffect } from 'react'
import { strapiClient } from '@/lib/strapi'
import { BlogPost } from '@/types/blog'

export function useBlogPosts(page: number = 1, pageSize: number = 10) {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true)
        setError(null)
        const data = await strapiClient.getBlogPosts(page, pageSize)
        setPosts(data)
      } catch (err) {
        console.error('Error fetching blog posts:', err)
        setError('Error al cargar los posts del blog')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [page, pageSize])

  return { posts, loading, error }
}

export function useBlogPost(slug: string) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPost() {
      try {
        setLoading(true)
        setError(null)
        const data = await strapiClient.getBlogPost(slug)
        setPost(data)
      } catch (err) {
        console.error('Error fetching blog post:', err)
        setError('Error al cargar el post del blog')
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchPost()
    }
  }, [slug])

  return { post, loading, error }
}
