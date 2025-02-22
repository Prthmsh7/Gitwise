chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: extractText
    }, (results) => {
        if (results && results[0].result) {
            chrome.storage.local.set({ pageText: results[0].result });
        }
    });
});
