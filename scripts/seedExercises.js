const mongoose = require('mongoose');
const Exercise = require('../models/Exercise');
require('dotenv').config();

const exercises = {
  // ==================== BASIC SECTION ====================
  basic: [
    // Home Row Exercises
    {
      name: 'Home Row - Basic Pattern 1',
      description: 'Master the home row keys with extended practice',
      category: 'basic',
      subcategory: 'home_row',
      difficulty: 'easy',
      text: `asdf jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl; 
asdf jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl;
fdsa ;lkj fdsa ;lkj fdsa ;lkj fdsa ;lkj fdsa ;lkj fdsa ;lkj fdsa ;lkj fdsa ;lkj fdsa ;lkj fdsa ;lkj
asdf fdsa jkl; ;lkj asdf jkl; fdsa ;lkj asdf fdsa jkl; ;lkj asdf jkl; fdsa ;lkj asdf fdsa jkl; ;lkj
The home row keys are the foundation of touch typing. Place your left fingers on A S D F and right fingers on J K L semicolon. Practice moving between these keys smoothly without looking at the keyboard. Focus on maintaining proper finger placement and developing muscle memory.`,
      duration: 300,
      icon: '🏠',
      order: 1
    },
    {
      name: 'Home Row - Common Words',
      description: 'Practice real words using home row keys',
      category: 'basic',
      subcategory: 'home_row',
      difficulty: 'easy',
      text: `a sad dad fall ask lad glass flask glad salad sass jazz all add gas has had half ask fall salad glass flask jazz 
a sad dad asked a lass for a glass of salad jazz. a flash flask falls and a glass lad laughs. 
all a sad dad had a flash flask and a glass of salad. the jazz lad asks for a half glass of salad.
The sad dad had a flash flask full of salad jazz. A glass lad asked for a half glass of salad. 
All the jazz lads add gas to the flask. A flash glass flask falls and a sad dad laughs loudly.`,
      duration: 300,
      icon: '🏠',
      order: 2
    },
    {
      name: 'Home Row - Sentences',
      description: 'Complex sentences with home row focus',
      category: 'basic',
      subcategory: 'home_row',
      difficulty: 'medium',
      text: `A sad lad asks a sad dad for a glass of salad jazz. A flash flask falls and a glass lad laughs. The sad dad has a flash flask full of salad. A jazz lad adds gas to a glass flask. All the sad lads have a glass of salad jazz. The flash flask falls and a sad dad asks for a half glass. A glass lad adds salad to a flash flask. The jazz lads laugh as a sad dad falls. A flash glass flask has a half glass of salad jazz.`,
      duration: 420,
      icon: '🏠',
      order: 3
    },

    // Top Row Exercises
    {
      name: 'Top Row - Basic Pattern',
      description: 'Master the top row keys QWERTYUIOP',
      category: 'basic',
      subcategory: 'top_row',
      difficulty: 'easy',
      text: `qwertyuiop qwertyuiop qwertyuiop qwertyuiop qwertyuiop qwertyuiop qwertyuiop qwertyuiop qwertyuiop qwertyuiop
poiuytrewq poiuytrewq poiuytrewq poiuytrewq poiuytrewq poiuytrewq poiuytrewq poiuytrewq poiuytrewq poiuytrewq
qaz wsx edc rfv tgv qaz wsx edc rfv tgv qaz wsx edc rfv tgv qaz wsx edc rfv tgv qaz wsx edc rfv tgv`,
      duration: 300,
      icon: '⬆️',
      order: 4
    },
    {
      name: 'Top Row - Common Words',
      description: 'Practice common words using top row keys',
      category: 'basic',
      subcategory: 'top_row',
      difficulty: 'easy',
      text: `quit quiet quick quote quite quite quiet quote quick quit quiet quick quite quote quiet quick
type your true prey tree pot tip top type your true prey tree pot tip top type your true prey tree pot tip top
your quite quick quote requires a true typewriter to produce pretty poetry. quiet prayers require proper posture.`,
      duration: 360,
      icon: '⬆️',
      order: 5
    },
    {
      name: 'Top Row - Advanced Sentences',
      description: 'Complex sentences with top row focus',
      category: 'basic',
      subcategory: 'top_row',
      difficulty: 'medium',
      text: `Your quick quote requires a true typewriter to produce pretty poetry. Quiet prayers require proper posture and quiet contemplation. The quick brown fox jumps over the pretty tree near the quiet river. Your true typewriter produces quiet poetry quite quickly when you practice regularly.`,
      duration: 480,
      icon: '⬆️',
      order: 6
    },

    // Bottom Row Exercises
    {
      name: 'Bottom Row - Basic Pattern',
      description: 'Master bottom row keys ZXCVBNM',
      category: 'basic',
      subcategory: 'bottom_row',
      difficulty: 'easy',
      text: `zxcvbnm zxcvbnm zxcvbnm zxcvbnm zxcvbnm zxcvbnm zxcvbnm zxcvbnm zxcvbnm zxcvbnm
mnbvcxz mnbvcxz mnbvcxz mnbvcxz mnbvcxz mnbvcxz mnbvcxz mnbvcxz mnbvcxz mnbvcxz
zxc vbn mnb qaz zxc vbn mnb qaz zxc vbn mnb qaz zxc vbn mnb qaz zxc vbn mnb qaz`,
      duration: 300,
      icon: '⬇️',
      order: 7
    },
    {
      name: 'Bottom Row - Common Words',
      description: 'Practice words using bottom row keys',
      category: 'basic',
      subcategory: 'bottom_row',
      difficulty: 'easy',
      text: `zoo box cab very nice zoom vim max man ban van can zoo box cab very nice zoom vim max man ban van can
zebra xray very nice box zoom vim max man ban van can zebra xray very nice box zoom vim max man
my mom can buy a new van next month. the very nice box from the zoo contains a black zebra.`,
      duration: 360,
      icon: '⬇️',
      order: 8
    }
  ],

  // ==================== SPECIAL SECTION ====================
  special: [
    // Speed Drills
    {
      name: 'Speed Drill - Pangram Repetition',
      description: 'Build speed with famous pangrams',
      category: 'special',
      subcategory: 'speed',
      difficulty: 'hard',
      text: `the quick brown fox jumps over the lazy dog the quick brown fox jumps over the lazy dog the quick brown fox jumps over the lazy dog 
the quick brown fox jumps over the lazy dog the quick brown fox jumps over the lazy dog the quick brown fox jumps over the lazy dog`,
      duration: 480,
      icon: '⚡',
      order: 9
    },
    {
      name: 'Speed Drill - Common Phrases',
      description: 'Rapid typing of common English phrases',
      category: 'special',
      subcategory: 'speed',
      difficulty: 'hard',
      text: `thank you very much for your prompt response and thorough attention to this matter i greatly appreciate your assistance in resolving this issue 
please let me know if there is anything else i can do to help move this process forward as quickly as possible thank you again for your cooperation`,
      duration: 540,
      icon: '⚡',
      order: 10
    },
    {
      name: 'Speed Drill - Alternating Patterns',
      description: 'Build finger independence and speed',
      category: 'special',
      subcategory: 'speed',
      difficulty: 'expert',
      text: `left hand right hand left hand right hand left hand right hand left hand right hand left hand right hand 
asdf jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl;
qwer uiop qwer uiop qwer uiop qwer uiop qwer uiop qwer uiop qwer uiop qwer uiop qwer uiop`,
      duration: 600,
      icon: '⚡',
      order: 11
    },

    // Programming Exercises
    {
      name: 'JavaScript Fundamentals',
      description: 'Practice common JS syntax patterns',
      category: 'special',
      subcategory: 'programming',
      difficulty: 'advanced',
      text: `function calculateTotalPrice(itemPrice, quantity, taxRate) { 
  const subtotal = itemPrice * quantity; 
  const tax = subtotal * (taxRate / 100); 
  const total = subtotal + tax; 
  return Math.round(total * 100) / 100; 
}`,
      duration: 720,
      icon: '💻',
      order: 12
    },
    {
      name: 'React Component Patterns',
      description: 'Practice React hooks and components',
      category: 'special',
      subcategory: 'programming',
      difficulty: 'expert',
      text: `import React, { useState, useEffect, useCallback, useMemo, useContext, createContext } from 'react';

const DataTable = ({ data, columns, onRowClick, isLoading = false }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // ... rest of component logic
};`,
      duration: 900,
      icon: '💻',
      order: 13
    },

    // Symbols & Quotes
    {
      name: 'All Symbols - Complete Practice',
      description: 'Master all keyboard symbols',
      category: 'special',
      subcategory: 'symbols',
      difficulty: 'hard',
      text: `! @ # $ % ^ & * ( ) - _ = + [ ] { } \\ | ; : ' " , . < > / ? ~ \` 
(parentheses) [brackets] {braces} <angles> |pipe| \\backslash /forward-slash`,
      duration: 540,
      icon: '✨',
      order: 14
    },
    {
      name: 'Famous Quotes Collection',
      description: 'Type inspiring quotes from history',
      category: 'special',
      subcategory: 'quotes',
      difficulty: 'medium',
      text: `"The only limit to our realization of tomorrow is our doubts of today." - Franklin D. Roosevelt

"Success is not final, failure is not fatal: it is the courage to continue that counts." - Winston Churchill`,
      duration: 720,
      icon: '💬',
      order: 15
    }
  ]
};

// Flatten all exercises
const allExercises = [...exercises.basic, ...exercises.special];

async function seedExercises() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Exercise.deleteMany({});
    console.log('🗑️  Cleared existing exercises');

    // Insert new exercises
    const result = await Exercise.insertMany(allExercises);
    
    console.log(`🎉 Successfully seeded ${result.length} exercises`);
    console.log(`   - Basic: ${exercises.basic.length}`);
    console.log(`   - Special: ${exercises.special.length}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding exercises:', error);
    process.exit(1);
  }
}

seedExercises();