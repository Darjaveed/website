import Course from '../models/Course.js';
import Module from '../models/Module.js';
import Lesson from '../models/Lesson.js';

export const getCourses = async (req, res, next) => {
  try {
    console.log('[admin] GET /api/admin/courses');
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    next(err);
  }
};

export const createCourse = async (req, res, next) => {
  try {
    console.log('[admin] POST /api/admin/courses', req.body && { title: req.body.title });
    const payload = req.body;
    const course = new Course(payload);
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    next(err);
  }
};

export const updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log('[admin] PUT /api/admin/courses/:id', { id });
    const payload = req.body;
    const course = await Course.findByIdAndUpdate(id, payload, { new: true });
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) {
    next(err);
  }
};

export const deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log('[admin] DELETE /api/admin/courses/:id', { id });
    const course = await Course.findByIdAndDelete(id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    // Optionally delete modules/lessons: KEEP LMS data same per rules (NO LMS changes)
    res.json({ success: true, message: 'Course deleted' });
  } catch (err) {
    next(err);
  }
};

export const createModule = async (req, res, next) => {
  try {
    console.log('[admin] POST /api/admin/modules', req.body && { title: req.body.title, courseId: req.body.courseId });
    const { title, courseId } = req.body;
    if (!title || !courseId) return res.status(400).json({ message: 'Missing title or courseId' });
    const module = new Module({ title, courseId });
    await module.save();
    res.status(201).json(module);
  } catch (err) {
    next(err);
  }
};

export const getModulesByCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    console.log('[admin] GET /api/admin/modules/:courseId', { courseId });
    const modules = await Module.find({ courseId }).sort({ order: 1, createdAt: 1 });
    res.json(modules);
  } catch (err) {
    next(err);
  }
};

export const createLesson = async (req, res, next) => {
  try {
    console.log('[admin] POST /api/admin/lessons', req.body && { title: req.body.title, moduleId: req.body.moduleId });
    const { title, moduleId, type = 'video', videoUrl = null, assignmentDescription = null } = req.body;
    if (!title || !moduleId) return res.status(400).json({ message: 'Missing title or moduleId' });
    const lesson = new Lesson({ title, moduleId, type, videoUrl, assignmentDescription });
    await lesson.save();
    res.status(201).json(lesson);
  } catch (err) {
    next(err);
  }
};

export const getLessonsByModule = async (req, res, next) => {
  try {
    const { moduleId } = req.params;
    console.log('[admin] GET /api/admin/lessons/:moduleId', { moduleId });
    const lessons = await Lesson.find({ moduleId }).sort({ order: 1, createdAt: 1 });
    res.json(lessons);
  } catch (err) {
    next(err);
  }
};

export default {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  createModule,
  createLesson,
  getModulesByCourse,
  getLessonsByModule,
};
