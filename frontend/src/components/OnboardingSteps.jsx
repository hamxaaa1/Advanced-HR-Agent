import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "../utils/api";

export default function OnboardingSteps() {
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSteps() {
      try {
        const res = await api.getOnboardingSteps();
        setSteps(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchSteps();
  }, []);

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center">
      <motion.h1
        className="text-3xl font-bold text-indigo-700 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Onboarding Steps
      </motion.h1>

      <div className="w-full max-w-2xl">
        {loading ? (
          <p className="text-center text-gray-600 animate-pulse">
            Loading steps...
          </p>
        ) : (
          steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-white p-5 mb-4 shadow-md rounded-xl border-l-4 border-indigo-600"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <h2 className="text-lg font-semibold text-gray-800">
                Step {index + 1}
              </h2>
              <p className="text-gray-600 mt-1">{step}</p>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
