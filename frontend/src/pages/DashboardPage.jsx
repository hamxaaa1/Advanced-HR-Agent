import React from "react";
import NavBar from "../components/NavBar";
import Dashboard from "../components/Dashboard";
import OnboardingSteps from "../components/OnboardingSteps";
import FAQ from "../components/FAQ";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function DashboardPage() {
  // Example data for analytics chart
  const analyticsData = [
    { day: "Mon", leaves: 2 },
    { day: "Tue", leaves: 5 },
    { day: "Wed", leaves: 3 },
    { day: "Thu", leaves: 6 },
    { day: "Fri", leaves: 4 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* NavBar */}
      <NavBar />

      <div className="max-w-6xl mx-auto px-5 py-10 space-y-10">
        
        {/* Page Header */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-indigo-700 text-center"
        >
          HR Dashboard
        </motion.h1>

        {/* Dashboard Summary Cards */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-2xl shadow"
        >
          <Dashboard />
        </motion.div>

        {/* Onboarding Steps */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-2xl shadow"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Onboarding Steps</h2>
          <OnboardingSteps />
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-2xl shadow"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h2>
          <FAQ />
        </motion.div>

        {/* Optional Analytics Chart */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-2xl shadow"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Weekly Leave Analytics</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="leaves" stroke="#4F46E5" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

      </div>
    </div>
  );
}
