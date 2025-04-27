import { createClient } from "@/lib/supabase/server"
import type { User } from "@/types"
import { cookies } from "next/headers"

export async function getUserProfile(userId: string) {
  const cookieStore = cookies()
  const supabase = await createClient()

  const { data, error } = await supabase.from("users").select("*").eq("id", userId).single()

  return { user: data as User, error }
}

export async function followUser(followerId: string, followingId: string) {
  const cookieStore = cookies()
  const supabase = await createClient()

  // Check if already following
  const { data: existingFollow } = await supabase
    .from("follows")
    .select("*")
    .eq("follower_id", followerId)
    .eq("following_id", followingId)
    .single()

  if (existingFollow) {
    // Unfollow
    const { error } = await supabase
      .from("follows")
      .delete()
      .eq("follower_id", followerId)
      .eq("following_id", followingId)

    return { error }
  } else {
    // Follow
    const { error } = await supabase.from("follows").insert([{ follower_id: followerId, following_id: followingId }])

    return { error }
  }
}

export async function checkFollowing(followerId: string, followingId: string) {
  const cookieStore = cookies()
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("follows")
    .select("*")
    .eq("follower_id", followerId)
    .eq("following_id", followingId)
    .single()

  return { following: !!data, error }
}

export async function getFollowersCount(userId: string) {
  const cookieStore = cookies()
  const supabase = await createClient()

  const { count, error } = await supabase
    .from("follows")
    .select("*", { count: "exact", head: true })
    .eq("following_id", userId)

  return { count, error }
}

export async function getFollowingCount(userId: string) {
  const cookieStore = cookies()
  const supabase = await createClient()

  const { count, error } = await supabase
    .from("follows")
    .select("*", { count: "exact", head: true })
    .eq("follower_id", userId)

  return { count, error }
}
