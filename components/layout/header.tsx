"use client"

import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"

export function Header() {
  const { user, signOut, loading } = useAuth()

  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-2xl font-bold">
          BlogApp
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/blogs" className="text-sm font-medium hover:underline">
            Blogs
          </Link>
          {user && (
            <>
              <Link
                href="/create"
                className="text-sm font-medium hover:underline"
              >
                Create
              </Link>
              <Link
                href="/profile"
                className="text-sm font-medium hover:underline"
              >
                Profile
              </Link>
              <Link
                href="/ranking"
                className="text-sm font-medium hover:underline"
              >
                Ranking
              </Link>
            </>
          )}
        </nav>

        <div>
          {!loading &&
            (user ? (
              <Button onClick={signOut} variant="outline">
                Sign Out
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button asChild variant="outline">
                  <Link href="/login">Log In</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            ))}
        </div>
      </div>
    </header>
  );
}
