# 📝 Simple Blog Application — Intern Task

This is a simple and scalable **Next.js + Supabase** blog application designed for intern onboarding and evaluation.

---

## ⚙️ Project Setup (using pnpm)

### 1. Fork the Repository

- First, **fork** this repository to your own GitHub account.
- Then **clone** your forked repository locally:

```bash
git clone https://github.com/your-username/blog-app.git
cd blog-app
```

---

### 2. Install Dependencies

```bash
pnpm i
```

---

### 3. Set up Supabase Backend

1. Go to [https://app.supabase.com/](https://app.supabase.com/) and create a free account (if you don't have one).
2. Create a **new project**.
   - Save your **Supabase URL** and **Anon Key** from the Project Settings → API section.
3. **Apply the database schema**:
   - In the Supabase dashboard, open **SQL Editor**.
   - Open the `schema.sql` file provided in this project.
   - Copy-paste the SQL and **run** it to create the necessary tables (`users`, `blogs`, `likes`, `follows`, etc.).

---

### 4. Configure Environment Variables

Create a `.env.local` file at the root of the project:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Replace `your-supabase-url` and `your-supabase-anon-key` with your actual Supabase credentials.

---

### 5. Run the Development Server

```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

---

# 🧹 Intern To-Do

**Task:**  
Implement the **Ranking Page** at `/ranking`.

---

## Responsibilities:

- Fetch necessary data from Supabase.
- Display a leaderboard:
  - Authors ranked by total likes across all their blogs.
- Implement **loading** and **error** handling states.
- Ensure **responsiveness** across devices.
- Maintain **clean**, **modular**, and **scalable** code.

---

## Guidelines:

- Follow the existing project structure and coding conventions.
- Only authenticated users should be able to access `/ranking`.
- Use TailwindCSS for styling if necessary.
- Write meaningful and clear commit messages.
- Maintain good coding practices (error handling, clean architecture, reusability).

---

## 📥 Submission Instructions

1. After completing the task, **push** your changes to your forked repository.
2. Create a **Pull Request (PR)** back to the original repository.
3. **Name your Pull Request** like this:

```
[Your Full Name] - Ranking Page Implementation
```

Example:  
`John Doe - Ranking Page Implementation`

---
