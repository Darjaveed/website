import express from 'express';
import adminController from '../controllers/adminController.js';

const router = express.Router();

// Courses
router.get('/courses', adminController.getCourses);
router.post('/courses', adminController.createCourse);
router.put('/courses/:id', adminController.updateCourse);
router.delete('/courses/:id', adminController.deleteCourse);

// Modules
router.post('/modules', adminController.createModule);
router.get('/modules/:courseId', adminController.getModulesByCourse);

// Lessons
router.post('/lessons', adminController.createLesson);
router.get('/lessons/:moduleId', adminController.getLessonsByModule);

// Assignments
router.post('/assignments', adminController.createAssignment);
router.get('/assignments/:moduleId', adminController.getAssignmentsByModule);

// Notes
router.post('/notes', adminController.createNotes);
router.get('/notes/:moduleId', adminController.getNotesByModule);

export default router;
