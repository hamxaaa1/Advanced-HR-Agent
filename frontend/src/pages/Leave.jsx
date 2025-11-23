import React from "react";
import NavBar from "../components/NavBar";
import LeaveForm from "../components/LeaveForm";
import PendingRequests from "../components/PendingRequests";
import { motion } from "framer-motion";

export default function Leave() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="max-w-5xl mx-auto px-5 py-10">
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-indigo-700 mb-10 text-center"
        >
          Leave Management
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-2xl shadow mb-10"
        >
          <LeaveForm />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-2xl shadow"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Pending Leave Requests
          </h2>

          <PendingRequests />
        </motion.div>
      </div>
    </div>
  );
}
