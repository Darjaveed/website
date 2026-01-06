import Course from '../models/Course.js';
import Module from '../models/Module.js';
import Lesson from '../models/Lesson.js';
import Assignment from '../models/Assignment.js';
import Notes from '../models/Notes.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getCourses = asyncHandler(async (req, res) => {
  console.log('[admin] GET /api/admin/courses');
  const courses = await Course.find().sort({ createdAt: -1 });
  console.log(`[admin] Found ${courses.length} courses`);
  res.json(courses);
});

export const createCourse = asyncHandler(async (req, res) => {
  console.log('[admin] POST /api/admin/courses', req.body && { title: req.body.title });
  const payload = req.body;
  const course = new Course(payload);
  await course.save();
  console.log('[admin] Course created:', course._id);
  res.status(201).json(course);
});

export const updateCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log('[admin] PUT /api/admin/courses/:id', { id });
  const payload = req.body;
  const course = await Course.findByIdAndUpdate(id, payload, { new: true });
  if (!course) {
    console.log('[admin] Course not found:', id);
    return res.status(404).json({ message: 'Course not found' });
  }
  console.log('[admin] Course updated:', course._id);
  res.json(course);
});

export const deleteCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log('[admin] DELETE /api/admin/courses/:id', { id });
  const course = await Course.findByIdAndDelete(id);
  if (!course) {
    console.log('[admin] Course not found:', id);
    return res.status(404).json({ message: 'Course not found' });
  }
  console.log('[admin] Course deleted:', course._id);
  res.json({ success: true, message: 'Course deleted' });
});

export const createModule = asyncHandler(async (req, res) => {
  console.log('[admin] POST /api/admin/modules', req.body && { title: req.body.title, courseId: req.body.courseId });
  const { title, courseId } = req.body;
  if (!title || !courseId) {
    console.log('[admin] Missing title or courseId');
    return res.status(400).json({ message: 'Missing title or courseId' });
  }
  
  // Validate course exists
  const course = await Course.findById(courseId);
  if (!course) {
    console.log('[admin] Invalid courseId:', courseId);
    return res.status(400).json({ message: 'Invalid courseId' });
  }
  
  const module = new Module({ title, courseId });
  await module.save();
  console.log('[admin] Module created:', module._id);
  res.status(201).json(module);
});

export const getModulesByCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  console.log('[admin] GET /api/admin/modules/:courseId', { courseId });
  const modules = await Module.find({ courseId }).sort({ order: 1, createdAt: 1 });
  console.log(`[admin] Found ${modules.length} modules for course ${courseId}`);
  res.json(modules);
});

export const createLesson = asyncHandler(async (req, res) => {
  console.log('[admin] POST /api/admin/lessons', req.body && { title: req.body.title, moduleId: req.body.moduleId });
  const { title, moduleId, type = 'video', videoUrl = null, assignmentDescription = null } = req.body;
  if (!title || !moduleId) {
    console.log('[admin] Missing title or moduleId');
    return res.status(400).json({ message: 'Missing title or moduleId' });
  }
  
  // Validate module exists
  const module = await Module.findById(moduleId);
  if (!module) {
    console.log('[admin] Invalid moduleId:', moduleId);
    return res.status(400).json({ message: 'Invalid moduleId' });
  }
  
  const lesson = new Lesson({ title, moduleId, type, videoUrl, assignmentDescription });
  await lesson.save();
  console.log('[admin] Lesson created:', lesson._id);
  res.status(201).json(lesson);
});

export const getLessonsByModule = asyncHandler(async (req, res) => {
  const { moduleId } = req.params;
  console.log('[admin] GET /api/admin/lessons/:moduleId', { moduleId });
  const lessons = await Lesson.find({ moduleId }).sort({ order: 1, createdAt: 1 });
  console.log(`[admin] Found ${lessons.length} lessons for module ${moduleId}`);
  res.json(lessons);
});

export const createAssignment = asyncHandler(async (req, res) => {
  console.log('[admin] POST /api/admin/assignments', req.body && { title: req.body.title, moduleId: req.body.moduleId });
  const { title, moduleId, description, dueDate } = req.body;
  if (!title || !moduleId || !description) {
    console.log('[admin] Missing title, moduleId, or description');
    return res.status(400).json({ message: 'Missing title, moduleId, or description' });
  }
  
  // Validate module exists
  const module = await Module.findById(moduleId);
  if (!module) {
    console.log('[admin] Invalid moduleId:', moduleId);
    return res.status(400).json({ message: 'Invalid moduleId' });
  }
  
  const assignment = new Assignment({ title, moduleId, description, dueDate });
  await assignment.save();
  console.log('[admin] Assignment created:', assignment._id);
  res.status(201).json(assignment);
});

export const getAssignmentsByModule = asyncHandler(async (req, res) => {
  const { moduleId } = req.params;
  console.log('[admin] GET /api/admin/assignments/:moduleId', { moduleId });
  const assignments = await Assignment.find({ moduleId }).sort({ order: 1, createdAt: 1 });
  console.log(`[admin] Found ${assignments.length} assignments for module ${moduleId}`);
  res.json(assignments);
});

export const createNotes = asyncHandler(async (req, res) => {
  console.log('[admin] POST /api/admin/notes', req.body && { title: req.body.title, moduleId: req.body.moduleId });
  const { title, moduleId, content } = req.body;
  if (!title || !moduleId || !content) {
    console.log('[admin] Missing title, moduleId, or content');
    return res.status(400).json({ message: 'Missing title, moduleId, or content' });
  }
  
  // Validate module exists
  const module = await Module.findById(moduleId);
  if (!module) {
    console.log('[admin] Invalid moduleId:', moduleId);
    return res.status(400).json({ message: 'Invalid moduleId' });
  }
  
  const notes = new Notes({ title, moduleId, content });
  await notes.save();
  console.log('[admin] Notes created:', notes._id);
  res.status(201).json(notes);
});

export const getNotesByModule = asyncHandler(async (req, res) => {
  const { moduleId } = req.params;
  console.log('[admin] GET /api/admin/notes/:moduleId', { moduleId });
  const notes = await Notes.find({ moduleId }).sort({ order: 1, createdAt: 1 });
  console.log(`[admin] Found ${notes.length} notes for module ${moduleId}`);
  res.json(notes);
});

export default {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  createModule,
  createLesson,
  getModulesByCourse,
  getLessonsByModule,
  createAssignment,
  getAssignmentsByModule,
  createNotes,
  getNotesByModule,
};
