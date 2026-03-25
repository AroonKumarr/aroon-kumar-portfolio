# Portfolio Website Specification

## Project Overview
- **Name:** Aroon Kumar Portfolio
- **Type:** Full-stack personal portfolio website
- **Core Functionality:** Showcase AI/Robotics projects, blog, with admin panel and AI chatbot
- **Target Users:** Recruiters, tech hiring managers, potential clients

## Tech Stack

### Frontend
- Next.js 14 (App Router)
- Tailwind CSS
- Framer Motion (animations)
- TypeScript

### Backend
- Node.js + Express.js
- MongoDB (Atlas)
- Gemini API for AI features

## Pages Structure

1. **Home** (`/`) - Hero, intro, social links, resume download
2. **Projects** (`/projects`) - Project cards grid
3. **Project Details** (`/projects/[slug]`) - Full project page with architecture
4. **Blog** (`/blog`) - Tech articles list
5. **Blog Post** (`/blog/[slug]`) - Individual article
6. **About** (`/about`) - About me, skills, experience
7. **Contact** (`/contact`) - Contact form
8. **Admin** (`/admin`) - Dashboard for content management

## Core Features

### 1. Hero Section
- Animated typing intro
- AI/Robotics focus showcase
- Resume download button
- Social links (GitHub, LinkedIn, Twitter)

### 2. Projects Section
- Dynamic project cards with:
  - Thumbnail image
  - Tech stack badges
  - GitHub & Live Demo buttons
  - Architecture button → opens detail page
- Project detail page with:
  - System design diagram
  - Problems solved
  - Scalability notes
  - AI models used

### 3. Tech Blog (CMS)
- Admin can add/edit/delete articles
- Markdown support for content
- Categories & tags

### 4. Admin Panel
- Protected route (auth middleware)
- CRUD for: Projects, Blogs, Skills, Experience
- Visitor analytics view

### 5. Visitor Analytics
- Custom tracking (no GA for privacy)
- Dashboard with:
  - Visitors per day
  - Country breakdown
  - Most viewed projects

### 6. AI Chatbot ("Ask My Resume")
- Uses Gemini API
- Answers questions about your experience
- Vector context from resume/data

### 7. Smart Contact Form
- Saves to MongoDB
- Admin dashboard shows inquiries
- Auto-reply option

## Additional Features
- 🌙 Dark/Light mode (system preference + toggle)
- 🌍 Multi-language support (English default, extensible)
- 📱 PWA support
- 🎥 Intro video popup (optional)

## Error Handling
- Backend offline: Display "Backend is currently not running. Please try again later."
- API credits over: Display "API credits exhausted. Please try again later."
- Graceful degradation for all features

## Design
- Minimal, Apple-inspired simplicity
- Dark mode by default
- Accent color: Cyan/Teal (#06b6d4)
- Smooth animations via Framer Motion

## API Endpoints

### Projects
- `GET /api/projects` - List all
- `GET /api/projects/:slug` - Get one
- `POST /api/projects` - Create (admin)
- `PUT /api/projects/:slug` - Update (admin)
- `DELETE /api/projects/:slug` - Delete (admin)

### Blog
- `GET /api/blog` - List all
- `GET /api/blog/:slug` - Get one
- `POST /api/blog` - Create (admin)
- `PUT /api/blog/:slug` - Update (admin)
- `DELETE /api/blog/:slug` - Delete (admin)

### Contact
- `POST /api/contact` - Submit form
- `GET /api/contact` - List (admin)

### Analytics
- `POST /api/analytics/track` - Track visit
- `GET /api/analytics` - Get stats (admin)

### AI Chat
- `POST /api/ai/chat` - Chat with resume bot

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_GEMINI_API_KEY=your_key_here
```

### Backend (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_uri
GEMINI_API_KEY=your_key_here
JWT_SECRET=your_jwt_secret
CORS_ORIGIN=http://localhost:3000
```

## Deployment
- Frontend: Vercel
- Backend: Railway/Render
- MongoDB: Atlas (free tier)