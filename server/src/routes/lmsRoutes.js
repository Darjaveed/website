import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getMyCourses, getCourseModules, getModuleLessons, postProgress, getCourseProgress, enrollInCourse } from '../controllers/lmsController.js';

const router = express.Router();

router.use(protect);

router.get('/my-courses', getMyCourses);
router.post('/enroll', enrollInCourse);
router.get('/course/:courseId/modules', getCourseModules);
router.get('/module/:moduleId/lessons', getModuleLessons);
router.post('/progress', postProgress);
router.get('/progress/:courseId', getCourseProgress);

export default router;
