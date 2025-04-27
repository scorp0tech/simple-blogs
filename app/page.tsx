import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
        Welcome to <span className="text-primary">Blog App</span>
      </h1>
      <p className="mt-6 text-lg text-muted-foreground max-w-3xl">
        Share your thoughts, follow your favorite authors, and engage with a community of writers.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <Button asChild size="lg">
          <Link href="/blogs">Explore Blogs</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/signup">Get Started</Link>
        </Button>
      </div>
    </div>
  )
}
