import React, { useState } from "react";
import { motion } from "framer-motion";
import { api } from "../utils/api";

export default function LeaveForm() {
  const [employee, setEmployee] = useState("Alice");
  const [requestDays, setRequestDays] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const submitLeave = async () => {
    if (!employee.trim() || !requestDays) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await api.submitLeave({
        employee,
        requestDays: Number(requestDays)
      });

      if (res.data.status === "Rejected") {
        setResponse(`❌ ${res.data.reason}`);
      } else {
        setResponse(`✅ Leave Request Submitted! ID: ${res.data.request?.id ?? "-"}`);
      }

    } catch (error) {
      console.log(error);
      setResponse("Server error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <motion.h1
        className="text-3xl font-bold text-blue-700 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Leave Request Form
      </motion.h1>

      <motion.div
        className="bg-white p-6 shadow-xl rounded-xl w-full max-w-xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <label className="block mb-2 font-semibold text-gray-700">Employee Name</label>
        <input
          type="text"
          value={employee}
          onChange={(e) => setEmployee(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-400"
        />

        <label className="block mb-2 font-semibold text-gray-700">Number of Days</label>
        <input
          type="number"
          value={requestDays}
          onChange={(e) => setRequestDays(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-400"
          min="1"
        />

        <button
          onClick={submitLeave}
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Submit Request
        </button>

        {loading && <p className="mt-3 text-gray-600 animate-pulse">Processing...</p>}

        {response && !loading && (
          <motion.div
            className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-600 rounded font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {response}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
