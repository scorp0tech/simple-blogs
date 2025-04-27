"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

interface ErrorBoundaryProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Error boundary caught error:", error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
      <p className="mb-6 text-muted-foreground">
        We're sorry, but there was an error loading this page. Please try again.
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  )
}
