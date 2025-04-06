
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const allowedTopics = [
  'feedback',
  'performance improvement',
  'development plan',
  'communication skills',
  'teamwork',
  'work ethics',
  'HR policy',
  'career growth',
  'productivity',
  'goal setting'
];

function isTopicAllowed(message) {
  return allowedTopics.some(topic => message.toLowerCase().includes(topic));
}

async function askChatbot(userMessage) {
  if (!isTopicAllowed(userMessage)) {
    return { type: 'error', response: "Sorry, I can only answer HR, feedback, or development-related questions." };
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const result = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: userMessage }] }],
  });

  const response = await result.response;
  const text = response.text();
  return { type: 'success', response: text };
}

module.exports = { askChatbot };
