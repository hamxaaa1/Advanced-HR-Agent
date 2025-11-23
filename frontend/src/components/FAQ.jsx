import React, { useState } from "react";
import { motion } from "framer-motion";
import { api } from "../utils/api";

export default function FAQ() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const askFAQ = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResponse("");

    try {
      const res = await api.getFaqs({ params: { employee: "Alice", query } });
      setResponse(res.data?.response || "No answer found.");
    } catch (err) {
      console.log(err);
      setResponse("Server error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <motion.h1
        className="text-3xl font-bold text-blue-700 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        HR FAQs
      </motion.h1>

      <motion.div
        className="bg-white p-6 shadow-xl rounded-xl w-full max-w-xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <input
          type="text"
          placeholder="e.g. leave days, reimbursement, holidays..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={askFAQ}
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Ask
        </button>

        {loading && <p className="text-gray-600 mt-4 animate-pulse">Thinking...</p>}
        {response && !loading && (
          <motion.div
            className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-600 rounded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-blue-900 font-medium">{response}</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
