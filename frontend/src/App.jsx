import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Leave from "./pages/Leave";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <Router>
      <div className="App font-sans bg-gray-50 min-h-screen">
        <Routes>
          {/* Landing/Home page */}
          <Route path="/" element={<Home />} />

          {/* Chat page */}
          <Route path="/chat" element={<Chat />} />

          {/* Leave page */}
          <Route path="/leave" element={<Leave />} />

          {/* Admin/HR Dashboard page */}
          <Route path="/dashboard" element={<DashboardPage />} />

          {/* Fallback route */}
          <Route path="*" element={<div className="text-center p-10 text-xl font-semibold">Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
