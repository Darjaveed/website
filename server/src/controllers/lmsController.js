import Enrollment from '../models/Enrollment.js';
import Module from '../models/Module.js';
import Lesson from '../models/Lesson.js';
import Assignment from '../models/Assignment.js';
import Notes from '../models/Notes.js';
import Progress from '../models/Progress.js';
import Course from '../models/Course.js';

// POST /api/lms/enroll
export const enrollInCourse = async (req, res) => {
  try {
    // Accept courseId from body or params
    const courseId = req.body.courseId || req.params.courseId;
    if (!courseId) return res.status(400).json({ success: false, message: 'courseId required' });

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });

    const existing = await Enrollment.findOne({ userId: req.user._id, courseId });
    if (existing) {
      if (existing.status !== 'active') {
        existing.status = 'active';
        await existing.save();
      }
      return res.status(200).json({ success: true, message: 'Already enrolled', data: existing });
    }

    const enrollment = await Enrollment.create({ userId: req.user._id, courseId, status: 'active' });

    res.status(201).json({ success: true, data: enrollment });
  } catch (err) {
    console.error('enrollInCourse error', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// GET /api/lms/my-courses
export const getMyCourses = async (req, res) => {
  try {
    const userId = req.user._id;
    const enrollments = await Enrollment.find({ userId, status: 'active' }).lean();
    const courseIds = enrollments.map(e => e.courseId);
    const courses = await Course.find({ _id: { $in: courseIds } }).select('title slug shortDescription thumbnailImage').lean();
    res.status(200).json({ success: true, data: courses });
  } catch (err) {
    console.error('getMyCourses error', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// GET /api/lms/course/:courseId/modules
export const getCourseModules = async (req, res) => {
  try {
    const { courseId } = req.params;
    // Ensure user is enrolled
    const enrolled = await Enrollment.findOne({ userId: req.user._id, courseId, status: 'active' });
    if (!enrolled && req.user.role !== 'super_admin') {
      return res.status(403).json({ success: false, message: 'Not enrolled in this course' });
    }
    const modules = await Module.find({ courseId }).sort({ order: 1 }).lean();
    res.status(200).json({ success: true, data: modules });
  } catch (err) {
    console.error('getCourseModules error', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// GET /api/lms/module/:moduleId/lessons
export const getModuleLessons = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const module = await Module.findById(moduleId).lean();
    if (!module) return res.status(404).json({ success: false, message: 'Module not found' });

    const enrolled = await Enrollment.findOne({ userId: req.user._id, courseId: module.courseId, status: 'active' });
    if (!enrolled && req.user.role !== 'super_admin') {
      return res.status(403).json({ success: false, message: 'Not enrolled in this course' });
    }

    const lessons = await Lesson.find({ moduleId }).sort({ order: 1 }).lean();
    res.status(200).json({ success: true, data: lessons });
  } catch (err) {
    console.error('getModuleLessons error', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// GET /api/lms/module/:moduleId/assignments
export const getModuleAssignments = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const module = await Module.findById(moduleId).lean();
    if (!module) return res.status(404).json({ success: false, message: 'Module not found' });

    const enrolled = await Enrollment.findOne({ userId: req.user._id, courseId: module.courseId, status: 'active' });
    if (!enrolled && req.user.role !== 'super_admin') {
      return res.status(403).json({ success: false, message: 'Not enrolled in this course' });
    }

    const assignments = await Assignment.find({ moduleId }).sort({ order: 1 }).lean();
    res.status(200).json({ success: true, data: assignments });
  } catch (err) {
    console.error('getModuleAssignments error', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// GET /api/lms/module/:moduleId/notes
export const getModuleNotes = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const module = await Module.findById(moduleId).lean();
    if (!module) return res.status(404).json({ success: false, message: 'Module not found' });

    const enrolled = await Enrollment.findOne({ userId: req.user._id, courseId: module.courseId, status: 'active' });
    if (!enrolled && req.user.role !== 'super_admin') {
      return res.status(403).json({ success: false, message: 'Not enrolled in this course' });
    }

    const notes = await Notes.find({ moduleId }).sort({ order: 1 }).lean();
    res.status(200).json({ success: true, data: notes });
  } catch (err) {
    console.error('getModuleNotes error', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// POST /api/lms/progress
export const postProgress = async (req, res) => {
  try {
    const { lessonId, completed } = req.body;
    if (!lessonId) return res.status(400).json({ success: false, message: 'lessonId required' });

    // Ensure lesson exists and user is allowed
    const lesson = await Lesson.findById(lessonId).lean();
    if (!lesson) return res.status(404).json({ success: false, message: 'Lesson not found' });

    const enrolled = await Enrollment.findOne({ userId: req.user._id, courseId: lesson.moduleId ? (await Module.findById(lesson.moduleId)).courseId : null, status: 'active' });
    // allow super_admin
    if (!enrolled && req.user.role !== 'super_admin') {
      // continue but don't allow progress
      return res.status(403).json({ success: false, message: 'Not enrolled in this course' });
    }

    const existing = await Progress.findOne({ userId: req.user._id, lessonId });
    if (existing) {
      existing.completed = !!completed;
      await existing.save();
      return res.status(200).json({ success: true, data: existing });
    }

    const progress = await Progress.create({ userId: req.user._id, lessonId, completed: !!completed });
    res.status(201).json({ success: true, data: progress });
  } catch (err) {
    console.error('postProgress error', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// GET /api/lms/progress/:courseId
export const getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    // Find lessons for course
    const modules = await Module.find({ courseId }).lean();
    const moduleIds = modules.map(m => m._id);
    const lessons = await Lesson.find({ moduleId: { $in: moduleIds } }).lean();
    const lessonIds = lessons.map(l => l._id);
    const progresses = await Progress.find({ userId: req.user._id, lessonId: { $in: lessonIds } }).lean();
    res.status(200).json({ success: true, data: { lessons, progresses } });
  } catch (err) {
    console.error('getCourseProgress error', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


