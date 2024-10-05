require('dotenv').config();

const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());  // Middleware to parse JSON

// Endpoint to handle requests from the Chrome extension
app.post('/api/explain', async (req, res) => {
  const userText = req.body.text;

  try {
    const response = await axios.post('https://api.openai.com/v1/completions', {
      model: "text-davinci-003",
      prompt: `Explain this: ${userText}`,
      max_tokens: 100
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const explanation = response.data.choices[0].text;
    res.json({ explanation });
  } catch (error) {
    console.error('Error fetching explanation from OpenAI:', error);
    res.status(500).json({ error: 'Failed to fetch explanation' });
  }
});

// Start server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});