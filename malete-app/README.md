# Malete Waitlist

Waitlist landing page for verified student accommodation around Kwara State
University (KWASU), starting in Malete.

## Stack

Next.js 14, TypeScript, Tailwind CSS (App Router).

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Deploy on Vercel

1. Push this project to a GitHub repo (see below).
2. Go to vercel.com, click "Add New Project", and import the repo.
3. Vercel auto-detects Next.js. Leave the default build settings and click Deploy.

## Push to GitHub

From a computer:

```bash
git init
git add .
git commit -m "Initial commit: Malete waitlist"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

From an iPhone (no terminal): create a new repository on github.com in Safari or
the GitHub app, then use "Add file > Upload files" and drag in this whole folder.
GitHub's mobile web uploader supports multi-file drag-and-drop from the Files app.

## Next steps

- The waitlist form currently just shows a success state in the browser
  (see `handleSubmit` in `app/page.tsx`). Wire it to a Supabase table
  (e.g. `waitlist_entries`) to actually collect sign-ups.
- The "Where in Malete would you like to stay?" field is free text. Swap it
  for a `<select>` once you have a verified list of areas.
