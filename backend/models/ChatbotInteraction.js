const mongoose = require('mongoose');

const chatbotInteractionSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
  },
  conversationId: String,
  userMessage: String,
  aiResponse: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
  resolutionScore: {
    type: Number,
    min: 0,
    max: 10,
  },
  topic: String,
  relatedLearningGaps: [String],
  suggestedResources: [
    {
      type: String,
      title: String,
      url: String,
    },
  ],
});

module.exports = mongoose.model('ChatbotInteraction', chatbotInteractionSchema);
