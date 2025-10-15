import React, { useState } from 'react';
import { submitCodeReview } from '../services/api';

const FileUpload = ({ onReviewComplete }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [language, setLanguage] = useState('JavaScript');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const languages = [
    'JavaScript',
    'TypeScript',
    'Python',
    'Java',
    'C++',
    'C',
    'Go',
    'Ruby'
  ];

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    validateAndSetFile(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const validateAndSetFile = (file) => {
    const allowedExtensions = ['js', 'jsx', 'ts', 'tsx', 'py', 'java', 'cpp', 'c', 'go', 'rb'];
    const extension = file.name.split('.').pop().toLowerCase();

    if (!allowedExtensions.includes(extension)) {
      setError('Please upload a valid code file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setError('');
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setError('Please select a file');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await submitCodeReview(selectedFile, language);
      onReviewComplete(result.data);
      setSelectedFile(null);
    } catch (err) {
      setError(err.message || 'Failed to submit code for review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Upload Code for Review
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Drag and Drop Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
            accept=".js,.jsx,.ts,.tsx,.py,.java,.cpp,.c,.go,.rb"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center"
          >
            <svg
              className="w-12 h-12 text-gray-400 mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="text-gray-600 mb-2">
              Drag and drop your code file here, or click to browse
            </p>
            <p className="text-sm text-gray-500">
              Supported: .js, .jsx, .ts, .tsx, .py, .java, .cpp, .c, .go, .rb
            </p>
          </label>
        </div>

        {/* Selected File Display */}
        {selectedFile && (
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <span className="text-sm text-gray-700 truncate">
              {selectedFile.name}
            </span>
            <button
              type="button"
              onClick={() => setSelectedFile(null)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        )}

        {/* Language Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Programming Language
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        {/* Error Display */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !selectedFile}
          className={`w-full py-3 px-4 rounded-md font-medium text-white transition-colors ${
            loading || !selectedFile
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Analyzing Code...
            </span>
          ) : (
            'Submit for Review'
          )}
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
