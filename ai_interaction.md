# 💬 Common Questions & Answers (with ChatGPT)

Below is a collection of important questions I asked while working on the project, and the helpful answers I received from ChatGPT.

---

## ❓ What is a blog?

**Answer:**

A **blog** is a type of website or section of a website where someone regularly posts content, usually in the form of **articles, stories, news, or personal opinions**.

### Key Features:
- Posts/articles (written content)
- Titles and publication dates
- Author information
- Optional comments
- Categories or tags
- Images or videos

In simple terms:  
> A blog is like an **online journal or newsfeed** where people or companies share ideas and updates.

---

## ❓ What does "fork the repository" mean?

**Answer:**

To **fork a repository** means to create your **own copy** of someone else's GitHub project in your own GitHub account.

### Why fork?
- To work on it independently
- To make improvements without affecting the original
- To submit improvements via a pull request later

### How to fork:
1. Go to the GitHub repo.
2. Click the **"Fork"** button (top-right).
3. GitHub creates a copy under your account.
4. You can now clone, edit, and push changes freely.

---

## ❓ How to configure environment variables using `.env.local`?

**Answer:**

To configure environment variables for a project (e.g., with Supabase):

### Steps:
1. At the **root** of your project folder, create a file called:
   ```
   .env.local
   ```
2. Add your Supabase credentials inside, like so:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

> 🔒 Don't share this file or upload it to GitHub — it contains sensitive information.

---

## ❓ What does this error mean?  
`ERROR: 42501: must be owner of table users`

**Answer:**

This error means that your database role **does not have permission** to change the `users` table — you're **not the owner** of it.

### Why?
- In Supabase, the `auth.users` table is managed internally.
- Only the system (or owner) can alter it.

### Fix:
- **Do not run:** `alter table auth.users ...`
- You can safely remove or comment out that line from your SQL.

---

## ❓ What does this instruction mean:  
**"Create a new project. Save your Supabase URL and Anon Key from the Project Settings → API section."**

**Answer:**

This means:

1. **Create a new Supabase project:**
   - Go to [https://supabase.com](https://supabase.com)
   - Sign in → Click “New Project”
   - Set a name, password, and region

2. **Find and save:**
   - Go to `Project Settings → API`
   - Copy:
     - **Project URL**
     - **Anon Key**

These are used to connect your frontend app to Supabase securely.

---

## ❓ What does "Implement the Ranking Page at /ranking" mean?

**Answer:**

This means:

- You should create a webpage or route available at `/ranking`
- It should display **ranked content**, such as:
  - Top users
  - Most liked blogs
  - Highest scores, etc.

> In a Next.js or React app, this means creating a file like `pages/ranking.js` or setting up a route handler.

---

## ❓ What is a "ranking page"?

**Answer:**

A **ranking page** is a webpage that shows a **list of items ordered by score, popularity, or performance**.

### Examples:
- Google Search Results (ranked by relevance)
- Game leaderboard (top scorers)
- Blog with most liked articles
- University rankings

---