require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';
const MINIMAL_DEBUG_MODE = process.env.MINIMAL_DEBUG_MODE === 'true';

if (MINIMAL_DEBUG_MODE) {
  app.use(cors({ origin: '*' }));
  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('OK ROOT');
  });

  app.get('/api/health', (req, res) => {
    res.json({ status: 'OK HEALTH' });
  });

  app.listen(PORT, HOST, () => {
    console.log(`🚀 Minimal debug mode on port ${PORT}`);
  });
} else {
  const mongoose = require('mongoose');
  const helmet = require('helmet');
  const morgan = require('morgan');

  const projectRoutes = require('./routes/projects');
  const blogRoutes = require('./routes/blog');
  const contactRoutes = require('./routes/contact');
  const analyticsRoutes = require('./routes/analytics');
  const aiRoutes = require('./routes/ai');

  app.use(helmet());
  app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
  }));
  app.use(morgan('dev'));
  app.use(express.json());

  app.use('/api/projects', projectRoutes);
  app.use('/api/blog', blogRoutes);
  app.use('/api/contact', contactRoutes);
  app.use('/api/analytics', analyticsRoutes);
  app.use('/api/ai', aiRoutes);

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.get('/', (req, res) => {
    res.send('Backend is running ✅');
  });

  app.use((err, req, res, next) => {
    console.error('Error:', err.message);

    if (err.message.includes('API key') || err.message.includes('quota') || err.message.includes('credits')) {
      return res.status(503).json({
        error: 'API credits exhausted. Please try again later.'
      });
    }

    res.status(500).json({
      error: 'Something went wrong. Please try again later.'
    });
  });

  const connectDB = async () => {
    try {
      if (process.env.MONGODB_URI) {
        await mongoose.connect(process.env.MONGODB_URI, {
          serverSelectionTimeoutMS: 10000,
        });
        console.log('✅ MongoDB connected');
      } else {
        console.log('⚠️ MongoDB URI not configured - running in demo mode');
      }
    } catch (error) {
      console.error('⚠️ MongoDB connection failed - running in demo mode');
      console.error('MongoDB error details:', error.message);
    }
  };

  app.listen(PORT, HOST, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    connectDB();
  });
}

module.exports = app;