const express = require('express');
const Test = require('../models/Test');
const User = require('../models/User');

const router = express.Router();

// Get global leaderboard
router.get('/', async (req, res) => {
  const { limit = 50, timeframe = 'all', sortBy = 'wpm' } = req.query;
  
  try {
    let dateFilter = {};
    if (timeframe === 'week') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      dateFilter = { createdAt: { $gte: weekAgo } };
    } else if (timeframe === 'month') {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      dateFilter = { createdAt: { $gte: monthAgo } };
    }
    
    let sortCriteria = {};
    if (sortBy === 'wpm') sortCriteria = { bestWPM: -1 };
    else if (sortBy === 'accuracy') sortCriteria = { bestAccuracy: -1 };
    else if (sortBy === 'tests') sortCriteria = { totalTests: -1 };
    
    const leaderboard = await Test.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: '$user',
          bestWPM: { $max: '$wpm' },
          averageWPM: { $avg: '$wpm' },
          bestAccuracy: { $max: '$accuracy' },
          averageAccuracy: { $avg: '$accuracy' },
          totalTests: { $sum: 1 },
          totalCharacters: { $sum: '$correctChars' }
        }
      },
      { $sort: sortCriteria },
      { $limit: parseInt(limit) },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      {
        $project: {
          username: '$user.username',
          avatar: '$user.avatar',
          bestWPM: 1,
          averageWPM: { $round: ['$averageWPM', 0] },
          bestAccuracy: 1,
          averageAccuracy: { $round: ['$averageAccuracy', 0] },
          totalTests: 1,
          totalCharacters: 1
        }
      }
    ]);
    
    res.json(leaderboard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching leaderboard' });
  }
});

// Get user rank
router.get('/rank/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const betterUsers = await Test.aggregate([
      {
        $group: {
          _id: '$user',
          bestWPM: { $max: '$wpm' }
        }
      },
      {
        $match: {
          bestWPM: { $gt: await getBestWPM(userId) }
        }
      },
      { $count: 'count' }
    ]);
    
    const rank = (betterUsers[0]?.count || 0) + 1;
    res.json({ rank });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching rank' });
  }
});

async function getBestWPM(userId) {
  const result = await Test.aggregate([
    { $match: { user: mongoose.Types.ObjectId(userId) } },
    { $group: { _id: null, bestWPM: { $max: '$wpm' } } }
  ]);
  return result[0]?.bestWPM || 0;
}

module.exports = router;