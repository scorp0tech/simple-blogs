import { getBlogs } from "@/services/blogs"
import { getUser } from "@/services/auth"
import { BlogCard } from "@/components/blog/blog-card"
import { checkLiked } from "@/services/blogs"
import { checkFollowing } from "@/services/users"

export default async function BlogsPage() {
  const { blogs, error } = await getBlogs()
  const { user } = await getUser()

  // Get like and follow status for each blog if user is logged in
  let blogsWithStatus = blogs || []

  if (user && blogs) {
    blogsWithStatus = await Promise.all(
      blogs.map(async (blog) => {
        const { liked } = await checkLiked(blog.id, user.id)
        const { following } = await checkFollowing(user.id, blog.author.id)

        return {
          ...blog,
          isLiked: liked,
          isFollowing: following,
        }
      }),
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">All Blogs</h1>

      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded mb-6">
          Failed to load blogs: {error.message}
        </div>
      )}

      {blogsWithStatus.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No blogs found. Be the first to publish!</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogsWithStatus.map((blog: any) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              title={blog.title}
              content={blog.content}
              authorId={blog.author.id}
              authorName={blog.author.username}
              likesCount={blog.likes_count}
              isLiked={blog.isLiked || false}
              isFollowing={blog.isFollowing || false}
              createdAt={blog.created_at}
            />
          ))}
        </div>
      )}
    </div>
  )
}
