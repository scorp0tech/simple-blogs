"use client"

import { createClient } from "@/lib/supabase/client"
import { useState } from "react"

export function useFollow(authorId: string, initialFollowing: boolean) {
  const [following, setFollowing] = useState(initialFollowing)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const toggleFollow = async () => {
    try {
      setLoading(true)

      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("User not authenticated")

      // Check if already following
      const { data: existingFollow } = await supabase
        .from("follows")
        .select("*")
        .eq("follower_id", user.id)
        .eq("following_id", authorId)
        .single()

      if (existingFollow) {
        // Unfollow
        await supabase.from("follows").delete().eq("follower_id", user.id).eq("following_id", authorId)

        setFollowing(false)
      } else {
        // Follow
        await supabase.from("follows").insert([{ follower_id: user.id, following_id: authorId }])

        setFollowing(true)
      }
    } catch (error) {
      console.error("Error toggling follow:", error)
    } finally {
      setLoading(false)
    }
  }

  return {
    following,
    loading,
    toggleFollow,
  }
}
