import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: "Home", path: "/" },
    { name: "Apply Leave", path: "/leave" },
    { name: "Chatbot", path: "/chat" },
  ];

  return (
    <nav className="bg-white shadow-md px-6 py-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold text-indigo-600"
        >
          HR Assistant
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          {links.map((link) => (
            <Link key={link.path} to={link.path}>
              <span
                className={`text-gray-700 font-medium hover:text-indigo-600 transition ${
                  location.pathname === link.path
                    ? "text-indigo-600 border-b-2 border-indigo-600 pb-1"
                    : ""
                }`}
              >
                {link.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white shadow-inner mt-3 rounded-lg p-4"
          >
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
              >
                <p
                  className={`py-2 text-gray-700 font-medium rounded-md px-2 hover:bg-indigo-50 ${
                    location.pathname === link.path
                      ? "text-indigo-600 font-semibold"
                      : ""
                  }`}
                >
                  {link.name}
                </p>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
