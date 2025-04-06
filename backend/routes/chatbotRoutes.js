
const express = require('express');
const router = express.Router();
const { askChatbot } = require('../services/chatbotService');

router.post('/ask', async (req, res) => {
  const { message } = req.body;

  if (!message) return res.status(400).json({ error: 'Message is required' });

  try {
    const result = await askChatbot(message);
    if (result.type === 'error') {
      return res.status(400).json({ error: result.response });
    }

    res.json({ reply: result.response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get chatbot response' });
  }
});

module.exports = router;
