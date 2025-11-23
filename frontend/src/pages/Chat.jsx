import React from "react";
import NavBar from "../components/NavBar";
import ChatBot from "../components/ChatBot";
import { motion } from "framer-motion";

export default function Chat() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <NavBar />

      <div className="max-w-4xl mx-auto px-5 py-10">
        
        {/* Page heading */}
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-indigo-700 mb-6 text-center"
        >
          HR Chat Assistant
        </motion.h1>

        {/* Chat container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <ChatBot />
        </motion.div>
      </div>
    </div>
  );
}
