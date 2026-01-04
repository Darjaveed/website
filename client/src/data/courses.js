/**
 * Static course data for the LMS platform
 * Contains 6 courses: 3 programs and 3 short-term courses
 */

export const courses = [
  // Programs (3 courses)
  {
    id: 1,
    title: "Full Stack Web Development",
    slug: "full-stack-web-development",
    category: "program",
    shortDescription: "Master frontend and backend development with modern technologies",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
    previewVideo: null,
    description: "A comprehensive program covering HTML, CSS, JavaScript, React, Node.js, and database management. Build real-world projects and become a full-stack developer."
  },
  {
    id: 2,
    title: "Data Science & Analytics",
    slug: "data-science-analytics",
    category: "program",
    shortDescription: "Learn data analysis, machine learning, and visualization techniques",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    previewVideo: null,
    description: "Deep dive into data science with Python, pandas, numpy, matplotlib, and machine learning algorithms. Perfect for aspiring data scientists and analysts."
  },
  {
    id: 3,
    title: "Digital Marketing Mastery",
    slug: "digital-marketing-mastery",
    category: "program",
    shortDescription: "Comprehensive digital marketing strategies and tools",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    previewVideo: null,
    description: "Master SEO, social media marketing, content creation, email marketing, and analytics. Build a successful career in digital marketing."
  },
  
  // Short-Term Programs (3 courses)
  {
    id: 4,
    title: "Python Basics for Beginners",
    slug: "python-basics-beginners",
    category: "short-term",
    shortDescription: "Learn Python programming from scratch in 4 weeks",
    thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800",
    previewVideo: null,
    description: "Perfect introduction to Python programming. Learn syntax, data structures, functions, and basic algorithms. No prior experience needed."
  },
  {
    id: 5,
    title: "UI/UX Design Fundamentals",
    slug: "ui-ux-design-fundamentals",
    category: "short-term",
    shortDescription: "Essential design principles and tools for creating user-friendly interfaces",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
    previewVideo: null,
    description: "Learn design thinking, wireframing, prototyping, and user testing. Master tools like Figma and Adobe XD to create beautiful interfaces."
  },
  {
    id: 6,
    title: "Introduction to Cloud Computing",
    slug: "introduction-cloud-computing",
    category: "short-term",
    shortDescription: "Understand cloud services, AWS basics, and deployment strategies",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
    previewVideo: null,
    description: "Get started with cloud computing concepts, AWS services, and learn how to deploy applications to the cloud. Essential for modern developers."
  }
];

/**
 * Get courses by category
 * @param {string} category - 'program' or 'short-term'
 * @returns {Array} Filtered courses
 */
export const getCoursesByCategory = (category) => {
  return courses.filter(course => course.category === category);
};

/**
 * Get course by slug
 * @param {string} slug - Course slug
 * @returns {Object|null} Course object or null
 */
export const getCourseBySlug = (slug) => {
  return courses.find(course => course.slug === slug) || null;
};

