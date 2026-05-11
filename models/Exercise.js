const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['basic', 'special', 'practice'],
    required: true
  },
  subcategory: {
    type: String,
    enum: ['home_row', 'top_row', 'bottom_row', 'numbers', 'speed', 'programming', 'symbols', 'quotes', 'easy', 'medium', 'hard'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard', 'advanced', 'expert'],
    required: true
  },
  text: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    default: 300
  },
  icon: {
    type: String,
    default: '⌨️'
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for efficient queries
exerciseSchema.index({ category: 1, subcategory: 1, difficulty: 1 });
exerciseSchema.index({ order: 1 });

module.exports = mongoose.model('Exercise', exerciseSchema);