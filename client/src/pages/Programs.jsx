/**
 * Programs Page
 * Displays all programs and short-term courses from API with fallback to static data
 */

import { useState, useEffect } from 'react';
import CourseCard from '../components/CourseCard';
import { fetchCourses } from '../services/courseService';
import { getCoursesByCategory } from '../data/courses'; // Fallback static data

const Programs = () => {
  const [programCourses, setProgramCourses] = useState([]);
  const [shortTermCourses, setShortTermCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      // Try to fetch from API
      const allCourses = await fetchCourses();
      
      if (allCourses && allCourses.length > 0) {
        // Use API data
        setProgramCourses(allCourses.filter(c => c.category === 'program'));
        setShortTermCourses(allCourses.filter(c => c.category === 'short-term'));
      } else {
        // Fallback to static data
        setProgramCourses(getCoursesByCategory('program'));
        setShortTermCourses(getCoursesByCategory('short-term'));
      }
    } catch (error) {
      // Fallback to static data on error
      setProgramCourses(getCoursesByCategory('program'));
      setShortTermCourses(getCoursesByCategory('short-term'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Programs Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Programs
            </h1>
            <p className="text-gray-600 text-lg">
              Comprehensive courses designed for career advancement
            </p>
          </div>
          {loading ? (
            <div className="text-center py-12">Loading courses...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programCourses.map((course) => (
                <CourseCard key={course._id || course.id} course={course} />
              ))}
            </div>
          )}
        </section>

        {/* Short-Term Programs Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Short-Term Programs
            </h2>
            <p className="text-gray-600 text-lg">
              Quick courses to learn new skills and boost your career
            </p>
          </div>
          {loading ? (
            <div className="text-center py-12">Loading courses...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {shortTermCourses.map((course) => (
                <CourseCard key={course._id || course.id} course={course} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Programs;
