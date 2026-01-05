/**
 * Programs Page
 * Displays all programs and short-term courses from API with fallback to static data
 */

import { useState, useEffect } from 'react';
import CourseCard from '../components/CourseCard';
import { postEnroll } from '../services/lmsApi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchCourses } from '../services/courseService';

const Programs = () => {
  const [programCourses, setProgramCourses] = useState([]);
  const [shortTermCourses, setShortTermCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const allCourses = await fetchCourses();
      setProgramCourses(allCourses.filter((c) => c.category === 'program'));
      setShortTermCourses(allCourses.filter((c) => c.category === 'short-term'));
    } catch (err) {
      setError(err.message || 'Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleEnroll = async (courseId) => {
    if (!isAuthenticated) return navigate('/login');
    try {
      await postEnroll(courseId);
      alert('Enrolled successfully');
      navigate('/lms');
    } catch (err) {
      alert(err.message || 'Enroll failed');
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
          ) : error ? (
            <div className="text-center py-12 text-red-600">{error}</div>
          ) : programCourses.length === 0 ? (
            <div className="text-center py-12">No programs available.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programCourses.map((course) => (
                <div key={course._id || course.id} className="relative">
                  <CourseCard course={course} />
                  <div className="p-4">
                    <button onClick={() => handleEnroll(course._id)} className="w-full bg-green-600 text-white px-4 py-2 rounded-md mt-2">Enroll</button>
                  </div>
                </div>
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
          ) : error ? (
            <div className="text-center py-12 text-red-600">{error}</div>
          ) : shortTermCourses.length === 0 ? (
            <div className="text-center py-12">No short-term courses available.</div>
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
