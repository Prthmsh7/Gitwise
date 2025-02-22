const API_KEY = "AIzaSyBsQFagSfHg7wCZMhLGIBwTNayapgnFdoc";

document.getElementById("summarize").addEventListener("click", () => {
    console.log("✅ Summarize button clicked");

    chrome.storage.local.get(["pageText"], (result) => {
        if (chrome.runtime.lastError) {
            console.error("❌ Error retrieving pageText:", chrome.runtime.lastError);
            return;
        }

        console.log("📄 Retrieved page text:", result.pageText ? result.pageText.substring(0, 100) + "..." : "No text found");

        if (result.pageText) {
            fetchSummary(result.pageText);
        } else {
            console.warn("⚠️ No page text found in storage.");
        }
    });
});

document.getElementById("ask").addEventListener("click", () => {
    console.log("✅ Ask button clicked");

    let question = document.getElementById("query").value;
    console.log("❓ User question:", question);

    chrome.storage.local.get(["pageText"], (result) => {
        if (chrome.runtime.lastError) {
            console.error("❌ Error retrieving pageText:", chrome.runtime.lastError);
            return;
        }

        console.log("📄 Retrieved page text:", result.pageText ? result.pageText.substring(0, 100) + "..." : "No text found");

        if (result.pageText) {
            fetchAnswer(result.pageText, question);
        } else {
            console.warn("⚠️ No page text found in storage.");
        }
    });
});

async function fetchSummary(text) {
    console.log("🚀 Sending request to Gemini for summary...");

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ role: "user", parts: [{ text: `Summarize the following text:\n\n${text}` }] }]
            })
        });

        const data = await response.json();
        console.log("📩 API Response:", data);

        document.getElementById("summary").value = data.candidates?.[0]?.content?.parts?.[0]?.text || "No summary available";
    } catch (error) {
        console.error("❌ Error fetching summary:", error);
    }
}

async function fetchAnswer(text, question) {
    console.log("🚀 Sending request to Gemini for answer...");

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ role: "user", parts: [{ text: `Based on this text:\n\n${text}\n\nAnswer this question: ${question}` }] }]
            })
        });

        const data = await response.json();
        console.log("📩 API Response:", data);

        document.getElementById("answer").value = data.candidates?.[0]?.content?.parts?.[0]?.text || "No answer available";
    } catch (error) {
        console.error("❌ Error fetching answer:", error);
    }
}
