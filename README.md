# Recipe App (Next.js + Tailwind CSS)

## Overview

This is a recipe search application built with:

- **Next.js (App Router)** for SSR and routing
- **Tailwind CSS** for styling
- **Spoonacular API** for fetching recipe data
- **ESLint + Prettier** for code quality

### Features

- Search recipes by query, cuisine, or preparation time
- SSR with caching (1 min revalidation)
- Recipe detail page with ingredients, image, summary
- Responsive and accessible UI with Tailwind CSS

---

## Run locally

### 1. Install dependencies

bash
npm install

### 2. Add environment variables

Create .env.local:
SPOONACULAR_API_KEY=your_server_api_key

### 3. Start development server

npm run dev

### 4. Build for production

npm run build
npm run start

---

## Architecture

app/
├── page.js // Search page (form)
├── recipes/
│ ├── page.js // Recipe list (SSR fetch + grid)
│ └── [id]/
│ └── page.js // Recipe details (SSR fetch)
├── globals.css // Tailwind global styles
