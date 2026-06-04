const router = require('express').Router();
const { requireAuth } = require('../middleware/auth');

// Proxy Yaksha AI requests to Groq — keeps API key server-side
router.post('/', requireAuth, async (req, res) => {
  const { messages } = req.body;
  if (!Array.isArray(messages) || !messages.length) {
    return res.status(400).json({ error: 'messages array required' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey || apiKey === 'your_groq_api_key_here') {
    return res.status(503).json({ error: 'Groq API key not configured on server' });
  }

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: 'You are Yaksha — a helpful AI assistant for Samagama, the IIT Ropar internship platform. Be concise, friendly, and informative.',
          },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!groqRes.ok) {
      const err = await groqRes.text();
      return res.status(groqRes.status).json({ error: 'Groq API error', detail: err });
    }

    const data = await groqRes.json();
    res.json({ reply: data.choices?.[0]?.message?.content || '' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to reach Groq API', detail: err.message });
  }
});

module.exports = router;