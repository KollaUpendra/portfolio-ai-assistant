# portfolio-ai-assistant 

2. Frontend Trigger (When Closing the Bot)
Whenever the user closes the chat widget or window in your frontend:

javascript
let currentSessionId = null;
// When user opens the chatbot
async function openChatBot() {
    const res = await fetch("http://localhost:5000/api/chat/session/start", { method: "POST" });
    const data = await res.json();
    currentSessionId = data.sessionId;
}
// When user clicks the "X" (close) button
async function closeChatBot() {
    if (!currentSessionId) return;
    await fetch("http://localhost:5000/api/chat/session/close", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: currentSessionId })
    });
    currentSessionId = null; // Clear from frontend state
}
// Optional: Also cleanup if the tab/browser is closed
window.addEventListener("beforeunload", () => {
    if (currentSessionId) {
        navigator.sendBeacon(
            "http://localhost:5000/api/chat/session/close", 
            JSON.stringify({ sessionId: currentSessionId })
        );
    }
});
