import { getUser } from "@/services/auth"
import { getAuthorRankings } from "@/services/users"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { notFound } from "next/navigation"
import type { RankedAuthor } from "@/types"

export default async function RankingPage() {
  // Check authentication
  const { user: authUser } = await getUser()
  if (!authUser) {
    notFound()
  }

  // Get rankings
  const { rankings, error } = await getAuthorRankings()

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          Failed to load rankings: {error.message}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Author Rankings</h1>
        <p className="text-muted-foreground mb-8">Authors ranked by total likes across all their blogs</p>

        <div className="space-y-4">
          {rankings.map((author: RankedAuthor, index: number) => (
            <Card key={author.id}>
              <CardContent className="flex items-center p-6">
                <div className="flex items-center gap-4 flex-1">
                  <div className="text-2xl font-bold text-muted-foreground w-8">
                    #{index + 1}
                  </div>
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={author.avatar_url || ""} />
                    <AvatarFallback>{author.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{author.username}</div>
                    <div className="text-sm text-muted-foreground">
                      {author.total_likes} total likes
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {rankings.length === 0 && (
            <div className="text-center py-12 border rounded-lg">
              <p className="text-muted-foreground">No rankings available yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
