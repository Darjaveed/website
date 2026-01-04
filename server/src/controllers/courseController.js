/**
 * Course Controller
 * Handles course-related operations
 */

import Course from '../models/Course.js';

/**
 * Get All Courses
 * GET /api/courses
 * Optional query params: category (program | short-term), status (published | draft)
 */
export const getCourses = async (req, res) => {
  try {
    const { category, status = 'published' } = req.query;

    // Build query
    const query = { status };
    if (category) {
      query.category = category;
    }

    // Fetch courses from database
    const courses = await Course.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching courses',
    });
  }
};

/**
 * Get Course by Slug
 * GET /api/courses/:slug
 */
export const getCourseBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const course = await Course.findOne({ slug, status: 'published' });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.error('Get course by slug error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching course',
    });
  }
};

