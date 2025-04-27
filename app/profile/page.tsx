import { getUser } from "@/services/auth"
import { getUserBlogs } from "@/services/blogs"
import { getUserProfile, getFollowersCount, getFollowingCount } from "@/services/users"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"

export default async function ProfilePage() {
  const { user: authUser } = await getUser()

  if (!authUser) {
    notFound()
  }

  const { user, error: userError } = await getUserProfile(authUser.id)
  const { blogs, error: blogsError } = await getUserBlogs(authUser.id)
  const { count: followersCount } = await getFollowersCount(authUser.id)
  const { count: followingCount } = await getFollowingCount(authUser.id)

  if (userError) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          Failed to load profile: {userError.message}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">Username</p>
                <p>{user.username}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Email</p>
                <p>{user.email}</p>
              </div>
              <div className="flex gap-6">
                <div>
                  <p className="text-sm font-medium">Followers</p>
                  <p>{followersCount}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Following</p>
                  <p>{followingCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Your Blogs</h2>
            <Button asChild>
              <Link href="/create">Create New Blog</Link>
            </Button>
          </div>

          {blogsError && (
            <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded mb-6">
              Failed to load blogs: {blogsError.message}
            </div>
          )}

          {blogs && blogs.length === 0 ? (
            <div className="text-center py-12 border rounded-lg">
              <p className="text-muted-foreground mb-4">You haven't published any blogs yet.</p>
              <Button asChild>
                <Link href="/create">Create Your First Blog</Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {blogs?.map((blog) => (
                <Card key={blog.id}>
                  <CardHeader>
                    <CardTitle className="line-clamp-1">{blog.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{new Date(blog.created_at).toLocaleDateString()}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-3 mb-4">{blog.content}</p>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">{blog.likes_count} likes</div>
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/blogs/${blog.id}`}>View</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
