import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

export async function signUp(email: string, password: string) {
  const cookieStore = cookies()
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  return { data, error }
}

export async function signIn(email: string, password: string) {
  const cookieStore = cookies()
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  return { data, error }
}

export async function signOut() {
  const cookieStore = cookies()
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  return { error }
}

export async function getUser() {
  const cookieStore = cookies()
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  return { user, error }
}
