"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"
import { createClient } from "@/lib/supabase/client"

export function SignupForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { signUp } = useAuth()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!username.trim()) {
      setError("Username is required")
      return
    }

    try {
      setLoading(true)
      setError(null)

      const data = await signUp(email, password)
      if (data.user) {
        // Create user profile
        const { error: profileError } = await supabase.from("users").insert([
          {
            id: data.user.id,
            email: data.user.email,
            username,
          },
        ])

        if (profileError) throw profileError
      }

      router.push("/login?message=Check your email to confirm your account")
    } catch (err: any) {
      setError(err.message || "Failed to sign up")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="username" className="text-sm font-medium">
          Username
        </label>
        <Input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Choose a username"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a password"
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Signing up..." : "Sign Up"}
      </Button>
      <p className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  )
}
