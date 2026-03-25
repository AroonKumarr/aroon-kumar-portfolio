export interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  thumbnail?: string;
  images?: string[];
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  architecture?: {
    diagram?: string;
    problemsSolved?: string[];
    scalability?: string;
    aiModelsUsed?: string[];
  };
  order?: number;
  views: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  category?: string;
  tags?: string[];
  author?: string;
  featured?: boolean;
  published: boolean;
  views: number;
  readTime: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Contact {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: string;
}

export interface AnalyticsData {
  totalViews: number;
  daily: {
    _id: string;
    totalViews: number;
    pages: { page: string; views: number }[];
  }[];
  topPages: { _id: string; views: number }[];
  countries: { _id: string; views: number }[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ApiError {
  message: string;
  backendDown?: boolean;
  apiCreditsOver?: boolean;
}