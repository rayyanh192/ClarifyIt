chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getExplanation") {
      fetchExplanationFromProxy(request.text).then(response => {
        sendResponse({ explanation: response });
      });
      return true;  // To keep the message channel open for async response
    }
  });
  
  async function fetchExplanationFromProxy(text) {
    try {
      const response = await fetch('http://localhost:3000/api/explain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text })
      });
      const data = await response.json();
      return data.explanation;
    } catch (error) {
      console.error('Error fetching explanation:', error);
      return 'An error occurred while fetching the explanation.';
    }
  }