const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const { auth, adminOnly } = require('../middleware/auth');

// Demo data
const demoBlogs = [

];

// GET /api/blog - List all published blogs
router.get('/', async (req, res) => {
  try {
    const { category, tag } = req.query;
    const query = { published: true };
    
    if (category) query.category = category;
    if (tag) query.tags = tag;
    
    const blogs = await Blog.find(query).sort({ createdAt: -1 }).select('-content');
    
    if (blogs.length === 0) {
      return res.json(demoBlogs);
    }
    
    res.json(blogs);
  } catch (error) {
    res.json(demoBlogs);
  }
});

// GET /api/blog/:slug - Get single blog
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { slug: req.params.slug },
      { $inc: { views: 1 } },
      { new: true }
    );
    
    if (!blog) {
      const demoBlog = demoBlogs.find(b => b.slug === req.params.slug);
      if (demoBlog) return res.json(demoBlog);
      return res.status(404).json({ error: 'Blog not found' });
    }
    
    res.json(blog);
  } catch (error) {
    const blog = demoBlogs.find(b => b.slug === req.params.slug);
    if (blog) return res.json(blog);
    res.status(500).json({ error: 'Failed to fetch blog' });
  }
});

// POST /api/blog - Create blog (admin only)
router.post('/', auth, adminOnly, async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /api/blog/:slug - Update blog (admin only)
router.put('/:slug', auth, adminOnly, async (req, res) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { slug: req.params.slug },
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    
    res.json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/blog/:slug - Delete blog (admin only)
router.delete('/:slug', auth, adminOnly, async (req, res) => {
  try {
    const blog = await Blog.findOneAndDelete({ slug: req.params.slug });
    
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete blog' });
  }
});

module.exports = router;