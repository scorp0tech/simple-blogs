"use client"

import { createClient } from "@/lib/supabase/client"
import { useState } from "react"

export function useLike(blogId: string, initialLiked: boolean, initialCount: number) {
  const [liked, setLiked] = useState(initialLiked)
  const [likesCount, setLikesCount] = useState(initialCount)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const toggleLike = async () => {
    try {
      setLoading(true)
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("User not authenticated")

      // Check if already liked
      const { data: existingLike } = await supabase
        .from("likes")
        .select("*")
        .eq("blog_id", blogId)
        .eq("user_id", user.id)
        .maybeSingle()

      if (existingLike) {
        // Unlike
        await supabase.from("likes").delete().eq("blog_id", blogId).eq("user_id", user.id)

        // Decrement likes count in blogs table directly
        const { data: blogData, error: blogError } = await supabase
          .from("blogs")
          .select("likes_count")
          .eq("id", blogId)
          .single()

        if (blogError) throw blogError
        if (blogData) {
          const newLikesCount = Math.max(0, blogData.likes_count - 1)
          await supabase.from("blogs").update({ likes_count: newLikesCount }).eq("id", blogId)
          setLikesCount(newLikesCount)
        }

        setLiked(false)
      } else {
        // Like
        await supabase.from("likes").insert([{ blog_id: blogId, user_id: user.id }])

        // Increment likes count in blogs table directly
        const { data: blogData, error: blogError } = await supabase
          .from("blogs")
          .select("likes_count")
          .eq("id", blogId)
          .single()

        if (blogError) throw blogError
        if (blogData) {
          const newLikesCount = blogData.likes_count + 1
          await supabase.from("blogs").update({ likes_count: newLikesCount }).eq("id", blogId)
          setLikesCount(newLikesCount)
        }

        setLiked(true)
      }
    } catch (error) {
      console.error("Error toggling like:", error)
    } finally {
      setLoading(false)
    }
  }

  return {
    liked,
    likesCount,
    loading,
    toggleLike,
  }
}
