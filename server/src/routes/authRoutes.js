/**
 * Authentication Routes
 * Defines endpoints for user authentication
 */

import express from 'express';
import { login, getCurrentUser, logout } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/login', login);
router.post('/logout', logout);

// Protected routes (require authentication)
router.get('/me', protect, getCurrentUser);

export default router;

