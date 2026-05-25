// Chatbot Service
const ChatbotInteraction = require('../models/ChatbotInteraction');

const saveChatMessage = async (messageData) => {
  try {
    const interaction = new ChatbotInteraction(messageData);
    return await interaction.save();
  } catch (err) {
    throw new Error(`Error saving chat message: ${err.message}`);
  }
};

const getConversationHistory = async (studentId, limit = 10) => {
  try {
    return await ChatbotInteraction.find({ studentId })
      .sort({ timestamp: -1 })
      .limit(limit);
  } catch (err) {
    throw new Error(`Error fetching conversation history: ${err.message}`);
  }
};

const identifyLearningGaps = async (studentId) => {
  try {
    const interactions = await ChatbotInteraction.find({ studentId });
    const gaps = {};

    interactions.forEach((interaction) => {
      if (interaction.relatedLearningGaps) {
        interaction.relatedLearningGaps.forEach((gap) => {
          gaps[gap] = (gaps[gap] || 0) + 1;
        });
      }
    });

    return Object.entries(gaps)
      .map(([gap, count]) => ({ gap, frequency: count }))
      .sort((a, b) => b.frequency - a.frequency);
  } catch (err) {
    throw new Error(`Error identifying learning gaps: ${err.message}`);
  }
};

const generateAIResponse = async (userMessage, studentId) => {
  try {
    // This is a mock implementation
    // In production, integrate with OpenAI API
    const keywords = userMessage.toLowerCase().split(' ');
    let response = `I understand your question about: "${userMessage}".`;

    if (keywords.includes('math') || keywords.includes('equation')) {
      response += ' Here are some tips for solving equations: 1) Isolate the variable, 2) Perform operations on both sides....';
    } else if (keywords.includes('science')) {
      response += ' This is an important science concept. Let me explain the key points....';
    } else {
      response += ' Let me help you understand this better. Would you like me to provide more examples or resources?';
    }

    return response;
  } catch (err) {
    throw new Error(`Error generating response: ${err.message}`);
  }
};

const suggestResources = async (topic) => {
  try {
    // Mock resource suggestions
    const resourceMap = {
      mathematics: [
        { type: 'video', title: 'Khan Academy - Math', url: 'https://example.com' },
        { type: 'article', title: 'Math Basics', url: 'https://example.com' },
      ],
      science: [
        { type: 'video', title: 'Crash Course - Science', url: 'https://example.com' },
        { type: 'lab', title: 'Interactive Labs', url: 'https://example.com' },
      ],
    };

    return resourceMap[topic.toLowerCase()] || [];
  } catch (err) {
    throw new Error(`Error suggesting resources: ${err.message}`);
  }
};

module.exports = {
  saveChatMessage,
  getConversationHistory,
  identifyLearningGaps,
  generateAIResponse,
  suggestResources,
};
