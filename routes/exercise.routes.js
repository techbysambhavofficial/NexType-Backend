const express = require('express');
const Exercise = require('../models/Exercise');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Get all exercises
router.get('/', protect, async (req, res) => {
  try {
    const exercises = await Exercise.find({ isActive: true }).sort('order');
    console.log(`Fetched ${exercises.length} exercises`); // Debug log
    res.json(exercises);
  } catch (error) {
    console.error('Error fetching exercises:', error);
    res.status(500).json({ message: 'Error fetching exercises', error: error.message });
  }
});

// Get single exercise by ID
router.get('/:id', protect, async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }
    res.json(exercise);
  } catch (error) {
    console.error('Error fetching exercise:', error);
    res.status(500).json({ message: 'Error fetching exercise' });
  }
});

module.exports = router;