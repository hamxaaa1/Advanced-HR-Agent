import React from "react";
import NavBar from "../components/NavBar";
import Dashboard from "../components/Dashboard";
import FAQ from "../components/FAQ";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="max-w-6xl mx-auto px-5 py-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-indigo-700 mb-3">
            HR Assistant Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Welcome! Manage leaves, chat with HR, and explore onboarding steps.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-6 mb-16">
          <Link to="/chat">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow"
            >
              Chat with HR Assistant
            </motion.button>
          </Link>

          <Link to="/leave">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 bg-gray-900 text-white rounded-xl shadow"
            >
              Apply for Leave
            </motion.button>
          </Link>
        </div>

        {/* Mini Dashboard Overview */}
        <Dashboard compact />

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQ compact />
        </div>
      </div>
    </div>
  );
}
