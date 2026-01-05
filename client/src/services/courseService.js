/**
 * Course Service
 * Handles all course-related API calls
 */

import { apiGet } from './api';

/**
 * Fetch all courses
 * @param {string} category - Optional category filter ('program' | 'short-term')
 * @returns {Promise<Array>} Array of courses
 */
export const fetchCourses = async (category = null) => {
  const path = category ? `/courses?category=${encodeURIComponent(category)}` : '/courses';
  const data = await apiGet(path);
  return (data && data.data) || [];
};

/**
 * Fetch a single course by slug
 * @param {string} slug - Course slug
 * @returns {Promise<Object>} Course object
 */
export const fetchCourseBySlug = async (slug) => {
  const data = await apiGet(`/courses/${encodeURIComponent(slug)}`);
  return (data && data.data) || null;
};

