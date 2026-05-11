const mongoose = require('mongoose');
require('dotenv').config();

// Schema
const exerciseSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  subcategory: String,
  difficulty: String,
  text: String,
  duration: Number,        // seconds
  icon: String,
  order: Number,
  isActive: { type: Boolean, default: true }
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

// Helper - High Quality Long Text Generator
function generateLongText(baseText, targetWords = 1650) {
  let fullText = baseText.trim();
  const paragraph = "\n\n" + baseText;

  while (fullText.split(/\s+/).length < targetWords) {
    fullText += paragraph;
  }

  // Final cleanup
  const words = fullText.split(/\s+/);
  return words.slice(0, targetWords).join(" ");
}

// ==================== ALL EXERCISES ====================
const exercises = [

  // ===================== BASIC =====================
  {
    name: 'Home Row Mastery',
    description: 'Complete home row practice with extended text',
    category: 'basic',
    subcategory: 'home_row',
    difficulty: 'easy',
    text: generateLongText(`asdf jkl; asdf jkl; fdsa ;lkj fdsa ;lkj asdf fdsa jkl; ;lkj 
    The home row is the most important foundation of touch typing. Keep your fingers gently resting on a s d f and j k l ; without looking at the keyboard. 
    Good posture, relaxed wrists, and steady rhythm are key to becoming a fast typist. Practice daily to develop strong muscle memory.`, 1700),
    duration: 480,
    icon: '🏠',
    order: 1
  },
  {
    name: 'Home Row - Words & Sentences',
    description: 'Real words and sentences using only home row keys',
    category: 'basic',
    subcategory: 'home_row',
    difficulty: 'easy',
    text: generateLongText(`a sad dad had a glass flask all jazz lads ask for salad a flash flask falls the sad lad laughs`, 1650),
    duration: 480,
    icon: '🏠',
    order: 2
  },

  // Top Row, Bottom Row, Numbers (same pattern - abbreviated here for response)
  {
    name: 'Top Row Mastery - QWERTYUIOP',
    description: 'Full top row practice with words and sentences',
    category: 'basic',
    subcategory: 'top_row',
    difficulty: 'easy',
    text: generateLongText(`qwertyuiop poiuytrewq the quick brown fox jumps over the lazy dog quite quiet quote type pretty poetry`, 1680),
    duration: 480,
    icon: '⬆️',
    order: 3
  },
  {
    name: 'Bottom Row Mastery - ZXCVBNM',
    description: 'Complete bottom row practice',
    category: 'basic',
    subcategory: 'bottom_row',
    difficulty: 'easy',
    text: generateLongText(`zxcvbnm mnbvcxz zoo box cab zebra very nice van zoom max man black box`, 1650),
    duration: 480,
    icon: '⬇️',
    order: 4
  },
  {
    name: 'Numbers & Symbols Row',
    description: 'Master 1234567890 and basic symbols',
    category: 'basic',
    subcategory: 'numbers',
    difficulty: 'medium',
    text: generateLongText(`1234567890 0987654321 1357924680 phone number 9876543210 date 15032025 amount 2450.75`, 1700),
    duration: 500,
    icon: '🔢',
    order: 5
  },

  // ===================== SPECIAL =====================
  {
    name: 'Speed Builder - Pangrams',
    description: 'High speed practice with all letters',
    category: 'special',
    subcategory: 'speed',
    difficulty: 'hard',
    text: generateLongText(`the quick brown fox jumps over the lazy dog pack my box with five dozen liquor jugs`, 1720),
    duration: 420,
    icon: '⚡',
    order: 6
  },
  {
    name: 'Professional Phrases',
    description: 'Common business and email phrases',
    category: 'special',
    subcategory: 'speed',
    difficulty: 'hard',
    text: generateLongText(`Thank you for your email. Please find the attached document. I would appreciate your feedback at the earliest convenience.`, 1680),
    duration: 500,
    icon: '⚡',
    order: 7
  },
  {
    name: 'Programming Practice - JavaScript',
    description: 'Real coding syntax and patterns',
    category: 'special',
    subcategory: 'programming',
    difficulty: 'advanced',
    text: generateLongText(`function calculateTotal(price, qty) { return Math.round(price * qty * 100) / 100; } const user = { name: "Raj", city: "Patna" };`, 1650),
    duration: 550,
    icon: '💻',
    order: 8
  },
  {
    name: 'Advanced Symbols & Punctuation',
    description: 'Master all symbols used in professional typing',
    category: 'special',
    subcategory: 'symbols',
    difficulty: 'hard',
    text: generateLongText(`! @ # $ % ^ & * () [] {} <> " ' : ; , . ? / | \\ - _ = + ~ \` ₹ ₹₹ 50% 75% (India)`, 1600),
    duration: 480,
    icon: '✨',
    order: 9
  },

  // ===================== PRACTICE SECTIONS =====================
  ...Array(8).fill(null).map((_, i) => ({
    name: `Easy Practice Session ${i + 1}`,
    description: `Foundational typing practice with guided text`,
    category: 'practice',
    subcategory: 'easy',
    difficulty: 'easy',
    text: generateLongText(`This is easy practice session ${i + 1}. Focus on accuracy and correct finger placement. Keep your eyes on the screen and build confidence in touch typing. Regular practice will dramatically improve your speed.`, 1720),
    duration: 500,
    icon: '📝',
    order: 20 + i
  })),

  ...Array(10).fill(null).map((_, i) => ({
    name: `Medium Practice Session ${i + 1}`,
    description: `Intermediate level with complex sentences`,
    category: 'practice',
    subcategory: 'medium',
    difficulty: 'medium',
    text: generateLongText(`Welcome to medium practice session ${i + 1}. This contains longer paragraphs, varied vocabulary, and natural English flow to improve your rhythm and speed.`, 1700),
    duration: 600,
    icon: '📝',
    order: 30 + i
  })),

  ...Array(10).fill(null).map((_, i) => ({
    name: `Hard Practice Session ${i + 1}`,
    description: `Advanced typing challenge for high speed`,
    category: 'practice',
    subcategory: 'hard',
    difficulty: 'hard',
    text: generateLongText(`Advanced practice session ${i + 1}. This exercise contains technical content, long complex sentences, and professional terminology to prepare you for real world typing jobs like data entry, transcription, and content writing.`, 1750),
    duration: 720, // 12 minutes
    icon: '🎯',
    order: 50 + i
  }))
];

// Seeding Function
async function seedExercises() {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nextype';
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB');

    await Exercise.deleteMany({});
    console.log('🗑️ Old exercises cleared');

    const result = await Exercise.insertMany(exercises);
    console.log(`✅ Successfully seeded ${result.length} high-quality exercises`);

    console.log(`\n📊 Total Exercises: ${result.length}`);
    console.log(`   • Basic: 5`);
    console.log(`   • Special: 4`);
    console.log(`   • Easy Practice: 8`);
    console.log(`   • Medium Practice: 10`);
    console.log(`   • Hard Practice: 10`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Error:', error);
    process.exit(1);
  }
}

seedExercises();