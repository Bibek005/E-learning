// routes/materialRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const upload = require('../middleware/uploadMiddleware');

const {
  createMaterial,
  getMaterialsByCourse,
  getMaterial,
  updateMaterial,
  deleteMaterial,
} = require('../controllers/materialController');

// Teacher creates material (multipart for file)
router.post('/', auth, role('teacher'), upload.single('file'), createMaterial);

// Teacher updates metadata (title/content)
router.put('/:id', auth, role('teacher'), updateMaterial);

// Teacher deletes material
router.delete('/:id', auth, role('teacher'), deleteMaterial);

// Students / Public: list materials for a course
router.get('/course/:courseId', auth, getMaterialsByCourse); // keep auth so only logged-in users access; remove auth if public

// Get single material details
router.get('/:id', auth, getMaterial);

module.exports = router;
