import React, { useState, useEffect } from 'react';
import { getAllReviews } from '../services/api';

const ReviewHistory = ({ onSelectReview }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const result = await getAllReviews();
      setReviews(result.data);
    } catch (err) {
      setError('Failed to load review history');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        {error}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No reviews yet. Upload your first file!
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Review History</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review._id}
            onClick={() => onSelectReview(review)}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-800">
                  {review.fileName}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {review.language} • {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
              {review.score && (
                <div
                  className={`px-3 py-1 rounded-full text-white font-bold text-sm ${
                    review.score >= 80
                      ? 'bg-green-500'
                      : review.score >= 60
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                >
                  {review.score}/100
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewHistory;
