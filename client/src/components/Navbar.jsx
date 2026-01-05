/**
 * Navbar Component
 * Sticky navigation bar with dropdowns for Programs, Short-Term Programs, and More
 * Responsive design with mobile menu
 */

import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchCourses } from '../services/courseService';

const Navbar = ({ onOpenSupport }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const [programCourses, setProgramCourses] = useState([]);
  const [shortTermCourses, setShortTermCourses] = useState([]);

  // Load courses for dropdowns
  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const allCourses = await fetchCourses();
      setProgramCourses((allCourses || []).filter((c) => c.category === 'program'));
      setShortTermCourses((allCourses || []).filter((c) => c.category === 'short-term'));
    } catch (err) {
      setProgramCourses([]);
      setShortTermCourses([]);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const onClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    if (profileOpen) {
      document.addEventListener('mousedown', onClickOutside);
    }
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [profileOpen]);

  const moreMenuItems = [
    { label: 'All Programs', path: '/programs' },
    { label: 'News', path: '/news' },
    { label: 'Reviews', path: '/reviews' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact Us', path: '/contact' },
    { label: 'Assignment & Test Verification', path: '/verify-assignment' },
    { label: 'Verify Certificate', path: '/verify-certificate' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-blue-900">LMS</div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Home
            </Link>

            <Link 
              to="/admin"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Admin Panel
            </Link>

            {/* Programs Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setActiveDropdown('programs')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center">
                Programs
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === 'programs' && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 border border-gray-200">
                  {programCourses.map((course) => (
                    <Link
                      key={course._id || course.id}
                      to={`/course/${course.slug}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      onClick={() => setActiveDropdown(null)}
                    >
                      {course.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link 
              to="/jobs" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Jobs
            </Link>

            {/* Short-Term Programs Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setActiveDropdown('short-term')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center">
                Short-Term Programs
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === 'short-term' && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 border border-gray-200">
                  {shortTermCourses.map((course) => (
                    <Link
                      key={course._id || course.id}
                      to={`/course/${course.slug}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      onClick={() => setActiveDropdown(null)}
                    >
                      {course.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* More Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setActiveDropdown('more')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center">
                More
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === 'more' && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 border border-gray-200">
                  {moreMenuItems.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      onClick={() => setActiveDropdown(null)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link 
              to="/cart" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Cart
            </Link>

            {/* Get Support Button */}
            <button
              onClick={() => onOpenSupport && onOpenSupport()}
              className="bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 font-medium transition-colors"
            >
              Get Support
            </button>

            {isAuthenticated ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen((s) => !s)}
                  className="flex items-center space-x-2 bg-white hover:bg-gray-50 px-3 py-2 rounded-md border border-gray-200"
                >
                  <span className="text-gray-700 font-medium">{user?.name}</span>
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg py-2 border border-gray-200 z-40">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      onClick={() => setProfileOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => { setProfileOpen(false); navigate('/lms'); }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      LMS
                    </button>
                    <button
                      onClick={async () => { setProfileOpen(false); await handleLogout(); }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
                  Sign up
                </Link>
                <Link 
                  to="/login" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium transition-colors"
                >
                  Login
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </Link>
            <button
              onClick={() => {
                toggleMobileMenu();
                onOpenSupport && onOpenSupport();
              }}
              className="text-gray-700 focus:outline-none px-2 py-1"
            >
              Get Support
            </button>
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link 
              to="/" 
              className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/admin" 
              className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Admin Panel
            </Link>
            
            <div>
              <button 
                onClick={() => handleDropdown('programs-mobile')}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-md flex items-center justify-between"
              >
                Programs
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === 'programs-mobile' && (
                <div className="pl-4 space-y-1">
                  {programCourses.map((course) => (
                    <Link
                      key={course._id || course.id}
                      to={`/course/${course.slug}`}
                      className="block px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 rounded-md"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setActiveDropdown(null);
                      }}
                    >
                      {course.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link 
              to="/jobs" 
              className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Jobs
            </Link>

            <div>
              <button 
                onClick={() => handleDropdown('short-term-mobile')}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-md flex items-center justify-between"
              >
                Short-Term Programs
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === 'short-term-mobile' && (
                <div className="pl-4 space-y-1">
                  {shortTermCourses.map((course) => (
                    <Link
                      key={course._id || course.id}
                      to={`/course/${course.slug}`}
                      className="block px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 rounded-md"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setActiveDropdown(null);
                      }}
                    >
                      {course.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div>
              <button 
                onClick={() => handleDropdown('more-mobile')}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-md flex items-center justify-between"
              >
                More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === 'more-mobile' && (
                <div className="pl-4 space-y-1">
                  {moreMenuItems.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className="block px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 rounded-md"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setActiveDropdown(null);
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {isAuthenticated ? (
              <div className="px-4 py-2 space-y-2">
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-md"
                >
                  Profile
                </Link>
                <Link
                  to="/lms"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-md"
                >
                  LMS
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="block px-4 py-2 bg-blue-600 text-white text-center rounded-md hover:bg-blue-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
