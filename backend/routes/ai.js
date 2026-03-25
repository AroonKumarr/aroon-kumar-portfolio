const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini - handle missing API key gracefully
let genAI = null;
let model = null;

const initGemini = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.log('⚠️ GEMINI_API_KEY not set - AI features will show demo responses');
    return false;
  }
  
  try {
    genAI = new GoogleGenerativeAI(apiKey);
    model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    console.log('✅ Gemini AI initialized');
    return true;
  } catch (error) {
    console.log('⚠️ Failed to initialize Gemini:', error.message);
    return false;
  }
};

// Resume context for the AI
const RESUME_CONTEXT = `
Aroon Kumar is a Full-Stack Developer and AI/ML Engineer with expertise in:

SKILLS:
- Frontend: React, Next.js, Tailwind CSS, Framer Motion
- Backend: Node.js, Express.js, Python
- AI/ML: LangChain, RAG systems, Speech-to-Speech AI, Computer Vision
- Databases: MongoDB, PostgreSQL
- Cloud: AWS, Vercel, Railway
- Other: Docker, Git, REST APIs, WebSocket

PROJECTS:
1. AI Voice Assistant - Speech-to-speech AI for banking queries using Whisper, ElevenLabs, LangChain
2. WhatsApp AI Bot - AI-powered bot for real estate CRM with OpenAI integration
3. Robotics Control System - ROS-based robot control with computer vision

EXPERIENCE:
- Full-Stack Developer with 2+ years experience
- Built AI-powered applications and automation systems
- Worked with WhatsApp Business API, Telegram bots
- Experience in real estate CRM automation

EDUCATION:
- Currently pursuing relevant technical degree

INTERESTS:
- Artificial Intelligence & Machine Learning
- Robotics
- Automation & Bots
- System Design

Contact: aroonkumar@email.com
`;

// POST /api/ai/chat - Chat with resume bot
router.post('/chat', async (req, res) => {
  try {
    const { message, history = [] } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    // Initialize Gemini if not already done
    if (!model) {
      initGemini();
    }
    
    // If Gemini is not available, return demo response
    if (!model) {
      const demoResponses = [
        "I'd be happy to tell you about Aroon! He's a Full-Stack Developer with expertise in AI/ML. He has built projects like an AI Voice Assistant for banking and a WhatsApp AI Bot for real estate CRM.",
        "Aroon has skills in React, Next.js, Node.js, Python, and AI frameworks like LangChain. He's particularly interested in building AI-powered applications!",
        "Based on his experience, Aroon specializes in building full-stack applications with AI integration. His projects include a Speech-to-Speech AI system and various WhatsApp/Telegram bots.",
        "You can contact Aroon at aroonkumar@email.com or through the contact form on his portfolio website."
      ];
      
      const randomResponse = demoResponses[Math.floor(Math.random() * demoResponses.length)];
      
      return res.json({
        response: randomResponse,
        demo: true,
        message: 'AI is in demo mode. Set GEMINI_API_KEY for full functionality.'
      });
    }
    
    // Build conversation context
    const chatHistory = history.map(h => ({
      role: h.role === 'user' ? 'user' : 'model',
      parts: [{ text: h.content }]
    }));
    
    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    });
    
    // Send message with context
    const prompt = `${RESUME_CONTEXT}\n\nUser question: ${message}\n\nPlease answer as if you are explaining about Aroon Kumar's background, skills, and projects. Be helpful and concise.`;
    
    const result = await chat.sendMessage(prompt);
    const response = result.response.text();
    
    res.json({ response, demo: false });
  } catch (error) {
    console.error('AI Chat error:', error.message);
    
    // Check for specific error types
    if (error.message.includes('API key') || error.message.includes('quota') || error.message.includes('credits')) {
      return res.status(503).json({
        error: 'API credits exhausted. Please try again later.'
      });
    }
    
    // Return demo response on any error
    res.json({
      response: "I'm currently running in demo mode. For full AI functionality, please configure the GEMINI_API_KEY in the backend environment variables.",
      demo: true
    });
  }
});

// GET /api/ai/status - Check AI status
router.get('/status', (req, res) => {
  const hasApiKey = !!process.env.GEMINI_API_KEY;
  
  res.json({
    status: hasApiKey ? 'ready' : 'demo',
    message: hasApiKey 
      ? 'Gemini AI is configured and ready' 
      : 'Running in demo mode. Set GEMINI_API_KEY for full AI features.'
  });
});

module.exports = router;