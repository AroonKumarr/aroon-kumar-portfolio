import { Project } from '@/types';

export const localProjects: Project[] = [
  {
    _id: 'local-aqi-mlops',
    title: 'AQI Predictor Islamabad',
    slug: 'air-quality-ml-mlops',
    description:
      'End-to-end air quality prediction system with automated ML pipelines, SHAP explainability, and Streamlit dashboard.',
    longDescription:
      'A production-style MLOps system for AQI forecasting with scheduled data ingestion, feature engineering pipelines, model retraining orchestration, and explainability workflows for transparent forecasts.',
    thumbnail: '/project-covers/aqi-mlops.svg',
    images: [
      '/project-covers/aqi-mlops.svg',
      '/project-covers/aqi-mlops-architecture.svg',
      '/project-covers/aqi-mlops-workflow.svg',
    ],
    techStack: ['Python', 'Scikit-learn', 'XGBoost', 'SHAP', 'GitHub Actions', 'Streamlit'],
    githubUrl: 'https://github.com/AroonKumarr/air-quality-ml-mlops',
    liveUrl: 'https://air-quality-ml-mlops.streamlit.app/',
    featured: true,
    views: 0,
    architecture: {
      problemsSolved: [
        'Automated feature updates and model retraining pipelines',
        'Forecast insights with SHAP-based explainability',
        'Interactive dashboard for real-time and future AQI trends',
      ],
      scalability: 'Pipeline-friendly design with scheduled retraining and modular ML components.',
      aiModelsUsed: ['XGBoost', 'Random Forest', 'Ridge Regression', 'Neural Network'],
    },
    order: 1,
  },
  {
    _id: 'local-aigilityx',
    title: 'AigilityX AI Platform',
    slug: 'aigilityx-ai-platform',
    description:
      'Full-stack AI/ML platform with RAG, STT/TTS services, agent modules, gateway orchestration, and Supabase integration.',
    longDescription:
      'A full-stack AI platform designed around modular services: RAG retrieval, speech-to-text, LLM reasoning, text-to-speech, and orchestration layers backed by Supabase and a modern frontend.',
    thumbnail: '/project-covers/aigilityx.svg',
    images: [
      '/project-covers/aigilityx.svg',
      '/project-covers/aigilityx-architecture.svg',
      '/project-covers/aigilityx-workflow.svg',
    ],
    techStack: ['RAG', 'STT', 'TTS', 'Agent Orchestration', 'Supabase', 'React', 'Vite'],
    githubUrl: 'https://github.com/AroonKumarr/cyberx',
    liveUrl: 'https://aigilityx.com/',
    featured: true,
    views: 0,
    architecture: {
      problemsSolved: [
        'Agentic workflow with gateway and service modules',
        'Speech pipeline from STT to LLM to TTS output',
        'Supabase-backed full-stack product architecture',
      ],
      scalability: 'Service-based architecture for extensible AI workflows and independent scaling.',
      aiModelsUsed: ['LLM Routing', 'RAG Retrieval', 'Speech Models'],
    },
    order: 2,
  },
  {
    _id: 'local-camouflaged-object-detection',
    title: 'AI Camouflaged Object Detection System',
    slug: 'ai-camouflaged-object-detection',
    description:
      'Deep learning based camouflaged object detection using SINet for complex visual environments.',
    longDescription:
      'A research-driven computer vision implementation based on the CVPR 2020 Camouflaged Object Detection paper. The system uses SINet with RF, PDC, and Search Attention components to detect objects that blend into background scenes.',
    thumbnail: '/project-covers/ai-camouflaged-object-detection.svg',
    images: [
      '/project-covers/ai-camouflaged-object-detection.svg',
      '/project-covers/ai-camouflaged-object-detection-architecture.svg',
      '/project-covers/ai-camouflaged-object-detection-workflow.svg',
    ],
    techStack: ['Computer Vision', 'Deep Learning', 'PyTorch', 'SINet', 'COD10K', 'Model Evaluation'],
    githubUrl: 'https://github.com/AroonKumarr/ai-camouflaged-object-detection',
    featured: false,
    views: 0,
    architecture: {
      problemsSolved: [
        'Detects visually blended objects in highly complex environments',
        'Implements SINet modules for robust contextual and attention-based localization',
        'Provides training, testing, and inference workflows with measurable evaluation metrics',
      ],
      scalability: 'Modular architecture with separate model, data loader, training, and evaluation layers for experiment-friendly iteration.',
      aiModelsUsed: ['SINet', 'ResNet Backbone', 'Attention Modules'],
    },
    order: 3,
  },
  {
    _id: 'local-pcb-quality-inspection',
    title: 'AI PCB Quality Inspection',
    slug: 'ai-pcb-quality-inspection',
    description:
      'End-to-end deep learning system for automated PCB defect detection in industrial quality workflows.',
    longDescription:
      'An applied industrial vision project using transfer learning and multi-label classification to detect six PCB defect types with high reliability. Built for fast inference and AI-assisted quality reporting in manufacturing pipelines.',
    thumbnail: '/project-covers/ai-pcb-quality-inspection.svg',
    images: [
      '/project-covers/ai-pcb-quality-inspection.svg',
      '/project-covers/ai-pcb-quality-inspection-architecture.svg',
      '/project-covers/ai-pcb-quality-inspection-workflow.svg',
    ],
    techStack: ['Computer Vision', 'Deep Learning', 'Transfer Learning', 'ResNet-18', 'Multi-Label Classification', 'Industrial AI'],
    githubUrl: 'https://github.com/AroonKumarr/ai-pcb-quality-inspection',
    featured: false,
    views: 0,
    architecture: {
      problemsSolved: [
        'Automates manual PCB defect inspection with AI-based classification',
        'Delivers strong quality metrics with 91.2% F1-score and fast inference',
        'Supports production-style confidence scoring and quality report generation',
      ],
      scalability: 'Designed for manufacturing pipelines with low-latency inference and stable transfer-learning training setup.',
      aiModelsUsed: ['ResNet-18', 'Transfer Learning', 'Regularized Classifier Head'],
    },
    order: 4,
  },
  {
    _id: 'local-pakistani-bookstore',
    title: 'Pakistani Online Bookstore',
    slug: 'pakistani-online-bookstore',
    description:
      'Production-ready bookstore POC for the Pakistani market with EasyPaisa payment simulation, AI chatbot, and admin panel.',
    longDescription:
      'A full-stack e-commerce project built with Next.js and FastAPI featuring catalog browsing, persistent cart, mock checkout, JWT authentication, role-based admin operations, and mobile-first UX tailored for Pakistani users.',
    thumbnail: '/project-covers/pakistani-online-bookstore.svg',
    images: ['/project-covers/pakistani-online-bookstore.svg'],
    techStack: [
      'Next.js 14',
      'React 18',
      'Tailwind CSS',
      'FastAPI',
      'SQLAlchemy',
      'SQLite',
      'JWT',
      'EasyPaisa Simulation',
    ],
    githubUrl: 'https://github.com/AroonKumarr/pakistani-bookstore',
    liveUrl: 'https://pakistani-bookstore-4xi1.vercel.app/',
    featured: false,
    views: 0,
    architecture: {
      problemsSolved: [
        'Built localized online bookstore UX for Pakistani users and book categories',
        'Implemented persistent cart and complete simulated payment flow',
        'Integrated JWT auth, admin CRUD panel, and order visibility workflows',
      ],
      scalability:
        'Frontend and backend are decoupled for independent deployment (Vercel + Render) and future payment provider upgrades.',
      aiModelsUsed: ['Rule-Based Conversational Assistant'],
    },
    order: 5,
  },
  {
    _id: 'local-itp-frontend',
    title: 'ITP Frontend - Intelligent Tutoring Platform',
    slug: 'itp-frontend-intelligent-tutoring-platform',
    description:
      'Modern AI tutoring frontend for learning sessions, educational content, and real-time interaction with backend agents.',
    longDescription:
      'A scalable Next.js + TypeScript frontend for an Intelligent Tutoring Platform. It provides AI-powered tutoring UX, session-based learning flow, and responsive interface patterns for multi-agent educational systems.',
    thumbnail: '/project-covers/itp-frontend-intelligent-tutoring-platform.svg',
    images: ['/project-covers/itp-frontend-intelligent-tutoring-platform.svg'],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React Hooks', 'Vercel'],
    githubUrl: 'https://github.com/AroonKumarr/ITP_frontend',
    liveUrl: 'https://itp-frontend.vercel.app',
    featured: false,
    views: 0,
    architecture: {
      problemsSolved: [
        'Provides a modern tutoring interface for AI-assisted educational workflows',
        'Enables real-time interaction with backend tutoring agents',
        'Uses scalable app-router architecture for long-term platform growth',
      ],
      scalability:
        'Component-driven Next.js architecture with typed contracts and environment-based API routing for deployment flexibility.',
      aiModelsUsed: ['AI Agent Integrations (Backend-Driven)'],
    },
    order: 6,
  },
  {
    _id: 'local-speech-to-speech-livekit',
    title: 'Speech-to-Speech LiveKit Frontend',
    slug: 'speech-to-speech-livekit-frontend',
    description:
      'Real-time voice AI frontend connected to LiveKit, FastAPI token server, and OpenAI Realtime voice agents.',
    longDescription:
      'A Next.js + TypeScript frontend for low-latency speech interactions. It streams audio via LiveKit, authenticates through a FastAPI token service, and connects to a backend voice agent stack for real-time conversational AI.',
    thumbnail: '/project-covers/speech-to-speech-livekit-frontend.svg',
    images: ['/project-covers/speech-to-speech-livekit-frontend.svg'],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'LiveKit Client SDK', 'FastAPI', 'OpenAI Realtime'],
    githubUrl: 'https://github.com/AroonKumarr/speeh-to-speech-live-kit',
    liveUrl: 'https://speeh-to-speech-live-kit.vercel.app/',
    featured: false,
    views: 0,
    architecture: {
      problemsSolved: [
        'Real-time speech pipeline integration with WebRTC-style streaming',
        'Secure session flow using token-based room authentication',
        'End-to-end connectivity between browser, LiveKit, and voice agent backend',
      ],
      scalability:
        'Decoupled frontend and token server architecture supports independent scaling and multi-room session handling.',
      aiModelsUsed: ['OpenAI Realtime Voice Agent'],
    },
    order: 7,
  },
  {
    _id: 'local-cold-mail-automation',
    title: 'AI Cold Mail Automation',
    slug: 'ai-cold-mail-automation',
    description:
      'LLM-powered automation tool that scrapes jobs, extracts requirements, matches portfolio data, and generates personalized outreach emails.',
    longDescription:
      'An end-to-end automation system that combines job scraping, skill extraction, role matching, and email generation with optional Gmail SMTP sending. Built with Flask backend and web UI for practical workflow execution.',
    thumbnail: '/project-covers/ai-cold-mail-automation.svg',
    images: ['/project-covers/ai-cold-mail-automation.svg'],
    techStack: ['Python', 'Flask', 'LLM', 'OpenAI', 'Groq', 'SMTP', 'Automation'],
    githubUrl: 'https://github.com/AroonKumarr/cold-mail-automation',
    featured: false,
    views: 0,
    architecture: {
      problemsSolved: [
        'Automates repetitive cold outreach and role-personalization steps',
        'Extracts job skills and requirements from unstructured postings',
        'Generates tailored emails and supports direct SMTP sending',
      ],
      scalability:
        'Pipeline-oriented backend with reusable chain and portfolio modules for expanding to multiple lead sources.',
      aiModelsUsed: ['LLM Prompt Chains', 'Role and Skill Extraction'],
    },
    order: 8,
  },
  {
    _id: 'local-celebrity-face-classifier',
    title: 'Celebrity Face Classifier',
    slug: 'celebrity-face-classifier',
    description:
      'Flask + Dropzone.js web app that classifies uploaded celebrity images using OpenCV, wavelet features, and a trained SVM model.',
    longDescription:
      'A practical computer vision classifier with robust face and eye detection, wavelet-based feature extraction, and user-friendly drag-and-drop UI for instant predictions and probability views.',
    thumbnail: '/project-covers/celebrity-face-classifier.svg',
    images: [
      '/project-covers/celebrity-face-classifier.svg',
      '/project-covers/celebrity-face-classifier-architecture.svg',
      '/project-covers/celebrity-face-classifier-workflow.svg',
    ],
    techStack: ['Computer Vision', 'OpenCV', 'PyWavelets', 'Scikit-learn', 'SVM', 'Flask', 'Dropzone.js'],
    githubUrl: 'https://github.com/AroonKumarr/celebrity-face-classifier',
    featured: false,
    views: 0,
    architecture: {
      problemsSolved: [
        'Validates valid facial regions before running classification',
        'Combines visual and frequency-domain features for better discrimination',
        'Provides interactive upload-to-result flow without page refresh',
      ],
      scalability:
        'Modular backend with artifact loading and prediction utilities suitable for extension to more classes.',
      aiModelsUsed: ['SVM Classifier', 'Wavelet Feature Extraction'],
    },
    order: 9,
  },
  {
    _id: 'local-restaurant-name-generator',
    title: 'Restaurant Name Generator',
    slug: 'restaurant-name-generator',
    description:
      'Streamlit + LangChain app that generates creative restaurant names and menu ideas based on cuisine input.',
    longDescription:
      'An LLM application demonstrating prompt-chaining for small business ideation: it generates brand-ready restaurant names and a structured menu list in a simple Streamlit interface.',
    thumbnail: '/project-covers/restaurant-name-generator.svg',
    images: [
      '/project-covers/restaurant-name-generator.svg',
      '/project-covers/restaurant-name-generator-architecture.svg',
      '/project-covers/restaurant-name-generator-workflow.svg',
    ],
    techStack: ['Python', 'Streamlit', 'LangChain', 'OpenAI', 'Prompt Engineering'],
    githubUrl: 'https://github.com/AroonKumarr/RestaurantNameGenerato',
    featured: false,
    views: 0,
    architecture: {
      problemsSolved: [
        'Transforms simple cuisine prompts into actionable brand concepts',
        'Chains naming and menu generation for cohesive outputs',
        'Provides fast interactive UX for idea exploration',
      ],
      scalability:
        'Lightweight architecture that can be extended with templates, memory, and multi-language generation.',
      aiModelsUsed: ['GPT Models', 'LangChain Chains'],
    },
    order: 10,
  },
  {
    _id: 'local-bangalore-home-price-app',
    title: 'Bangalore Home Price Prediction App',
    slug: 'bangalore-home-price-prediction-app',
    description:
      'Machine learning web app that predicts Bangalore home prices with a location-aware linear regression model.',
    longDescription:
      'A full ML workflow project with data preparation, model training, artifact management, and Flask-based prediction UI for real-estate valuation scenarios.',
    thumbnail: '/project-covers/bangalore-home-price-prediction-app.svg',
    images: [
      '/project-covers/bangalore-home-price-prediction-app.svg',
      '/project-covers/bangalore-home-price-prediction-app-architecture.svg',
      '/project-covers/bangalore-home-price-prediction-app-workflow.svg',
    ],
    techStack: ['Machine Learning', 'Linear Regression', 'Python', 'Flask', 'Pandas', 'Scikit-learn'],
    githubUrl: 'https://github.com/AroonKumarr/bangalore-home-price-app',
    featured: false,
    views: 0,
    architecture: {
      problemsSolved: [
        'Estimates property prices using feature-driven regression modeling',
        'Bridges data science pipeline with a deployable web interface',
        'Supports location-informed price predictions for practical use cases',
      ],
      scalability:
        'Clear split between data preparation, model artifacts, and serving layer enables retraining and model upgrades.',
      aiModelsUsed: ['Linear Regression'],
    },
    order: 11,
  },
  {
    _id: 'local-portfolio-website',
    title: 'Portfolio Website',
    slug: 'portfolio-website',
    description:
      'Personal portfolio platform with animated sections, project galleries, blog pages, and responsive contact workflow.',
    longDescription:
      'A full-stack ready portfolio website built with Next.js App Router and TypeScript to present AI projects, blogs, and contact flows with polished motion and mobile-first UX. The platform supports both API-backed and local fallback data to stay resilient during backend downtime.',
    thumbnail: '/project-covers/portfolio-website.svg',
    images: [
      '/project-covers/portfolio-website.svg',
      '/project-covers/portfolio-website-architecture.svg',
      '/project-covers/portfolio-website-workflow.svg',
    ],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Node.js', 'MongoDB'],
    githubUrl: 'https://github.com/AroonKumarr/portfolio',
    featured: true,
    views: 0,
    architecture: {
      problemsSolved: [
        'Presents AI engineering work with visual project storytelling and detail galleries',
        'Maintains usable content experience via local fallback data when APIs are unavailable',
        'Improves visitor conversion with resume download and streamlined contact flow',
      ],
      scalability:
        'Modular App Router structure with reusable UI sections and API abstraction supports rapid feature updates and independent backend scaling.',
      aiModelsUsed: ['AI Chat Assistant Integration'],
    },
    order: 12,
  },
];

export const getLocalProjectBySlug = (slug: string) =>
  localProjects.find((project) => project.slug === slug);
