/**
 * Upload Service
 * Handles media uploads to Cloudinary (placeholder for future implementation)
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Upload image to Cloudinary
 * @param {File} file - Image file to upload
 * @returns {Promise<Object>} Upload response with URL
 */
export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${API_URL}/upload/image`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to upload image');
    }

    return data;
  } catch (error) {
    console.error('Upload image error:', error);
    throw error;
  }
};

/**
 * Upload video to Cloudinary
 * @param {File} file - Video file to upload
 * @returns {Promise<Object>} Upload response with URL
 */
export const uploadVideo = async (file) => {
  try {
    const formData = new FormData();
    formData.append('video', file);

    const response = await fetch(`${API_URL}/upload/video`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to upload video');
    }

    return data;
  } catch (error) {
    console.error('Upload video error:', error);
    throw error;
  }
};

