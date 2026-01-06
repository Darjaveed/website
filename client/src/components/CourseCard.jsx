/**
 * CourseCard Component
 * Displays a professional course card with thumbnail, title, description, and interactive elements
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CourseCard = ({ course }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Theme colors matching your design
  const theme = {
    primary: "#2F3E46",
    secondary: "#354F52",
    accent: "#84A98C",
    light: "#CAD2C5",
    text: "#2F3E46",
    background: "#FFFFFF"
  };

  // Get category color and icon
  const getCategoryInfo = () => {
    if (course.category === 'program') {
      return {
        color: theme.primary,
        bgColor: `${theme.primary}15`,
        icon: '🎓',
        label: 'Program'
      };
    } else if (course.category === 'short-term') {
      return {
        color: theme.accent,
        bgColor: `${theme.accent}15`,
        icon: '⚡',
        label: 'Short-Term'
      };
    } else {
      return {
        color: theme.secondary,
        bgColor: `${theme.secondary}15`,
        icon: '📚',
        label: 'Course'
      };
    }
  };

  const categoryInfo = getCategoryInfo();

  // Get difficulty level indicator
  const getDifficultyBadge = (level = 'beginner') => {
    const levels = {
      beginner: { label: 'Beginner', color: theme.accent },
      intermediate: { label: 'Intermediate', color: theme.secondary },
      advanced: { label: 'Advanced', color: theme.primary }
    };
    return levels[level.toLowerCase()] || levels.beginner;
  };

  const difficulty = getDifficultyBadge(course.difficulty);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative h-full"
    >
      <Link 
        to={`/course/${course.slug}`}
        className="block h-full"
      >
        {/* Card Container */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col relative group border"
          style={{ borderColor: `${theme.primary}10` }}
        >
          {/* Hover overlay effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
            style={{ backgroundColor: theme.accent }}
          />

          {/* Top accent bar */}
          <div className="h-1.5 w-full" style={{ backgroundColor: categoryInfo.color }} />

          {/* Thumbnail with gradient overlay */}
          <div className="relative h-48 bg-gradient-to-br from-gray-900 to-gray-700 overflow-hidden">
            <img 
              src={course.thumbnailImage || course.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
              alt={course.title}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60" />
            
            {/* Category badge with icon */}
            <div className="absolute top-4 left-4">
              <div className="flex items-center space-x-2">
                <div 
                  className="px-3 py-1.5 rounded-full flex items-center space-x-1.5 shadow-lg"
                  style={{ 
                    backgroundColor: categoryInfo.bgColor,
                    border: `1px solid ${categoryInfo.color}30`
                  }}
                >
                  <span className="text-sm">{categoryInfo.icon}</span>
                  <span className="text-xs font-semibold tracking-wide" style={{ color: categoryInfo.color }}>
                    {categoryInfo.label}
                  </span>
                </div>
              </div>
            </div>

            {/* Duration badge */}
            {course.duration && (
              <div className="absolute top-4 right-4">
                <div className="px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-sm shadow-sm">
                  <span className="text-xs font-semibold flex items-center" style={{ color: theme.primary }}>
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {course.duration}
                  </span>
                </div>
              </div>
            )}

            {/* Hover view button */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ scale: 0.8 }}
              animate={isHovered ? { scale: 1 } : { scale: 0.8 }}
            >
              <div className="px-6 py-3 rounded-xl shadow-xl flex items-center space-x-2"
                style={{ 
                  backgroundColor: theme.accent,
                  border: `2px solid ${theme.light}`
                }}
              >
                <span className="font-semibold text-sm" style={{ color: theme.primary }}>View Details</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: theme.primary }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </motion.div>
          </div>
          
          {/* Content area */}
          <div className="p-6 flex-1 flex flex-col">
            {/* Title and difficulty */}
            <div className="mb-3">
              <h3 className="text-xl font-bold mb-2 group-hover:underline transition-all" style={{ color: theme.primary }}>
                {course.title}
              </h3>
              
              {/* Difficulty badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: difficulty.color }} />
                  <span className="text-xs font-medium" style={{ color: theme.secondary }}>
                    {difficulty.label}
                  </span>
                </div>
                
                {/* Rating if available */}
                {course.rating && (
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#FBBF24' }}>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-xs font-bold" style={{ color: theme.primary }}>
                      {course.rating}
                    </span>
                    <span className="text-xs ml-1" style={{ color: theme.secondary }}>
                      ({course.reviews || '100+'})
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: theme.secondary }}>
              {course.shortDescription || course.description?.substring(0, 120) + '...'}
            </p>

            {/* Stats row */}
            <div className="flex items-center justify-between text-xs mb-4">
              <div className="flex items-center space-x-3">
                {/* Students enrolled */}
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: theme.accent }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-5.197a6 6 0 00-9 5.197" />
                  </svg>
                  <span style={{ color: theme.secondary }}>
                    {course.enrolled || '500+'}+
                  </span>
                </div>
                
                {/* Modules/lessons */}
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: theme.accent }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span style={{ color: theme.secondary }}>
                    {course.modules || '12'} Modules
                  </span>
                </div>
              </div>
              
              {/* Certificate badge */}
              <div className="flex items-center px-2 py-1 rounded-full" style={{ backgroundColor: `${theme.accent}15` }}>
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: theme.accent }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs font-medium" style={{ color: theme.accent }}>
                  Certificate
                </span>
              </div>
            </div>

            {/* Footer with price and CTA */}
            <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: `${theme.primary}10` }}>
              <div>
                {course.price ? (
                  <div className="flex items-center">
                    <span className="text-lg font-bold mr-2" style={{ color: theme.primary }}>
                      ${course.price}
                    </span>
                    {course.originalPrice && (
                      <span className="text-sm line-through" style={{ color: theme.secondary }}>
                        ${course.originalPrice}
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="text-lg font-bold" style={{ color: theme.accent }}>
                    Free
                  </span>
                )}
              </div>

              {/* Enroll button */}
              <motion.button
                className="px-4 py-2 rounded-lg font-semibold text-sm shadow-sm hover:shadow transition-all"
                style={{ 
                  backgroundColor: theme.primary,
                  color: theme.light
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // Handle enroll action here
                }}
              >
                Enroll Now
              </motion.button>
            </div>
          </div>

          {/* Hot badge for featured courses */}
          {course.featured && (
            <div className="absolute -top-3 -right-3">
              <div className="px-3 py-1 rounded-full shadow-lg flex items-center animate-pulse"
                style={{ 
                  background: `linear-gradient(135deg, ${theme.accent}, ${theme.secondary})`
                }}
              >
                <svg className="w-3 h-3 mr-1" fill="white" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                </svg>
                <span className="text-xs font-bold text-white">Hot</span>
              </div>
            </div>
          )}
        </div>

        {/* Subtle glow on hover */}
        {isHovered && (
          <div className="absolute -inset-4 rounded-3xl opacity-30 blur-xl -z-10 transition-opacity duration-300"
            style={{ backgroundColor: categoryInfo.color }}
          />
        )}
      </Link>
    </motion.div>
  );
};

export default CourseCard;