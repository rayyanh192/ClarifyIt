chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "getExplanation") {
      fetch('http://localhost:5000/getExplanation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: message.text })
      })
      .then(response => response.json())
      .then(data => {
        // Use the AI explanation data in your extension
        displayExplanation(data.explanation);
      })
      .catch(error => console.error('Error:', error));
    }
  });