import { createClient } from "@/lib/supabase/server"
import type { Blog } from "@/types"
import { cookies } from "next/headers"

export async function getBlogs() {
  const cookieStore = cookies()
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("blogs")
    .select(`
      *,
      author:users(id, username, avatar_url)
    `)
    .eq("published", true)
    .order("created_at", { ascending: false })

  return { blogs: data as (Blog & { author: { id: string; username: string; avatar_url: string | null } })[], error }
}

export async function getBlogById(id: string) {
  const cookieStore = cookies()
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("blogs")
    .select(`
      *,
      author:users(id, username, avatar_url)
    `)
    .eq("id", id)
    .single()

  return { blog: data as Blog & { author: { id: string; username: string; avatar_url: string | null } }, error }
}

export async function getUserBlogs(userId: string) {
  const cookieStore = cookies()
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("author_id", userId)
    .order("created_at", { ascending: false })

  return { blogs: data as Blog[], error }
}

export async function createBlog(blog: Omit<Blog, "id" | "created_at" | "updated_at" | "likes_count">) {
  const cookieStore = cookies()
  const supabase = await createClient()

  const { data, error } = await supabase.from("blogs").insert([blog]).select()

  return { blog: data?.[0] as Blog, error }
}

export async function likeBlog(blogId: string, userId: string) {
  const cookieStore = cookies()
  const supabase = await createClient()

  // Check if user already liked the blog
  const { data: existingLike } = await supabase
    .from("likes")
    .select("*")
    .eq("blog_id", blogId)
    .eq("user_id", userId)
    .single()

  if (existingLike) {
    // Unlike
    const { error: unlikeError } = await supabase.from("likes").delete().eq("blog_id", blogId).eq("user_id", userId)

    if (unlikeError) return { error: unlikeError }

    // Decrement likes count
    const { error: updateError } = await supabase.rpc("decrement_likes", { blog_id: blogId })

    return { error: updateError }
  } else {
    // Like
    const { error: likeError } = await supabase.from("likes").insert([{ blog_id: blogId, user_id: userId }])

    if (likeError) return { error: likeError }

    // Increment likes count
    const { error: updateError } = await supabase.rpc("increment_likes", { blog_id: blogId })

    return { error: updateError }
  }
}

export async function checkLiked(blogId: string, userId: string) {
  const cookieStore = cookies()
  const supabase = await createClient()

  const { data, error } = await supabase.from("likes").select("*").eq("blog_id", blogId).eq("user_id", userId).single()

  return { liked: !!data, error }
}
