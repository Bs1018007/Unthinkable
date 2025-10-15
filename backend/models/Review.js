import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  reviewReport: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  suggestions: [
    {
      type: String,
    },
  ],
  score: {
    type: Number,
    min: 0,
    max: 100,
  },
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;
