/**
 * Home Page
 * Landing page with hero section, program previews, and features
 */

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CourseCard from '../components/CourseCard';
import { fetchCourses } from '../services/courseService';
import { getCoursesByCategory } from '../data/courses'; // Fallback static data

const Home = () => {
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
        setProgramCourses(allCourses.filter(c => c.category === 'program').slice(0, 3));
        setShortTermCourses(allCourses.filter(c => c.category === 'short-term').slice(0, 3));
      } else {
        // Fallback to static data
        const staticPrograms = getCoursesByCategory('program').slice(0, 3);
        const staticShortTerm = getCoursesByCategory('short-term').slice(0, 3);
        setProgramCourses(staticPrograms);
        setShortTermCourses(staticShortTerm);
      }
    } catch (error) {
      // Fallback to static data on error
      const staticPrograms = getCoursesByCategory('program').slice(0, 3);
      const staticShortTerm = getCoursesByCategory('short-term').slice(0, 3);
      setProgramCourses(staticPrograms);
      setShortTermCourses(staticShortTerm);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to LMS Platform
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Transform your career with our comprehensive learning programs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/programs"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Browse Programs
              </Link>
              <Link
                to="/about"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Programs
            </h2>
            <p className="text-gray-600 text-lg">
              Comprehensive courses designed to advance your career
            </p>
          </div>
          {loading ? (
            <div className="text-center py-12">Loading courses...</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {programCourses.map((course) => (
                  <CourseCard key={course._id || course.id} course={course} />
                ))}
              </div>
              <div className="text-center mt-12">
                <Link
                  to="/programs"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  View All Programs
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Short-Term Programs Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Short-Term Programs
            </h2>
            <p className="text-gray-600 text-lg">
              Quick courses to learn new skills fast
            </p>
          </div>
          {loading ? (
            <div className="text-center py-12">Loading courses...</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {shortTermCourses.map((course) => (
                  <CourseCard key={course._id || course.id} course={course} />
                ))}
              </div>
              <div className="text-center mt-12">
                <Link
                  to="/programs"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  View All Short-Term Programs
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Expert Instructors
              </h3>
              <p className="text-gray-600">
                Learn from industry experts with years of real-world experience
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Quality Content
              </h3>
              <p className="text-gray-600">
                Carefully crafted courses with up-to-date curriculum
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Flexible Learning
              </h3>
              <p className="text-gray-600">
                Learn at your own pace with lifetime access to materials
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
