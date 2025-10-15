import express from 'express';
import upload from '../middleware/upload.js';
import { createReview, getAllReviews, getReviewById } from '../controllers/reviewController.js';

const router = express.Router();

router.post('/review', upload.single('codeFile'), createReview);
router.get('/reviews', getAllReviews);
router.get('/review/:id', getReviewById);

export default router;
