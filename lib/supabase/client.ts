import { createBrowserClient } from "@supabase/ssr"
import { SupabaseClient } from "@supabase/supabase-js"
export function createClient(): SupabaseClient {
  // Ensure the URL is properly formatted and not undefined
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Supabase URL or Anon Key is missing")
    // Return a dummy client that won't make actual requests
    // This prevents the app from crashing but won't work properly
    return {
      auth: {
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithPassword: () => Promise.resolve({ data: null, error: new Error("Supabase client not initialized") }),
        signUp: () => Promise.resolve({ data: null, error: new Error("Supabase client not initialized") }),
        signOut: () => Promise.resolve({ error: null }),
      },
      from: () => ({
        select: () => ({ data: null, error: new Error("Supabase client not initialized") }),
      }),
    } as any
  }

  // Ensure URL has proper format
  const formattedUrl = supabaseUrl.startsWith("http") ? supabaseUrl : `https://${supabaseUrl}`

  return createBrowserClient(formattedUrl, supabaseAnonKey)
}
