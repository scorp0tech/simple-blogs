import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Header } from "@/components/layout/header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Blog App",
  description: "A simple blog application built with Next.js and Supabase",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <footer className="border-t py-6">
            <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} Blog App. All rights reserved.
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
