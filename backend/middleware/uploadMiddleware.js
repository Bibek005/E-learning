// middleware/uploadMiddleware.js
const multer = require('multer');
const fs = require('fs');
const path = require('path');

<<<<<<< HEAD
// Ensure directories exist
const BASE_DIR = path.join(__dirname, '..', 'uploads', 'materials');
fs.mkdirSync(BASE_DIR, { recursive: true });

// Use original filename but prepend timestamp to avoid collisions
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, BASE_DIR);
  },
  filename: function (req, file, cb) {
    const ts = Date.now();
    const safeName = file.originalname.replace(/\s+/g, '_');
    cb(null, `${ts}_${safeName}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB limit (adjust if needed)
=======
// Ensure the uploads folder exists
const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');
fs.mkdirSync(UPLOADS_DIR, { recursive: true });

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOADS_DIR); // save all course images here
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const safeName = file.originalname.replace(/\s+/g, '_');
    cb(null, `${timestamp}_${safeName}`);
  }
});

// Only allow images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype;

  if (allowedTypes.test(ext) && allowedTypes.test(mime)) {
    cb(null, true);
  } else {
    cb(new Error('Only .jpeg, .jpg, .png files are allowed!'));
  }
};

// Export multer instance
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB max
>>>>>>> b1303d1fe1895168c6ba5aeb1db09de4cc8c41d0
});

module.exports = upload;
