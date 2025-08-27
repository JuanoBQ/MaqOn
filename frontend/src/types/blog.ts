export interface BlogAuthor {
  id: number
  username: string
  email: string
}

export interface BlogCategory {
  id: number
  name: string
  slug: string
  description?: string
  color?: string
  icon?: string
}

export interface BlogTag {
  id: number
  name: string
  slug: string
  description?: string
}

export interface BlogSEO {
  metaTitle?: string
  metaDescription?: string
  keywords?: string[]
  ogTitle?: string
  ogDescription?: string
  ogImage?: {
    url: string
    alternativeText?: string
  }
  twitterCardType?: 'summary' | 'summary_large_image'
}

export interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage?: {
    url: string
    alternativeText?: string
  }
  category?: BlogCategory
  tags?: BlogTag[]
  author?: BlogAuthor
  publishedAt: string
  status: 'draft' | 'published' | 'archived'
  readingTime?: number
  featured?: boolean
  seo?: BlogSEO
}

export interface BlogPostsResponse {
  data: BlogPost[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface BlogPostResponse {
  data: BlogPost
  meta: {}
}
