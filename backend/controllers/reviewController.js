import Review from '../models/Review.js';
import { analyzeCode } from './aiService.js';
import fs from 'fs/promises';

export const createReview = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const code = await fs.readFile(req.file.path, 'utf-8');
    const language = req.body.language || detectLanguage(req.file.originalname);

    const aiResult = await analyzeCode(code, language);
    console.log("AI analysis completed", aiResult);

    if (!aiResult.success) {
      return res.status(500).json({
        success: false,
        message: 'Error analyzing code',
        error: aiResult.error
      });
    }

    const review = new Review({
      fileName: req.file.originalname,
      code,
      language,
      reviewReport: aiResult.review,
      suggestions: extractSuggestions(aiResult.review),
      score: extractScore(aiResult.review)
    });

    await review.save();
    await fs.unlink(req.file.path);

    res.status(201).json({
      success: true,
      data: review
    });

  } catch (error) {
    console.error('Review Creation Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .sort({ createdAt: -1 })
      .select('-code');

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching reviews',
      error: error.message
    });
  }
};

export const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    res.status(200).json({
      success: true,
      data: review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching review',
      error: error.message
    });
  }
};

const detectLanguage = (filename) => {
  const ext = filename.split('.').pop().toLowerCase();
  const languageMap = {
    'js': 'JavaScript',
    'jsx': 'JavaScript (React)',
    'ts': 'TypeScript',
    'tsx': 'TypeScript (React)',
    'py': 'Python',
    'java': 'Java',
    'cpp': 'C++',
    'c': 'C',
    'go': 'Go',
    'rb': 'Ruby'
  };
  return languageMap[ext] || 'Unknown';
};

const extractSuggestions = (reviewText) => {
  const suggestions = [];
  const lines = reviewText.split('\n');
  lines.forEach(line => {
    if (line.toLowerCase().includes('suggest') || 
        line.toLowerCase().includes('should') || 
        line.toLowerCase().includes('recommend')) {
      suggestions.push(line.trim());
    }
  });
  return suggestions.slice(0, 5);
};

const extractScore = (reviewText) => {
  const scoreMatch = reviewText.match(/score[:\s]+(\d+)/i);
  return scoreMatch ? parseInt(scoreMatch[1]) : 75;
};
