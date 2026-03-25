# Aroon Kumar Portfolio

A full-stack personal portfolio website showcasing AI/ML projects, tech blog, and more.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free tier)
- Gemini API key (optional, for AI chatbot)

### Backend Setup

```bash
cd backend

# Copy environment file
cp .env.example .env

# Edit .env with your credentials:
# - MONGODB_URI: Your MongoDB Atlas connection string
# - GEMINI_API_KEY: Your Gemini API key
# - JWT_SECRET: A secure random string

# Install dependencies
npm install

# Run development server
npm run dev
```

Backend runs on: http://localhost:5000

### Frontend Setup

```bash
cd frontend

# Copy environment file
cp .env.example .env.local

# Edit .env.local:
# - NEXT_PUBLIC_API_URL: http://localhost:5000/api (or production URL)

# Install dependencies
npm install

# Run development server
npm run dev
```

Frontend runs on: http://localhost:3000

## 📁 Project Structure

```
portfolio/
├── SPEC.md                 # Full project specification
├── backend/
│   ├── server.js          # Express server entry
│   ├── models/            # MongoDB schemas
│   │   ├── Project.js
│   │   ├── Blog.js
│   │   ├── Contact.js
│   │   ├── Analytics.js
│   │   └── User.js
│   ├── routes/            # API routes
│   │   ├── projects.js
│   │   ├── blog.js
│   │   ├── contact.js
│   │   ├── analytics.js
│   │   └── ai.js
│   ├── middleware/
│   │   └── auth.js        # JWT authentication
│   └── .env.example       # Environment template
│
└── frontend/
    ├── src/
    │   ├── app/           # Next.js app router pages
    │   │   ├── page.tsx          # Home
    │   │   ├── projects/        # Projects pages
    │   │   ├── blog/            # Blog pages
    │   │   ├── about/           # About page
    │   │   ├── contact/         # Contact page
    │   │   └── admin/           # Admin panel
    │   ├── components/    # React components
    │   │   ├── Navbar.tsx
    │   │   ├── ThemeProvider.tsx
    │   │   ├── AIChat.tsx
    │   │   └── ApiStatus.tsx
    │   ├── lib/           # Utilities
    │   │   └── api.ts     # API client
    │   └── types/         # TypeScript types
    └── .env.example       # Environment template
```

## 🔧 Features

### Implemented
- ✅ Dark/Light theme toggle
- ✅ Projects showcase with detail pages
- ✅ Tech blog with markdown support
- ✅ AI Chatbot ("Ask My Resume")
- ✅ Contact form
- ✅ Visitor analytics (admin)
- ✅ Admin panel for content management
- ✅ Error handling for backend/API issues
- ✅ Demo mode when database not available

### Error Handling
The site gracefully handles:
- **Backend offline:** Shows "Backend is currently not running" message
- **API credits exhausted:** Shows "API credits exhausted" message
- **MongoDB unavailable:** Works in demo mode with sample data

## 📝 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | List all projects |
| GET | `/api/projects/:slug` | Get project details |
| GET | `/api/blog` | List published blogs |
| GET | `/api/blog/:slug` | Get blog post |
| POST | `/api/contact` | Submit contact form |
| POST | `/api/analytics/track` | Track page view |
| POST | `/api/ai/chat` | Chat with AI |

## 🌍 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Connect repo to Vercel
3. Set environment variables
4. Deploy!

### Backend (Railway/Render)
1. Push code to GitHub
2. Connect repo to Railway
3. Set environment variables:
   - `MONGODB_URI`
   - `GEMINI_API_KEY`
   - `JWT_SECRET`
   - `CORS_ORIGIN` (your frontend URL)
4. Deploy!

## 📄 License

MIT