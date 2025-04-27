import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const cookieStore = cookies()
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const blogId = params.id

  // Check if user already liked the blog
  const { data: existingLike } = await supabase
    .from("likes")
    .select("*")
    .eq("blog_id", blogId)
    .eq("user_id", user.id)
    .single()

  if (existingLike) {
    // Unlike
    const { error: unlikeError } = await supabase.from("likes").delete().eq("blog_id", blogId).eq("user_id", user.id)

    if (unlikeError) {
      return NextResponse.json({ error: unlikeError.message }, { status: 500 })
    }

    // Decrement likes count
    await supabase.rpc("decrement_likes", { blog_id: blogId })
  } else {
    // Like
    const { error: likeError } = await supabase.from("likes").insert([{ blog_id: blogId, user_id: user.id }])

    if (likeError) {
      return NextResponse.json({ error: likeError.message }, { status: 500 })
    }

    // Increment likes count
    await supabase.rpc("increment_likes", { blog_id: blogId })
  }

  return NextResponse.redirect(new URL(`/blogs/${blogId}`, request.url))
}
