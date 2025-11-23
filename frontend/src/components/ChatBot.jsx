import React, { useState } from "react";
import { motion } from "framer-motion";
import { api } from "../utils/api";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I'm your HR Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // -----------------------
  // Send Message Handler
  // -----------------------
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setMessages([...messages, { from: "user", text: userMsg }]);
    setInput("");
    setLoading(true);

    let botReply = "Sorry, I didn't understand that.";

    try {
      // ---------------------------------
      // 1. Leave Balance
      // ---------------------------------
      if (userMsg.toLowerCase().includes("leave balance")) {
        const res = await api.getLeaveBalance({ params: { employee: "Alice" } });
        botReply = `Your leave balance is ${res.data.leaveBalance} days.`;
      }

      // ---------------------------------
      // 2. Apply Leave (simple pattern)
      // ---------------------------------
      else if (userMsg.toLowerCase().includes("apply leave")) {
        const extractedDays = parseInt(userMsg.match(/\d+/)); // extract number like "3"
        const res = await api.submitLeave({
          employee: "Alice",
          requestDays: extractedDays || 1
        });

        if (res.data.status === "Rejected") {
          botReply = `❌ Leave rejected: ${res.data.reason}`;
        } else {
          botReply = `Your leave request for ${extractedDays} days is submitted.`;
        }
      }

      // ---------------------------------
      // 3. FAQs (general question)
      // ---------------------------------
      else {
        const res = await api.getFaqs({
          params: { employee: "Alice", query: userMsg }
        });
        botReply = res.data.response || "I'm not sure about that.";
      }
    } catch (err) {
      botReply = "⚠️ Something went wrong. Please try again.";
    }

    setLoading(false);
    setMessages(prev => [...prev, { from: "bot", text: botReply }]);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-5 h-[500px] overflow-y-auto">
        
        {/* Chat Messages */}
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: msg.from === "user" ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`my-2 p-3 max-w-[80%] rounded-xl ${
              msg.from === "user"
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-gray-200 text-black"
            }`}
          >
            {msg.text}
          </motion.div>
        ))}

        {/* Typing Animation */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-300 rounded-xl p-3 w-20"
          >
            typing...
          </motion.div>
        )}
      </div>

      {/* Input Box */}
      <div className="flex mt-4 gap-2">
        <input
          className="w-full border rounded-xl p-3"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything…"
        />
        <button
          onClick={sendMessage}
          className="px-5 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
