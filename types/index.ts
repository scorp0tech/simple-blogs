export interface User {
  id: string
  email: string
  username: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface Blog {
  id: string
  title: string
  content: string
  author_id: string
  created_at: string
  updated_at: string
  published: boolean
  likes_count: number
  author?: User
}

export interface Like {
  id: string
  blog_id: string
  user_id: string
  created_at: string
}

export interface Follow {
  id: string
  follower_id: string
  following_id: string
  created_at: string
}

export interface RankedAuthor extends User {
  blogs: { likes_count: number }[]
  total_likes: number
}
