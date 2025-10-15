import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import { connectDB } from './lib/db.js';
import reviewRoutes from './routes/review.js';

dotenv.config();

const app = express();

connectDB();

if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
  console.log('Created uploads directory');
}

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', reviewRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Server is running' });
});

app.use((err, req, res, next) => {
  console.error(' Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
