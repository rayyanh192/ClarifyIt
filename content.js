document.addEventListener('mouseup', function() {
    let selectedText = window.getSelection().toString();
    if (selectedText.length > 0) {
      chrome.runtime.sendMessage({ action: "textSelected", text: selectedText });
    }
  });