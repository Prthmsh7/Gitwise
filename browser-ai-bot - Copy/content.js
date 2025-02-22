function extractPageText() {
    let text = document.body.innerText.trim(); // Get all visible text from the page

    console.log("📄 Extracted Page Text:", text.substring(0, 200) + "..."); // Log first 200 chars

    if (text.length > 0) {
        chrome.storage.local.set({ pageText: text }, () => {
            if (chrome.runtime.lastError) {
                console.error("❌ Error saving text to storage:", chrome.runtime.lastError);
            } else {
                console.log("✅ Page text saved to storage.");
            }
        });
    } else {
        console.warn("⚠️ No text found on this page.");
    }
}

// Run the script when the page loads
extractPageText();

// Update storage when the page changes dynamically (Single Page Applications support)
let observer = new MutationObserver(() => {
    extractPageText();
});
observer.observe(document.body, { childList: true, subtree: true });
