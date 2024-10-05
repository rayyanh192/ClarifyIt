document.addEventListener('mouseup', () => {
    let selectedText = window.getSelection().toString();
    if (selectedText) {
      chrome.runtime.sendMessage({
        action: "getExplanation",
        text: selectedText
      }, (response) => {
        console.log("Explanation: ", response.explanation);
      });
    }
  });