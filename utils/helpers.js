// Generate random text for typing test
const generateRandomText = (difficulty = 'medium') => {
  const texts = {
    easy: [
      "The quick brown fox jumps over the lazy dog.",
      "Practice makes perfect when learning to type.",
      "A simple sentence for beginners to practice.",
      "Typing is an essential skill in the digital age.",
      "Keep your fingers on the home row keys."
    ],
    medium: [
      "Technology has transformed every aspect of modern life. From communication to transportation, from healthcare to education, digital innovation continues to reshape our world in remarkable ways.",
      "Learning to type efficiently is one of the most valuable skills you can develop. With consistent practice and dedication, anyone can achieve impressive typing speeds and accuracy.",
      "The internet has connected the world like never before. Information flows freely across borders, enabling global collaboration and innovation in ways previously unimaginable."
    ],
    hard: [
      "Artificial intelligence and machine learning are revolutionizing how we interact with computers. These technologies are becoming increasingly integrated into everyday applications, from voice assistants to recommendation systems, fundamentally changing our relationship with technology.",
      "The future of computing lies in quantum mechanics. Quantum computers leverage the principles of superposition and entanglement to perform calculations that would be impossible for classical computers, opening new frontiers in science and medicine."
    ],
    expert: [
      "The integration of blockchain technology into supply chain management has created unprecedented levels of transparency and traceability. This distributed ledger system allows all parties to verify transactions without the need for intermediaries, reducing costs and increasing trust.",
      "Neural networks utilize backpropagation algorithms to optimize weight matrices through gradient descent. This iterative process minimizes the loss function by adjusting parameters in the direction of steepest descent, enabling complex pattern recognition."
    ]
  };
  
  const level = texts[difficulty] || texts.medium;
  return level[Math.floor(Math.random() * level.length)];
};

// Generate random code snippet
const generateRandomCode = () => {
  const codeSnippets = [
    `function calculateWPM(correctChars, timeInSeconds) {
  const wordsTyped = correctChars / 5;
  const minutes = timeInSeconds / 60;
  return Math.round(wordsTyped / minutes);
}`,
    `const asyncFunction = async () => {
  try {
    const data = await fetchData();
    const processed = processData(data);
    return processed;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};`,
    `class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.createdAt = new Date();
  }
  
  greet() {
    return \`Hello, I'm \${this.name}\`;
  }
}`
  ];
  
  return codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
};

// Calculate WPM
const calculateWPM = (characters, timeInSeconds) => {
  const words = characters / 5;
  const minutes = timeInSeconds / 60;
  return Math.round(words / minutes);
};

// Calculate accuracy
const calculateAccuracy = (correctChars, totalChars) => {
  if (totalChars === 0) return 100;
  return Math.round((correctChars / totalChars) * 100);
};

// Format time
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Get time ago
const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60
  };
  
  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval} ${unit}${interval === 1 ? '' : 's'} ago`;
    }
  }
  
  return 'just now';
};

module.exports = {
  generateRandomText,
  generateRandomCode,
  calculateWPM,
  calculateAccuracy,
  formatTime,
  timeAgo
};