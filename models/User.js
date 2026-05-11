const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [20, 'Username cannot exceed 20 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  avatar: {
    type: String,
    default: ''
  },
  stats: {
    totalTests: { type: Number, default: 0 },
    totalCharacters: { type: Number, default: 0 },
    totalTime: { type: Number, default: 0 }, // in seconds
    bestWPM: { type: Number, default: 0 },
    bestAccuracy: { type: Number, default: 0 },
    averageWPM: { type: Number, default: 0 },
    averageAccuracy: { type: Number, default: 0 }
  },
  achievements: [{
    type: String,
    enum: ['first_test', 'speed_30', 'speed_60', 'speed_100', 'accuracy_95', 'accuracy_100', 'marathon_10', 'marathon_50', 'marathon_100', 'perfect_game', 'code_master', 'legendary']
  }],
  settings: {
    soundEnabled: { type: Boolean, default: true },
    theme: { type: String, default: 'dark', enum: ['light', 'dark', 'neon', 'retro'] },
    difficulty: { type: String, default: 'medium', enum: ['easy', 'medium', 'hard', 'expert'] },
    testDuration: { type: Number, default: 60 } // in seconds
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastActive: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Update stats method
userSchema.methods.updateStats = async function(testResult) {
  this.stats.totalTests++;
  this.stats.totalCharacters += testResult.correctChars;
  this.stats.totalTime += testResult.duration;
  
  if (testResult.wpm > this.stats.bestWPM) {
    this.stats.bestWPM = testResult.wpm;
  }
  
  if (testResult.accuracy > this.stats.bestAccuracy) {
    this.stats.bestAccuracy = testResult.accuracy;
  }
  
  // Update averages
  const newTotalWPM = (this.stats.averageWPM * (this.stats.totalTests - 1) + testResult.wpm) / this.stats.totalTests;
  const newTotalAccuracy = (this.stats.averageAccuracy * (this.stats.totalTests - 1) + testResult.accuracy) / this.stats.totalTests;
  
  this.stats.averageWPM = Math.round(newTotalWPM);
  this.stats.averageAccuracy = Math.round(newTotalAccuracy);
  
  await this.save();
};

module.exports = mongoose.model('User', userSchema);