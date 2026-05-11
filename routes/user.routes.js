const express = require('express');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Update user settings
router.put('/settings', protect, async (req, res) => {
  const { settings } = req.body;
  
  try {
    req.user.settings = { ...req.user.settings, ...settings };
    await req.user.save();
    res.json({ settings: req.user.settings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating settings' });
  }
});

// Update user profile
router.put('/profile', protect, async (req, res) => {
  const { username, avatar } = req.body;
  
  try {
    if (username) {
      const existingUser = await User.findOne({ username, _id: { $ne: req.user._id } });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already taken' });
      }
      req.user.username = username;
    }
    if (avatar) req.user.avatar = avatar;
    
    await req.user.save();
    res.json({ username: req.user.username, avatar: req.user.avatar });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating profile' });
  }
});

// Get user achievements
router.get('/achievements', protect, async (req, res) => {
  const achievementsList = {
    first_test: { name: 'First Step', description: 'Complete your first typing test', icon: '🎯', requirement: 'Complete 1 test' },
    speed_30: { name: 'Getting There', description: 'Achieve 30 WPM', icon: '⚡', requirement: 'Reach 30 WPM' },
    speed_60: { name: 'Speed Demon', description: 'Achieve 60 WPM', icon: '🚀', requirement: 'Reach 60 WPM' },
    speed_100: { name: 'Elite Typist', description: 'Achieve 100 WPM', icon: '🏆', requirement: 'Reach 100 WPM' },
    accuracy_95: { name: 'Precision Master', description: 'Achieve 95% accuracy', icon: '🎯', requirement: '95% accuracy' },
    accuracy_100: { name: 'Perfect', description: 'Achieve 100% accuracy', icon: '⭐', requirement: 'Perfect accuracy' },
    marathon_10: { name: 'Consistent', description: 'Complete 10 tests', icon: '📊', requirement: '10 tests completed' },
    marathon_50: { name: 'Dedicated', description: 'Complete 50 tests', icon: '🔥', requirement: '50 tests completed' },
    marathon_100: { name: 'Typing Legend', description: 'Complete 100 tests', icon: '👑', requirement: '100 tests completed' },
    perfect_game: { name: 'Flawless Victory', description: 'Complete a test with zero mistakes', icon: '💯', requirement: 'No mistakes in a test' },
    code_master: { name: 'Code Warrior', description: 'Complete 10 code typing tests', icon: '💻', requirement: '10 code tests' },
    legendary: { name: 'Legendary', description: 'Achieve 150+ WPM', icon: '🌟', requirement: 'Reach 150 WPM' }
  };
  
  const unlockedAchievements = req.user.achievements || [];
  const achievements = Object.entries(achievementsList).map(([id, data]) => ({
    id,
    ...data,
    unlocked: unlockedAchievements.includes(id),
    unlockedAt: null // You can add timestamp when achieved
  }));
  
  res.json(achievements);
});

module.exports = router;