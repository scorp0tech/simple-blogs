import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function createClient() {
  const cookieStore = await cookies()

  // Ensure the URL is properly formatted and not undefined
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Supabase URL or Anon Key is missing")
    // Return a dummy client that won't make actual requests
    return {
      auth: {
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      },
      from: () => ({
        select: () => ({ data: null, error: new Error("Supabase client not initialized") }),
      }),
    } as any
  }

  // Ensure URL has proper format
  const formattedUrl = supabaseUrl.startsWith("http") ? supabaseUrl : `https://${supabaseUrl}`

  return createServerClient(formattedUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            // The `set` method is synchronous, but the operation may involve async I/O in the background.
            // Use `request.cookies.set` in middleware and `response.cookies.set` in Route Handlers is the modern way.
            // Here, we assume this client is used in Server Components/Actions where direct set might fail gracefully.
            cookieStore.set(name, value, options)
          })
        } catch {
          // The `setAll` method was called from a context where cookies cannot be set,
          // e.g., Server Components. This can often be ignored if middleware handles session updates.
          // If cookies need to be set from server actions, consider using a different approach
          // or ensuring the context allows cookie modification.
        }
      },
    },
  })
}
