require("dotenv").config();
const axios = require('axios'); // Import axios to make HTTP requests
const OpenAI = require('openai');
const openAIClient = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY']
});


// Listener to handle incoming messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getExplanation") {
    fetchExplanationFromServer(request.text).then(response => {
      sendResponse({ explanation: response.explanation });
    }).catch(error => {
      console.error('Error fetching explanation from server:', error);
      sendResponse({ explanation: 'An error occurred while fetching the explanation.' });
    });
    return true;  // Keeps the message channel open for async response
  }
});

// Function to call server API and get the explanation
async function fetchExplanationFromServer(text) {
  try {
    const response = await axios.post('http://localhost:3000/api/explain', {
      text: text
    });

    return response.data;  // Return the explanation from server response
  } catch (error) {
    throw new Error(`Error fetching explanation from server: ${error.message}`);
  }
}