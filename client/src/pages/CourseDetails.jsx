/**
 * Course Details Page
 * Displays detailed information about a single course from API with fallback to static data
 */

import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchCourseBySlug } from '../services/courseService';
import { getCourseBySlug } from '../data/courses'; // Fallback static data

const CourseDetails = () => {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourse();
  }, [slug]);

  const loadCourse = async () => {
    try {
      // Try to fetch from API
      const apiCourse = await fetchCourseBySlug(slug);
      if (apiCourse) {
        setCourse(apiCourse);
      } else {
        // Fallback to static data
        const staticCourse = getCourseBySlug(slug);
        setCourse(staticCourse);
      }
    } catch (error) {
      // Fallback to static data on error
      const staticCourse = getCourseBySlug(slug);
      setCourse(staticCourse);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!course) return;
    
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const exists = cart.find(item => (item._id || item.id) === (course._id || course.id));
    
    if (!exists) {
      cart.push(course);
      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Course added to cart!');
    } else {
      alert('Course already in cart!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <p className="text-gray-600 mb-8">The course you're looking for doesn't exist.</p>
          <Link
            to="/programs"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Browse All Courses
          </Link>
        </div>
      </div>
    );
  }

  // Handle both API and static data formats
  const thumbnail = course.thumbnailImage || course.thumbnail;
  const description = course.description || '';
  const shortDescription = course.shortDescription || '';

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
            <li>/</li>
            <li><Link to="/programs" className="hover:text-blue-600">Programs</Link></li>
            <li>/</li>
            <li className="text-gray-900">{course.title}</li>
          </ol>
        </nav>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Thumbnail */}
          <div className="h-96 bg-gray-200 overflow-hidden">
            <img 
              src={thumbnail} 
              alt={course.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="flex items-center justify-between mb-4">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                course.category === 'program' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-blue-400 text-white'
              }`}>
                {course.category === 'program' ? 'Program' : 'Short-Term Program'}
              </span>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {course.title}
            </h1>

            <p className="text-xl text-gray-600 mb-8">
              {shortDescription}
            </p>

            <div className="prose max-w-none mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">
                {description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Add to Cart
              </button>
              <Link
                to="/login"
                className="flex-1 bg-gray-200 text-gray-800 px-8 py-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors text-center"
              >
                Login to Enroll
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
