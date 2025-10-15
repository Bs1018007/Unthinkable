import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log(`Created upload directory: ${uploadDir}`);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(`Saving file: ${file.originalname}`);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const sanitized = file.originalname.replace(/\s+/g, '_');
    const finalName = `${timestamp}-${sanitized}`;
    console.log(` Final file name: ${finalName}`);
    cb(null, finalName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.js', '.jsx', '.ts', '.tsx', '.py', '.java', '.cpp', '.c', '.go', '.rb'];
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedExtensions.includes(ext)) {
    console.log(`Accepted file type: ${ext}`);
    cb(null, true);
  } else {
    console.error(`Rejected file type: ${ext}`);
    cb(new Error('Only code files are allowed!'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
});

export default upload;
