import { LoginForm } from "@/components/auth/login-form"
import { redirect } from "next/navigation"
import { getUser } from "@/services/auth"

export const dynamic = 'force-dynamic'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { message?: string }
}) {
  const { user } = await getUser()

  if (user) {
    redirect("/blogs")
  }

  const awaitedSearchParams = await searchParams
  const message = awaitedSearchParams.message

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Sign In</h1>
          <p className="text-muted-foreground">Enter your credentials to access your account</p>
          {message && (
            <p className="p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded">{message}</p>
          )}
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
