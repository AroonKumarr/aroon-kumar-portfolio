const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true }, // Markdown content
  coverImage: { type: String },
  category: { type: String },
  tags: [{ type: String }],
  author: { type: String, default: 'Aroon Kumar' },
  featured: { type: Boolean, default: false },
  published: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  readTime: { type: Number, default: 5 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blog', blogSchema);