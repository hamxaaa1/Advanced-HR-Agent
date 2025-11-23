import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "../utils/api";

export default function PendingRequests() {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPending = async () => {
    try {
      const res = await api.getPendingLeaves();
      const pendingArray = Array.isArray(res.data) ? res.data : [];
      console.log("Pending leaves:", pendingArray);
      setPending(pendingArray);
    } catch (e) {
      console.log("Error fetching pending leaves:", e);
      setPending([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPending();
  }, []);

  const handleAction = async (id, approve) => {
    try {
      await api.approveLeave({ id, approve });
      loadPending();
    } catch (err) {
      console.log("Error updating leave:", err);
    }
  };

  return (
    <div className="p-6">
      {loading ? (
        <p className="text-center text-gray-500 animate-pulse">Loading...</p>
      ) : pending.length > 0 ? (
        <div className="space-y-4">
          {pending.map((req, index) => (
            <motion.div
              key={req.id ?? index}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white shadow-lg rounded-xl p-5 border-l-4 border-indigo-600"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                Request ID: {req.id ?? "N/A"}
              </h2>
              <p className="text-gray-600 mt-1">
                <strong>Employee:</strong> {req.employee ?? "Unknown"}
              </p>
              <p className="text-gray-600">
                <strong>Requested Days:</strong> {req.requestDays ?? "-"}
              </p>
              <p className="text-yellow-600 font-semibold mt-1">
                Status: {req.status ?? "Pending"}
              </p>
              <div className="mt-2 flex gap-3">
                <button
                  onClick={() => handleAction(req.id, true)}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleAction(req.id, false)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Reject
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No pending requests 🎉</p>
      )}
    </div>
  );
}
