import { getBlogById } from "@/services/blogs"
import { getUser } from "@/services/auth"
import { checkLiked } from "@/services/blogs"
import { checkFollowing } from "@/services/users"
import { Button } from "@/components/ui/button"
import { Heart, UserPlus } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function BlogPage({ params }: { params: { id: string } }) {
  const { blog, error } = await getBlogById(params.id)
  const { user } = await getUser()

  if (error || !blog) {
    notFound()
  }

  let isLiked = false
  let isFollowing = false

  if (user) {
    const { liked } = await checkLiked(blog.id, user.id)
    const { following } = await checkFollowing(user.id, blog.author.id)

    isLiked = liked
    isFollowing = following
  }

  const isOwnBlog = user?.id === blog.author.id

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">
                By {blog.author.username} • {new Date(blog.created_at).toLocaleDateString()}
              </span>
            </div>
            {user && !isOwnBlog && (
              <div className="flex items-center gap-2">
                <form action={`/api/blogs/${blog.id}/like`} method="POST">
                  <Button type="submit" variant="outline" size="sm" className={isLiked ? "text-red-500" : ""}>
                    <Heart className={`mr-1 h-4 w-4 ${isLiked ? "fill-red-500" : ""}`} />
                    {blog.likes_count}
                  </Button>
                </form>
                <form action={`/api/users/${blog.author.id}/follow`} method="POST">
                  <Button
                    type="submit"
                    variant="outline"
                    size="sm"
                    className={isFollowing ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}
                  >
                    <UserPlus className="mr-1 h-4 w-4" />
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>

        <div className="prose max-w-none">
          {blog.content.split("\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t">
          <Link href="/blogs" className="text-blue-600 hover:underline">
            ← Back to all blogs
          </Link>
        </div>
      </div>
    </div>
  )
}
