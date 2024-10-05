document.getElementById('explainButton').addEventListener('click', () => {
    const text = document.getElementById('inputText').value;
  
    chrome.runtime.sendMessage({ action: "getExplanation", text: text }, (response) => {
      document.getElementById('explanation').innerText = response.explanation;
    });
  });