import { useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    // Add user message
    setChat((prev) => [...prev, { role: "user", content: message }]);

    try {
      const res = await axios.post("http://127.0.0.1:8000/chat", { message });

      // Add bot reply
      setChat((prev) => [
        ...prev,
        { role: "assistant", content: res.data.reply },
      ]);
    } catch (err) {
      console.error(err);
      setChat((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Error: Backend not reachable." },
      ]);
    }

    setMessage("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        💬 Customer Support Bot
      </h1>

      {/* Chat Box */}
      <div className="w-full max-w-2xl flex flex-col bg-white rounded-2xl shadow-lg p-4 h-[500px] overflow-y-auto">
        {chat.map((msg, i) => (
          <div
            key={i}
            className={`flex mb-3 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-xl max-w-xs break-words ${
                msg.role === "user"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div className="w-full max-w-2xl mt-4 flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-xl shadow hover:bg-blue-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
