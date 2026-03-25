const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Contact = require('../models/Contact');
const { auth, adminOnly } = require('../middleware/auth');

// POST /api/contact - Submit contact form (public)
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    // Fail fast if MongoDB is not connected instead of waiting for buffered timeouts.
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        error: 'Database is unavailable. Please try again in a moment.'
      });
    }
    
    const contact = new Contact({
      name,
      email,
      subject,
      message,
      ip: req.ip,
      userAgent: req.headers['user-agent']
    });

    try {
      await contact.save();
    } catch (dbError) {
      console.error('Contact form DB save failed:', dbError.message);
      return res.status(503).json({
        error: 'Database is unavailable. Please try again in a moment.'
      });
    }
    
    res.status(201).json({ 
      message: 'Thank you for your message! I will get back to you soon.' 
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
});

// GET /api/contact - List all contacts (admin only)
router.get('/', auth, adminOnly, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// PUT /api/contact/:id - Update contact status (admin only)
router.put('/:id', auth, adminOnly, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update contact' });
  }
});

module.exports = router;