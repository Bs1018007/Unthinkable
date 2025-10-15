import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import ReviewDisplay from "./components/ReviewDisplay";
import ReviewHistory from "./components/ReviewHistory";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Upload, History, Settings, Bot, Menu, X } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Mobile Top Bar */}
      <header className="md:hidden sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="w-7 h-7 text-blue-600" />
            <span className="text-lg font-semibold text-gray-800">AI Code Review</span>
          </div>
          <button
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="p-2 rounded-lg border border-gray-200 text-gray-700 active:scale-95"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {/* Mobile Tabs Drawer */}
        {mobileMenuOpen && (
          <nav className="px-3 pb-3 space-y-2 border-t border-gray-100">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center w-full px-4 py-3 rounded-lg text-left font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-blue-50"
                }`}
              >
                <span className="mr-3">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        )}
      </header>

      <div className="flex">
        {/* Sidebar (Desktop) */}
        <aside className="hidden md:flex w-64 bg-white shadow-xl border-r border-gray-200 flex-col sticky top-0 h-screen">
          <div className="px-6 py-8 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <Bot className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-800">
                AI Code Review
              </h1>
            </div>
            <p className="text-gray-500 text-sm mt-1">
              Powered by Gemini AI
            </p>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center w-full px-4 py-3 rounded-lg text-left font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-blue-50"
                }`}
              >
                <span className="mr-3">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="px-6 py-4 text-center text-sm text-gray-500 border-t border-gray-100">
            © 2025 CodeAI Labs
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeTab === "upload" && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 sm:space-y-8 lg:space-y-10 max-w-7xl mx-auto"
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
              className="max-w-7xl mx-auto"
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
              className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-md"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Settings
              </h2>
              <p className="text-gray-600">
                Here you can customize your AI model preferences, code theme,
                and notification settings.
              </p>
              <div className="mt-6">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                  Coming Soon 🚀
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default App;
