import { useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    // Add user message to chat
    setChat([...chat, { role: "user", content: message }]);

    try {
      const res = await axios.post("http://127.0.0.1:8000/chat", {
        message,
      });

      // Add bot reply to chat
      setChat((prev) => [...prev, { role: "assistant", content: res.data.reply }]);
    } catch (err) {
      console.error(err);
      setChat((prev) => [...prev, { role: "assistant", content: "Error: could not reach backend" }]);
    }

    setMessage(""); // clear input
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
      <h1>Customer Support Bot</h1>

      <div style={{ border: "1px solid #ccc", padding: "1rem", minHeight: "300px" }}>
        {chat.map((msg, i) => (
          <p key={i} style={{ textAlign: msg.role === "user" ? "right" : "left" }}>
            <b>{msg.role}:</b> {msg.content}
          </p>
        ))}
      </div>

      <div style={{ marginTop: "1rem" }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ width: "80%", padding: "0.5rem" }}
        />
        <button onClick={sendMessage} style={{ padding: "0.5rem 1rem" }}>
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
