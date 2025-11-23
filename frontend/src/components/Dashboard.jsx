import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "../utils/api";

export default function Dashboard({ compact }) {
  const [leaveBalance, setLeaveBalance] = useState(null);
  const [pendingLeaves, setPendingLeaves] = useState([]);
  const [onboarding, setOnboarding] = useState([]);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Use a default employee for dashboard
      const balance = await api.getLeaveBalance({ params: { employee: "Alice" } });
      const pending = await api.getPendingLeaves();
      const steps = await api.getOnboardingSteps();
      const logsData = await api.getLogs();

      setLeaveBalance(balance.data);
      setPendingLeaves(Array.isArray(pending.data) ? pending.data : []);
      setOnboarding(Array.isArray(steps.data) ? steps.data : []);
      setLogs(Array.isArray(logsData.data) ? logsData.data : []);
    } catch (err) {
      console.log("Dashboard load error:", err);
    }
  };

  return (
    <div className={`p-6 ${compact ? "py-4" : "min-h-screen"} bg-gray-100`}>
      <h1 className="text-3xl font-bold mb-6 text-blue-700">HR Assistant Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Leave Balance */}
        <motion.div
          className="p-6 bg-white shadow-xl rounded-xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Leave Balance</h2>
          {leaveBalance ? (
            <div>
              <p><strong>Employee:</strong> {leaveBalance.employee}</p>
              <p><strong>Balance:</strong> {leaveBalance.leaveBalance} days</p>
            </div>
          ) : <p>Loading...</p>}
        </motion.div>

        {/* Pending Leaves */}
        <motion.div
          className="p-6 bg-white shadow-xl rounded-xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Pending Leave Requests</h2>
          {pendingLeaves.length ? (
            pendingLeaves.map(l => (
              <div key={l.id ?? Math.random()} className="border p-3 rounded mb-2">
                <p><strong>ID:</strong> {l.id}</p>
                <p><strong>Employee:</strong> {l.employee}</p>
                <p><strong>Days:</strong> {l.requestDays}</p>
              </div>
            ))
          ) : <p>No pending requests</p>}
        </motion.div>

        {/* Onboarding */}
        <motion.div
          className="p-6 bg-white shadow-xl rounded-xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Onboarding Steps</h2>
          <ul className="list-disc ml-5">
            {onboarding.map((step, i) => <li key={i}>{step}</li>)}
          </ul>
        </motion.div>
      </div>

      {/* Query Logs */}
      <motion.div
        className="mt-10 p-6 bg-white shadow-xl rounded-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Query Logs</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Employee</th>
                <th className="p-2 border">Query</th>
                <th className="p-2 border">Response</th>
              </tr>
            </thead>
            <tbody>
              {logs.length ? logs.map((log, i) => (
                <tr key={i}>
                  <td className="p-2 border">{log.employee}</td>
                  <td className="p-2 border">{log.query}</td>
                  <td className="p-2 border">{log.response}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="3" className="text-center p-2 border">No logs yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
