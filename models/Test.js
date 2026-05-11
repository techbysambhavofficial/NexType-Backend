const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  wpm: {
    type: Number,
    required: true
  },
  accuracy: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  correctChars: {
    type: Number,
    required: true
  },
  mistakes: {
    type: Number,
    required: true
  },
  duration: {
    type: Number, // in seconds
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard', 'expert', 'custom'],
    default: 'medium'
  },
  testType: {
    type: String,
    enum: ['paragraph', 'words', 'code', 'exercise'],
    default: 'paragraph'
  },
  text: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for efficient queries
testSchema.index({ user: 1, createdAt: -1 });
testSchema.index({ wpm: -1 });
testSchema.index({ accuracy: -1 });
testSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Test', testSchema);