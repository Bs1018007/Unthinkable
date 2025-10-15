import React from 'react';
import ReactMarkdown from 'react-markdown';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';

const ReviewDisplay = ({ review }) => {
  React.useEffect(() => {
    Prism.highlightAll();
  }, [review]);

  if (!review) {
    return (
      <div className="text-center py-12 text-gray-500">
        <svg
          className="mx-auto h-12 w-12 text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <p>No review yet. Upload a code file to get started!</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="border-b pb-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Code Review Report</h2>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <span>
              <strong>File:</strong> {review.fileName}
            </span>
            <span>
              <strong>Language:</strong> {review.language}
            </span>
          </div>
          {review.score && (
            <div className="flex items-center space-x-2">
              <span className="font-medium">Quality Score:</span>
              <span
                className={`px-3 py-1 rounded-full text-white font-bold ${
                  review.score >= 80
                    ? 'bg-green-500'
                    : review.score >= 60
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
              >
                {review.score}/100
              </span>
            </div>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Reviewed on {new Date(review.createdAt).toLocaleString()}
        </p>
      </div>

      {/* Review Report */}
      <div className="prose max-w-none mb-6">
        <h3 className="text-xl font-semibold mb-3 text-gray-800">AI Analysis</h3>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <ReactMarkdown>{review.reviewReport}</ReactMarkdown>
        </div>
      </div>

      {/* Key Suggestions */}
      {review.suggestions && review.suggestions.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Key Suggestions</h3>
          <ul className="space-y-2">
            {review.suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="flex items-start p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500"
              >
                <svg
                  className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-gray-700">{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Original Code */}
      <div>
        <h3 className="text-xl font-semibold mb-3 text-gray-800">Original Code</h3>
        <pre className="rounded-lg overflow-x-auto">
          <code className={`language-${review.language.toLowerCase()}`}>
            {review.code}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default ReviewDisplay;
