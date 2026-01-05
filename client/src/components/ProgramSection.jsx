import { useEffect, useState } from 'react';
import CourseCard from './CourseCard';
import { Link } from 'react-router-dom';
import { fetchCourses } from '../services/courseService';

const ProgramSection = ({ title = 'Featured Programs', category = 'program', initialCourses = null }) => {
  const [courses, setCourses] = useState(initialCourses || []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);
      try {
        const all = await fetchCourses();
        if (!mounted) return;
        const filtered = (all || []).filter((c) => c.category === category).slice(0, 3);
        setCourses(filtered);
      } catch (err) {
        setError(err.message || 'Failed to load programs');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    // If initialCourses provided, use them and skip fetching
    if (initialCourses && initialCourses.length > 0) {
      setLoading(false);
    } else {
      load();
    }

    return () => { mounted = false; };
  }, [category, initialCourses]);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-gray-600 text-lg">Comprehensive courses designed to advance your career</p>
        </div>
        {loading ? (
          <div className="text-center py-12">Loading courses...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-600">{error}</div>
        ) : courses.length === 0 ? (
          <div className="text-center py-12">No programs available.</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <CourseCard key={course._id || course.id} course={course} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link to="/programs" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                View All Programs
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProgramSection;
