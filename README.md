# Code Review Assistant

A full-stack web application that allows developers to upload code files and get **AI-powered code reviews**. This project leverages **Google Gemini API** for automated code analysis and scores, providing suggestions and identifying potential bugs, performance issues, and code smells.

---

## 🚀 Features

- Upload code files (`.js`, `.jsx`, `.ts`, `.tsx`, `.py`, `.java`, `.cpp`, `.c`, `.go`, `.rb`)
- AI-powered code review using **Google Gemini API**
- Extracts:
  - Overall assessment
  - Specific issues with line references
  - Suggestions for improvement
  - Code quality score (0–100)
- Stores reviews in MongoDB
- Fetch all reviews or a single review by ID
- Frontend built with React + Vite + TailwindCSS**
- File upload handling with Multer
- CORS enabled for secure frontend-backend communication

---

## 🛠 Tech Stack

- Backend: Node.js, Express.js, MongoDB, Mongoose
- Frontend: React, Vite, TailwindCSS
- AI Service:Google Generative AI (Gemini API)
- File Handling: Multer
- Environment Management: dotenv

BACKEND SETUP
 - cd backend
 - npm install

- Create a .env file:
- PORT=5000
- MONGO_URI=your_mongodb_connection_string
- GEMINI_API_KEY=your_google_gemini_api_key
- NODE_ENV = DEVELOPMENT

- Start the server:
- npm run dev

FRONTEND SETUP
- cd frontend
- npm install

- Start the frontend
- npm run dev

