/**
 * Course Service
 * Handles all course-related API calls
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Fetch all courses
 * @param {string} category - Optional category filter ('program' | 'short-term')
 * @returns {Promise<Array>} Array of courses
 */
export const fetchCourses = async (category = null) => {
  try {
    let url = `${API_URL}/courses`;
    if (category) {
      url += `?category=${category}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch courses');
    }

    // Return the courses array from the response
    return data.data || [];
  } catch (error) {
    console.error('Fetch courses error:', error);
    throw error;
  }
};

/**
 * Fetch a single course by slug
 * @param {string} slug - Course slug
 * @returns {Promise<Object>} Course object
 */
export const fetchCourseBySlug = async (slug) => {
  try {
    const response = await fetch(`${API_URL}/courses/${slug}`, {
      method: 'GET',
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch course');
    }

    // Return the course object from the response
    return data.data || null;
  } catch (error) {
    console.error('Fetch course by slug error:', error);
    throw error;
  }
};

