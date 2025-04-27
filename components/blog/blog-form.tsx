"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"

export function BlogForm() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      setError("Title and content are required")
      return
    }

    try {
      setLoading(true)
      setError(null)

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setError("You must be logged in to create a blog")
        return
      }

      const { error: blogError } = await supabase.from("blogs").insert([
        {
          title,
          content,
          author_id: user.id,
          published: true,
        },
      ])

      if (blogError) throw blogError

      router.push("/blogs")
      router.refresh()
    } catch (err: any) {
      setError(err.message || "An error occurred while creating the blog")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">
          Title
        </label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter blog title"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="content" className="text-sm font-medium">
          Content
        </label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your blog content here..."
          className="min-h-[200px]"
          required
        />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Publishing..." : "Publish Blog"}
      </Button>
    </form>
  )
}
