import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CourseCard from './CourseCard';
import { Link } from 'react-router-dom';
import { fetchCourses } from '../services/courseService';

const ProgramSection = ({ title = 'Featured Programs', category = 'program', initialCourses = null }) => {
  const [courses, setCourses] = useState(initialCourses || []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Theme colors
  const theme = {
    primary: "#2F3E46",
    secondary: "#354F52",
    accent: "#84A98C",
    light: "#CAD2C5",
    text: "#2F3E46",
    background: "#FFFFFF"
  };

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

  // Category icon based on category
  const getCategoryIcon = () => {
    switch(category) {
      case 'program': return '🎓';
      case 'short-term': return '⚡';
      default: return '📚';
    }
  };

  // Category color based on category
  const getCategoryColor = () => {
    switch(category) {
      case 'program': return theme.primary;
      case 'short-term': return theme.accent;
      default: return theme.secondary;
    }
  };

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: [0.5, 1, 0.5], y: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
          className="rounded-2xl overflow-hidden h-[500px] border"
          style={{ 
            backgroundColor: theme.light,
            borderColor: `${getCategoryColor()}20`
          }}
        >
          <div className="h-48" style={{ backgroundColor: theme.secondary }} />
          <div className="p-6 space-y-4">
            <div className="h-6 rounded" style={{ backgroundColor: theme.primary }} />
            <div className="h-4 rounded" style={{ backgroundColor: theme.secondary }} />
            <div className="h-4 rounded w-2/3" style={{ backgroundColor: theme.secondary }} />
            <div className="flex justify-between items-center pt-4">
              <div className="h-8 w-24 rounded" style={{ backgroundColor: theme.accent }} />
              <div className="h-10 w-28 rounded" style={{ backgroundColor: theme.primary }} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <section className="py-16 md:py-20 lg:py-24 relative overflow-hidden" style={{ backgroundColor: theme.background }}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-24 w-96 h-96 rounded-full opacity-5"
          style={{ backgroundColor: getCategoryColor() }}
          animate={{ 
            x: [0, 20, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-24 w-96 h-96 rounded-full opacity-5"
          style={{ backgroundColor: getCategoryColor() }}
          animate={{ 
            x: [0, -20, 0],
            y: [0, 20, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header section */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Category badge */}
          <motion.div
            className="inline-flex items-center justify-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
          >
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl"
                style={{ 
                  backgroundColor: getCategoryColor() + '15',
                  border: `2px solid ${getCategoryColor()}30`
                }}
              >
                <span className="text-3xl">{getCategoryIcon()}</span>
              </div>
              <motion.div
                className="absolute -top-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                style={{ backgroundColor: getCategoryColor() }}
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <span className="text-white text-sm font-bold">✓</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: theme.primary }}
          >
            {title}
            <motion.span
              className="block text-xl md:text-2xl mt-2 font-normal"
              style={{ color: getCategoryColor() }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {category === 'program' ? 'Comprehensive career programs' : 'Quick skill-building courses'}
            </motion.span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: theme.secondary }}
          >
            {category === 'program' 
              ? 'Deep-dive courses designed for career transformation and long-term professional growth'
              : 'Accelerated learning paths to quickly master in-demand skills and boost your career'}
          </motion.p>

          {/* Stats row */}
          <motion.div
            className="flex flex-wrap justify-center gap-8 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: getCategoryColor() }}>{courses.length || '3'}</div>
              <div className="text-sm font-medium" style={{ color: theme.secondary }}>Featured Courses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: getCategoryColor() }}>94%</div>
              <div className="text-sm font-medium" style={{ color: theme.secondary }}>Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: getCategoryColor() }}>24/7</div>
              <div className="text-sm font-medium" style={{ color: theme.secondary }}>Support</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="h-1 w-32 rounded-full" style={{ backgroundColor: getCategoryColor() }} />
        </motion.div>

        {/* Courses content */}
        <AnimatePresence mode="wait">
          {loading ? (
            <LoadingSkeleton />
          ) : error ? (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6"
                style={{ 
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  border: `2px solid rgba(239, 68, 68, 0.3)`
                }}
              >
                <span className="text-4xl">⚠️</span>
              </div>
              <h3 className="text-2xl font-semibold mb-3" style={{ color: theme.primary }}>
                Unable to load {category === 'program' ? 'programs' : 'courses'}
              </h3>
              <p className="mb-6 max-w-md mx-auto" style={{ color: theme.secondary }}>
                {error}
              </p>
              <motion.button
                onClick={() => window.location.reload()}
                className="px-6 py-3 rounded-xl font-semibold transition-all"
                style={{
                  backgroundColor: getCategoryColor(),
                  color: category === 'program' ? theme.light : theme.primary
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Try Again
              </motion.button>
            </motion.div>
          ) : courses.length === 0 ? (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6"
                style={{ 
                  backgroundColor: theme.light,
                  border: `2px solid ${getCategoryColor()}30`
                }}
              >
                <span className="text-4xl">📚</span>
              </div>
              <h3 className="text-2xl font-semibold mb-3" style={{ color: theme.primary }}>
                No {category === 'program' ? 'programs' : 'courses'} available
              </h3>
              <p className="max-w-md mx-auto" style={{ color: theme.secondary }}>
                Check back soon for new course offerings in this category.
              </p>
            </motion.div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course, index) => (
                  <motion.div
                    key={course._id || course.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: index * 0.15, 
                      duration: 0.5,
                      type: "spring",
                      stiffness: 100
                    }}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <CourseCard course={course} />
                  </motion.div>
                ))}
              </div>

              {/* View all button */}
              <motion.div 
                className="text-center mt-12 lg:mt-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <div className="relative inline-flex">
                  {/* Glow effect */}
                  <motion.div
                    className="absolute -inset-4 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                    style={{ backgroundColor: getCategoryColor() }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  
                  <Link
                    to="/programs"
                    className="relative inline-flex items-center px-8 py-4 rounded-xl font-semibold text-lg shadow-lg group transition-all"
                    style={{
                      backgroundColor: getCategoryColor(),
                      color: category === 'program' ? theme.light : theme.primary
                    }}
                  >
                    <span className="flex items-center">
                      View All {category === 'program' ? 'Programs' : 'Short-Term Courses'}
                      <motion.svg 
                        className="w-5 h-5 ml-3"
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </motion.svg>
                    </span>
                    
                    {/* Button particles */}
                    <motion.div
                      className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                      style={{ backgroundColor: category === 'program' ? theme.light : theme.primary }}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </Link>
                </div>
                
                {/* Additional info */}
                <motion.p 
                  className="mt-6 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  style={{ color: theme.secondary }}
                >
                  Browse our complete catalog with {courses.length * 10}+ {category === 'program' ? 'programs' : 'courses'} available
                </motion.p>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Bottom decorative element */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <div className="flex space-x-2">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: getCategoryColor() }}
                animate={{ 
                  y: [0, -6, 0],
                  scale: [1, 1.3, 1]
                }}
                transition={{ 
                  duration: 1.2, 
                  repeat: Infinity, 
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProgramSection;