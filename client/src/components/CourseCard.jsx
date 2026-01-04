/**
 * CourseCard Component
 * Displays a course card with thumbnail, title, description, and link
 */

import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  return (
    <Link 
      to={`/course/${course.slug}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
    >
      {/* Thumbnail */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        <img 
          src={course.thumbnailImage || course.thumbnail} 
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {/* Category badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            course.category === 'program' 
              ? 'bg-blue-600 text-white' 
              : 'bg-blue-400 text-white'
          }`}>
            {course.category === 'program' ? 'Program' : 'Short-Term'}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {course.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2">
          {course.shortDescription}
        </p>
      </div>
    </Link>
  );
};

export default CourseCard;

