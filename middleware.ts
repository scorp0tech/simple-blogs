import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createServerClient, type CookieOptions } from "@supabase/ssr"

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Ensure the URL is properly formatted and not undefined
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Supabase URL or Anon Key is missing in middleware")
    return response
  }

  // Ensure URL has proper format
  const formattedUrl = supabaseUrl.startsWith("http") ? supabaseUrl : `https://${supabaseUrl}`

  const supabase = createServerClient(formattedUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        request.cookies.set({
          name,
          value,
          ...options,
        })
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        })
        response.cookies.set({
          name,
          value,
          ...options,
        })
      },
      remove(name: string, options: CookieOptions) {
        // Ensure path is included in options (this might be specific to your setup)
        // Adjust if necessary based on how your cookies are set
        request.cookies.delete(name)
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        })
        response.cookies.delete(name)
      },
    },
  })

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // If user is not signed in and the current path is protected, redirect to /login
    if (
      !user &&
      (request.nextUrl.pathname.startsWith("/profile") ||
        request.nextUrl.pathname.startsWith("/create") ||
        request.nextUrl.pathname.startsWith("/ranking"))
    ) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  } catch (error) {
    console.error("Error in middleware:", error)
  }

  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
