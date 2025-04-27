import { BlogForm } from "@/components/blog/blog-form"

export default function CreateBlogPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create a New Blog</h1>
        <BlogForm />
      </div>
    </div>
  )
}
