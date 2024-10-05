document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("getExplanation");
    const input = document.getElementById("userInput");
    
    if (button && input) {
      button.addEventListener("click", () => {
        const text = input.value;
        
        // Send message to background script
        chrome.runtime.sendMessage({ action: "getExplanation", text }, (response) => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message); // Logs any runtime errors
          } else {
            // Display the explanation
            document.getElementById("response").textContent = response.explanation;
          }
        });
      });
    } else {
      console.error('Button or input element not found!');
    }
  });
});