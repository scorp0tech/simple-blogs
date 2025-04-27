"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, UserPlus } from "lucide-react"
import Link from "next/link"
import { useLike } from "@/hooks/useLike"
import { useFollow } from "@/hooks/useFollow"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"

interface BlogCardProps {
  id: string
  title: string
  content: string
  authorId: string
  authorName: string
  likesCount: number
  isLiked: boolean
  isFollowing: boolean
  createdAt: string
}

export function BlogCard({
  id,
  title,
  content,
  authorId,
  authorName,
  likesCount,
  isLiked,
  isFollowing,
  createdAt,
}: BlogCardProps) {
  const { liked, likesCount: count, toggleLike } = useLike(id, isLiked, likesCount)
  const { following, toggleFollow } = useFollow(authorId, isFollowing)
  const { user } = useAuth()
  const router = useRouter()

  const handleLike = () => {
    if (!user) {
      router.push("/login")
      return
    }
    toggleLike()
  }

  const handleFollow = () => {
    if (!user) {
      router.push("/login")
      return
    }
    toggleFollow()
  }

  const isOwnBlog = user?.id === authorId

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="line-clamp-1">{title}</CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">by {authorName}</span>
            {!isOwnBlog && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleFollow}
                className={following ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}
              >
                <UserPlus className="mr-1 h-4 w-4" />
                {following ? "Following" : "Follow"}
              </Button>
            )}
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{new Date(createdAt).toLocaleDateString()}</p>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3">{content}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" size="sm" onClick={handleLike}>
          <Heart className={`mr-1 h-4 w-4 ${liked ? "fill-red-500 text-red-500" : ""}`} />
          {count}
        </Button>
        <Button asChild variant="outline" size="sm">
          <Link href={`/blogs/${id}`}>Read More</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
