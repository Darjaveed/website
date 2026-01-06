import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CourseCard from './CourseCard';
import { Link } from 'react-router-dom';
import { fetchCourses } from '../services/courseService';

const ShortTermSection = ({ title = 'Short-Term Programs', category = 'short-term', initialCourses = null }) => {
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

  const shortTermColor = theme.accent; // Using accent color for short-term programs

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
        setError(err.message || 'Failed to load short-term programs');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    if (initialCourses && initialCourses.length > 0) {
      setLoading(false);
    } else {
      load();
    }

    return () => { mounted = false; };
  }, [category, initialCourses]);

  // Loading skeleton specifically for short-term
  const ShortTermLoadingSkeleton = () => (
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
            borderColor: `${shortTermColor}20`
          }}
        >
          <div className="h-48" style={{ backgroundColor: theme.secondary }} />
          <div className="p-6 space-y-4">
            <div className="h-6 rounded" style={{ backgroundColor: theme.primary }} />
            <div className="h-4 rounded" style={{ backgroundColor: theme.secondary }} />
            <div className="h-4 rounded w-2/3" style={{ backgroundColor: theme.secondary }} />
            <div className="flex justify-between items-center pt-4">
              <div className="h-8 w-24 rounded" style={{ backgroundColor: shortTermColor }} />
              <div className="h-10 w-28 rounded" style={{ backgroundColor: theme.primary }} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  // Short-term specific features
  const shortTermFeatures = [
    { icon: '⚡', label: 'Fast Learning', description: 'Quick skill acquisition' },
    { icon: '🎯', label: 'Focused Topics', description: 'Specific skill sets' },
    { icon: '🕒', label: 'Flexible Schedule', description: 'Learn at your pace' },
    { icon: '💼', label: 'Career Boost', description: 'Immediate application' },
  ];

  return (
    <section className="py-16 md:py-20 lg:py-24 relative overflow-hidden" style={{ backgroundColor: theme.background }}>
      {/* Background decorative elements - Short-term specific */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Lightning bolt pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 text-6xl">⚡</div>
          <div className="absolute bottom-1/3 right-1/4 text-4xl">⚡</div>
          <div className="absolute top-1/3 right-1/3 text-5xl">⚡</div>
        </div>
        
        <motion.div
          className="absolute top-20 -right-20 w-80 h-80 rounded-full opacity-5"
          style={{ backgroundColor: shortTermColor }}
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 -left-20 w-64 h-64 rounded-full opacity-5"
          style={{ backgroundColor: theme.secondary }}
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, -45, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header section - Short-term specific */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Lightning bolt header */}
          <motion.div
            className="inline-flex items-center justify-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
          >
            <div className="relative">
              <motion.div
                className="w-24 h-24 rounded-2xl flex items-center justify-center shadow-xl"
                style={{ 
                  backgroundColor: shortTermColor + '15',
                  border: `3px solid ${shortTermColor}30`
                }}
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <motion.span
                  className="text-4xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  ⚡
                </motion.span>
              </motion.div>
              
              {/* Speed badge */}
              <motion.div
                className="absolute -top-2 -right-2 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                style={{ backgroundColor: shortTermColor }}
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                  scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <span className="text-white text-sm font-bold">🏃</span>
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
              style={{ color: shortTermColor }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Accelerate Your Career in Weeks, Not Years
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
            Master in-demand skills quickly with our intensive, focused programs designed for immediate career impact.
          </motion.p>

          {/* Short-term features */}
          <motion.div
            className="flex flex-wrap justify-center gap-6 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {shortTermFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center px-4 py-2 rounded-full bg-white shadow-sm border"
                style={{ 
                  borderColor: `${shortTermColor}30`,
                  backgroundColor: `${shortTermColor}08`
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-xl mr-2">{feature.icon}</span>
                <div className="text-left">
                  <div className="text-sm font-semibold" style={{ color: theme.primary }}>
                    {feature.label}
                  </div>
                  <div className="text-xs" style={{ color: theme.secondary }}>
                    {feature.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Speed divider */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="relative">
            <div className="h-1 w-40 rounded-full" style={{ backgroundColor: `${shortTermColor}30` }} />
            <motion.div
              className="absolute top-1/2 left-0 h-3 w-3 rounded-full -translate-y-1/2"
              style={{ backgroundColor: shortTermColor }}
              animate={{ x: [0, 160, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

        {/* Courses content */}
        <AnimatePresence mode="wait">
          {loading ? (
            <ShortTermLoadingSkeleton />
          ) : error ? (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6"
                style={{ 
                  backgroundColor: `${shortTermColor}15`,
                  border: `2px solid ${shortTermColor}30`
                }}
              >
                <span className="text-4xl">⚠️</span>
              </div>
              <h3 className="text-2xl font-semibold mb-3" style={{ color: theme.primary }}>
                Unable to load short-term programs
              </h3>
              <p className="mb-6 max-w-md mx-auto" style={{ color: theme.secondary }}>
                {error}
              </p>
              <motion.button
                onClick={() => window.location.reload()}
                className="px-6 py-3 rounded-xl font-semibold transition-all"
                style={{
                  backgroundColor: shortTermColor,
                  color: theme.primary
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
                  backgroundColor: `${shortTermColor}15`,
                  border: `2px solid ${shortTermColor}30`
                }}
              >
                <span className="text-4xl">⚡</span>
              </div>
              <h3 className="text-2xl font-semibold mb-3" style={{ color: theme.primary }}>
                No short-term courses available
              </h3>
              <p className="max-w-md mx-auto mb-6" style={{ color: theme.secondary }}>
                New accelerated courses coming soon. Check back for fast-track learning opportunities.
              </p>
              <Link
                to="/programs"
                className="inline-block px-6 py-3 rounded-xl font-semibold transition-all"
                style={{
                  backgroundColor: theme.primary,
                  color: theme.light
                }}
              >
                Browse All Programs
              </Link>
            </motion.div>
          ) : (
            <>
              {/* Speed stats */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                {[
                  { value: "4-12", label: "Weeks Duration", icon: "🕒" },
                  { value: "10-20", label: "Hours/Week", icon: "⏱️" },
                  { value: "100%", label: "Online", icon: "💻" },
                  { value: "24/7", label: "Access", icon: "🌐" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="p-5 rounded-2xl text-center border"
                    style={{ 
                      backgroundColor: 'white',
                      borderColor: `${shortTermColor}20`,
                      boxShadow: '0 4px 12px rgba(47, 62, 70, 0.05)'
                    }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className="text-2xl font-bold mb-1" style={{ color: shortTermColor }}>
                      {stat.value}
                    </div>
                    <div className="text-sm font-medium" style={{ color: theme.secondary }}>
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Courses grid */}
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
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                <div className="relative inline-flex">
                  {/* Glow effect */}
                  <motion.div
                    className="absolute -inset-4 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                    style={{ backgroundColor: shortTermColor }}
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
                      backgroundColor: shortTermColor,
                      color: theme.primary
                    }}
                  >
                    <span className="flex items-center">
                      View All Short-Term Programs
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
                    
                    {/* Speed lines effect */}
                    <div className="absolute inset-0 overflow-hidden rounded-xl">
                      {[1, 2, 3].map((i) => (
                        <motion.div
                          key={i}
                          className="absolute top-0 h-full w-px"
                          style={{ backgroundColor: theme.primary, left: `${i * 25}%` }}
                          animate={{ y: ['-100%', '100%'] }}
                          transition={{ 
                            duration: 1, 
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: "linear"
                          }}
                        />
                      ))}
                    </div>
                  </Link>
                </div>
                
                {/* Additional info */}
                <motion.p 
                  className="mt-6 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
                  style={{ color: theme.secondary }}
                >
                  {courses.length * 5}+ short-term courses available for immediate start
                </motion.p>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Bottom speed indicators */}
        <motion.div
          className="mt-16 flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div className="flex items-center space-x-4 mb-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: shortTermColor }}
                animate={{ 
                  y: [0, -8, 0],
                  scale: [1, 1.5, 1]
                }}
                transition={{ 
                  duration: 1, 
                  repeat: Infinity, 
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
          <div className="text-sm font-medium" style={{ color: theme.secondary }}>
            Start learning today • Certificates in weeks • Career-ready skills
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ShortTermSection;