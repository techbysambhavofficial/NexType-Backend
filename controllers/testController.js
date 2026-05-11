const Test = require('../models/Test');

// @desc    Submit test result
// @route   POST /api/tests/submit
// @access  Private
exports.submitTest = async (req, res) => {
  const { wpm, accuracy, correctChars, mistakes, duration, difficulty, testType, text } = req.body;
  
  try {
    const test = await Test.create({
      user: req.user._id,
      wpm,
      accuracy,
      correctChars,
      mistakes,
      duration,
      difficulty,
      testType,
      text
    });
    
    await req.user.updateStats(test);
    const newAchievements = await checkAndAwardAchievements(req.user, test);
    
    res.status(201).json({ 
      test, 
      achievements: newAchievements,
      message: 'Test saved successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving test result', error: error.message });
  }
};

// @desc    Get user's test history
// @route   GET /api/tests/history
// @access  Private
exports.getHistory = async (req, res) => {
  const { limit = 20, offset = 0 } = req.query;
  
  try {
    const tests = await Test.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(offset));
    
    const total = await Test.countDocuments({ user: req.user._id });
    
    res.json({ 
      tests, 
      total, 
      hasMore: total > offset + limit 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching history' });
  }
};

// @desc    Get user statistics
// @route   GET /api/tests/statistics
// @access  Private
exports.getStatistics = async (req, res) => {
  try {
    const tests = await Test.find({ user: req.user._id }).sort({ createdAt: 1 });
    
    const wpmData = tests.map(t => ({ 
      date: t.createdAt, 
      wpm: t.wpm,
      accuracy: t.accuracy
    }));
    
    const weeklyData = calculateWeeklyData(tests);
    
    res.json({
      totalTests: tests.length,
      wpmData,
      weeklyData,
      bestWPM: req.user.stats.bestWPM,
      averageWPM: req.user.stats.averageWPM,
      bestAccuracy: req.user.stats.bestAccuracy,
      averageAccuracy: req.user.stats.averageAccuracy,
      totalCharacters: req.user.stats.totalCharacters,
      totalTime: req.user.stats.totalTime
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching statistics' });
  }
};

// Helper functions
async function checkAndAwardAchievements(user, test) {
  const newAchievements = [];
  const currentAchievements = user.achievements || [];
  
  if (user.stats.totalTests === 1 && !currentAchievements.includes('first_test')) {
    newAchievements.push('first_test');
  }
  
  if (test.wpm >= 30 && !currentAchievements.includes('speed_30')) {
    newAchievements.push('speed_30');
  }
  if (test.wpm >= 60 && !currentAchievements.includes('speed_60')) {
    newAchievements.push('speed_60');
  }
  if (test.wpm >= 100 && !currentAchievements.includes('speed_100')) {
    newAchievements.push('speed_100');
  }
  
  if (test.accuracy >= 95 && !currentAchievements.includes('accuracy_95')) {
    newAchievements.push('accuracy_95');
  }
  if (test.accuracy === 100 && !currentAchievements.includes('accuracy_100')) {
    newAchievements.push('accuracy_100');
  }
  
  if (test.mistakes === 0 && !currentAchievements.includes('perfect_game')) {
    newAchievements.push('perfect_game');
  }
  
  if (user.stats.totalTests >= 10 && !currentAchievements.includes('marathon_10')) {
    newAchievements.push('marathon_10');
  }
  if (user.stats.totalTests >= 50 && !currentAchievements.includes('marathon_50')) {
    newAchievements.push('marathon_50');
  }
  if (user.stats.totalTests >= 100 && !currentAchievements.includes('marathon_100')) {
    newAchievements.push('marathon_100');
  }
  
  if (test.testType === 'code' && !currentAchievements.includes('code_master')) {
    const codeTests = await Test.countDocuments({ 
      user: user._id, 
      testType: 'code' 
    });
    if (codeTests >= 10) {
      newAchievements.push('code_master');
    }
  }
  
  if (user.stats.bestWPM >= 150 && !currentAchievements.includes('legendary')) {
    newAchievements.push('legendary');
  }
  
  if (newAchievements.length > 0) {
    user.achievements = [...currentAchievements, ...newAchievements];
    await user.save();
  }
  
  return newAchievements;
}

function calculateWeeklyData(tests) {
  const weekly = {};
  tests.forEach(test => {
    const week = getWeekNumber(test.createdAt);
    if (!weekly[week]) {
      weekly[week] = { tests: 0, totalWPM: 0, totalAccuracy: 0 };
    }
    weekly[week].tests++;
    weekly[week].totalWPM += test.wpm;
    weekly[week].totalAccuracy += test.accuracy;
  });
  
  return Object.entries(weekly).map(([week, data]) => ({
    week,
    averageWPM: Math.round(data.totalWPM / data.tests),
    averageAccuracy: Math.round(data.totalAccuracy / data.tests),
    testCount: data.tests
  }));
}

function getWeekNumber(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
  const week1 = new Date(d.getFullYear(), 0, 4);
  return 1 + Math.round(((d - week1) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}