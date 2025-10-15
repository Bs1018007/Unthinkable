import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import ReviewDisplay from "./components/ReviewDisplay";
import ReviewHistory from "./components/ReviewHistory";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, History, Settings, Bot, Menu, X } from "lucide-react";

const App = () => {
  const [currentReview, setCurrentReview] = useState(null);
  const [activeTab, setActiveTab] = useState("upload");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleReviewComplete = (review) => {
    setCurrentReview(review);
    setActiveTab("upload");
  };

  const handleSelectReview = (review) => {
    setCurrentReview(review);
    setActiveTab("upload");
  };

  const tabs = [
    { id: "upload", label: "Upload & Review", icon: <Upload className="w-5 h-5" /> },
    { id: "history", label: "Review History", icon: <History className="w-5 h-5" /> },
    { id: "settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-gray-100">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-slate-950/70 backdrop-blur-md border-b border-slate-800 shadow-md">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-2">
            <Bot className="w-7 h-7 text-blue-400" />
            <span className="text-lg font-bold tracking-wide">AI Code Review</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="md:hidden p-2 rounded-md hover:bg-slate-800 transition"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 flex flex-col space-y-2 p-3 bg-slate-950/80">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center px-4 py-3 rounded-md text-left font-medium transition ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-md"
                    : "hover:bg-slate-800"
                }`}
              >
                {tab.icon}
                <span className="ml-3">{tab.label}</span>
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Main Section */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-slate-950 border-r border-slate-800 shadow-xl">
          <div className="px-6 py-8 border-b border-slate-800">
            <div className="flex items-center space-x-3">
              <Bot className="w-8 h-8 text-blue-400" />
              <h1 className="text-xl font-bold text-white">AI Code Review</h1>
            </div>
            <p className="text-gray-400 text-sm mt-1">Powered by Gemini AI</p>
          </div>

          <nav className="flex-1 flex flex-col gap-2 p-4 overflow-y-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-3 rounded-md text-left font-medium transition ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {tab.icon}
                <span className="ml-3">{tab.label}</span>
              </button>
            ))}
          </nav>

          <div className="px-6 py-4 text-center text-gray-500 border-t border-slate-800 text-sm">
            © 2025 CodeAI Labs
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8 lg:p-10">
          <AnimatePresence mode="wait">
            {activeTab === "upload" && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-10 max-w-6xl mx-auto"
              >
                <FileUpload onReviewComplete={handleReviewComplete} />
                {currentReview && <ReviewDisplay review={currentReview} />}
              </motion.div>
            )}

            {activeTab === "history" && (
              <motion.div
                key="history"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="max-w-6xl mx-auto"
              >
                <ReviewHistory onSelectReview={handleSelectReview} />
              </motion.div>
            )}

            {activeTab === "settings" && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="max-w-3xl mx-auto bg-slate-900 p-8 rounded-2xl shadow-lg border border-slate-700"
              >
                <h2 className="text-2xl font-bold text-white mb-4">Settings</h2>
                <p className="text-gray-400">
                  Customize AI preferences, code theme, or notifications (coming soon 🚀)
                </p>
                <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition">
                  Coming Soon
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default App;
