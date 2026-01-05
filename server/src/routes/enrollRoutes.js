import express from 'express';
import { enrollInCourse } from '../controllers/lmsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/:courseId', protect, enrollInCourse);

export default router;
