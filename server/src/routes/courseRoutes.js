/**
 * Course Routes
 * Defines endpoints for course operations
 */

import express from 'express';
import { getCourses, getCourseBySlug } from '../controllers/courseController.js';

const router = express.Router();

// Public routes (no authentication required for viewing courses)
router.get('/', getCourses);
router.get('/:slug', getCourseBySlug);

export default router;

