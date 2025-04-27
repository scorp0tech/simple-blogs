import { SignupForm } from "@/components/auth/signup-form"
import { redirect } from "next/navigation"
import { getUser } from "@/services/auth"

export default async function SignupPage() {
  const { user } = await getUser()

  if (user) {
    redirect("/blogs")
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create an Account</h1>
          <p className="text-muted-foreground">Enter your details to create a new account</p>
        </div>
        <SignupForm />
      </div>
    </div>
  )
}
