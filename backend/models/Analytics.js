const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  page: { type: String, required: true },
  country: { type: String },
  device: { type: String },
  referrer: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// Index for efficient queries
analyticsSchema.index({ date: -1, page: 1 });

module.exports = mongoose.model('Analytics', analyticsSchema);