/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Login user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} User data and token
 */
export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for cookies
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

/**
 * Register user
 * @param {string} name
 * @param {string} email
 * @param {string} password
 */
export const register = async (name, email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    return data;
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
};

/**
 * Get current authenticated user
 * @returns {Promise<Object>} Current user data
 */
export const getCurrentUser = async () => {
  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      method: 'GET',
      credentials: 'include', // Important for cookies
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to get user');
    }

    return data;
  } catch (error) {
    console.error('Get current user error:', error);
    throw error;
  }
};

/**
 * Logout user
 * @returns {Promise<Object>} Logout response
 */
export const logout = async () => {
  try {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Logout failed');
    }

    return data;
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

