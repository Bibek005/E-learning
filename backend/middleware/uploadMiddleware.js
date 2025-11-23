// middleware/uploadMiddleware.js
const multer = require('multer');
const fs = require('fs');
const path = require('path');

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
});

module.exports = upload;
