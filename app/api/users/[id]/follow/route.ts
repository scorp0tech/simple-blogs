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

  const followingId = params.id

  // Check if already following
  const { data: existingFollow } = await supabase
    .from("follows")
    .select("*")
    .eq("follower_id", user.id)
    .eq("following_id", followingId)
    .single()

  if (existingFollow) {
    // Unfollow
    const { error } = await supabase.from("follows").delete().eq("follower_id", user.id).eq("following_id", followingId)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
  } else {
    // Follow
    const { error } = await supabase.from("follows").insert([{ follower_id: user.id, following_id: followingId }])

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
  }

  // Redirect back to the previous page
  const referer = request.headers.get("referer")
  return NextResponse.redirect(referer || new URL("/blogs", request.url))
}
