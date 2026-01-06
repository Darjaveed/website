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
  const programsRef = useRef(null);
  const shortTermRef = useRef(null);
  const moreRef = useRef(null);
  const navRef = useRef(null);
  const leaveTimeoutRef = useRef(null);
  const [programCourses, setProgramCourses] = useState([]);
  const [shortTermCourses, setShortTermCourses] = useState([]);

  // Color theme from hero section: #CAD2C5, #84A98C, #52796F, #354F52, #2F3E46
  const theme = {
    background: "#2F3E46", // Dark background for navbar
    primary: "#354F52",
    secondary: "#52796F",
    accent: "#84A98C",
    light: "#CAD2C5",
    hoverBg: "rgba(133, 169, 140, 0.1)",
  };

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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const onClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null);
        setProfileOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

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
    <nav ref={navRef} className="sticky top-0 z-50 shadow-lg" style={{ backgroundColor: theme.background }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold" style={{ color: theme.light }}>
              UpstairsX
            </div>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.accent }} />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/" 
              className="px-3 py-2 rounded-md font-medium transition-colors"
              style={{ 
                color: theme.light,
                backgroundColor: activeDropdown === 'home' ? theme.hoverBg : 'transparent'
              }}
            >
              Home
            </Link>

            <Link 
              to="/admin"
              className="px-3 py-2 rounded-md font-medium transition-colors"
              style={{ 
                color: theme.light,
                backgroundColor: activeDropdown === 'admin' ? theme.hoverBg : 'transparent'
              }}
            >
              Admin Panel
            </Link>

            {/* Programs Dropdown */}
            <div
              ref={programsRef}
              className="relative"
              onMouseEnter={() => {
                if (leaveTimeoutRef.current) { clearTimeout(leaveTimeoutRef.current); leaveTimeoutRef.current = null; }
                setActiveDropdown('programs');
              }}
              onMouseLeave={() => {
                if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
                leaveTimeoutRef.current = setTimeout(() => setActiveDropdown((prev) => (prev === 'programs' ? null : prev)), 150);
              }}
            >
              <button
                className="px-3 py-2 rounded-md font-medium transition-colors flex items-center"
                style={{ 
                  color: theme.light,
                  backgroundColor: activeDropdown === 'programs' ? theme.hoverBg : 'transparent'
                }}
                onClick={() => setActiveDropdown(activeDropdown === 'programs' ? null : 'programs')}
              >
                Programs
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: theme.accent }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === 'programs' && (
                <div
                  className="absolute left-0 mt-2 w-64 rounded-lg shadow-xl py-2 border z-40"
                  style={{ 
                    backgroundColor: theme.primary,
                    borderColor: theme.secondary
                  }}
                  onMouseEnter={() => {
                    if (leaveTimeoutRef.current) { clearTimeout(leaveTimeoutRef.current); leaveTimeoutRef.current = null; }
                    setActiveDropdown('programs');
                  }}
                  onMouseLeave={() => {
                    if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
                    leaveTimeoutRef.current = setTimeout(() => setActiveDropdown((prev) => (prev === 'programs' ? null : prev)), 150);
                  }}
                >
                  {programCourses.map((course) => (
                    <Link
                      key={course._id || course.id}
                      to={`/course/${course.slug}`}
                      className="block px-4 py-3 text-sm transition-all hover:pl-6"
                      style={{ 
                        color: theme.light,
                        borderLeft: '3px solid transparent'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderLeftColor = theme.accent;
                        e.currentTarget.style.backgroundColor = theme.hoverBg;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderLeftColor = 'transparent';
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
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
              className="px-3 py-2 rounded-md font-medium transition-colors"
              style={{ 
                color: theme.light,
                backgroundColor: activeDropdown === 'jobs' ? theme.hoverBg : 'transparent'
              }}
            >
              Jobs
            </Link>

            {/* Short-Term Programs Dropdown */}
            <div
              ref={shortTermRef}
              className="relative"
              onMouseEnter={() => {
                if (leaveTimeoutRef.current) { clearTimeout(leaveTimeoutRef.current); leaveTimeoutRef.current = null; }
                setActiveDropdown('short-term');
              }}
              onMouseLeave={() => {
                if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
                leaveTimeoutRef.current = setTimeout(() => setActiveDropdown((prev) => (prev === 'short-term' ? null : prev)), 150);
              }}
            >
              <button
                className="px-3 py-2 rounded-md font-medium transition-colors flex items-center"
                style={{ 
                  color: theme.light,
                  backgroundColor: activeDropdown === 'short-term' ? theme.hoverBg : 'transparent'
                }}
                onClick={() => setActiveDropdown(activeDropdown === 'short-term' ? null : 'short-term')}
              >
                Short-Term Programs
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: theme.accent }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === 'short-term' && (
                <div
                  className="absolute left-0 mt-2 w-64 rounded-lg shadow-xl py-2 border z-40"
                  style={{ 
                    backgroundColor: theme.primary,
                    borderColor: theme.secondary
                  }}
                  onMouseEnter={() => {
                    if (leaveTimeoutRef.current) { clearTimeout(leaveTimeoutRef.current); leaveTimeoutRef.current = null; }
                    setActiveDropdown('short-term');
                  }}
                  onMouseLeave={() => {
                    if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
                    leaveTimeoutRef.current = setTimeout(() => setActiveDropdown((prev) => (prev === 'short-term' ? null : prev)), 150);
                  }}
                >
                  {shortTermCourses.map((course) => (
                    <Link
                      key={course._id || course.id}
                      to={`/course/${course.slug}`}
                      className="block px-4 py-3 text-sm transition-all hover:pl-6"
                      style={{ 
                        color: theme.light,
                        borderLeft: '3px solid transparent'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderLeftColor = theme.accent;
                        e.currentTarget.style.backgroundColor = theme.hoverBg;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderLeftColor = 'transparent';
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
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
              ref={moreRef}
              className="relative"
              onMouseEnter={() => {
                if (leaveTimeoutRef.current) { clearTimeout(leaveTimeoutRef.current); leaveTimeoutRef.current = null; }
                setActiveDropdown('more');
              }}
              onMouseLeave={() => {
                if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
                leaveTimeoutRef.current = setTimeout(() => setActiveDropdown((prev) => (prev === 'more' ? null : prev)), 150);
              }}
            >
              <button
                className="px-3 py-2 rounded-md font-medium transition-colors flex items-center"
                style={{ 
                  color: theme.light,
                  backgroundColor: activeDropdown === 'more' ? theme.hoverBg : 'transparent'
                }}
                onClick={() => setActiveDropdown(activeDropdown === 'more' ? null : 'more')}
              >
                More
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: theme.accent }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === 'more' && (
                <div
                  className="absolute left-0 mt-2 w-64 rounded-lg shadow-xl py-2 border z-40"
                  style={{ 
                    backgroundColor: theme.primary,
                    borderColor: theme.secondary
                  }}
                  onMouseEnter={() => {
                    if (leaveTimeoutRef.current) { clearTimeout(leaveTimeoutRef.current); leaveTimeoutRef.current = null; }
                    setActiveDropdown('more');
                  }}
                  onMouseLeave={() => {
                    if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
                    leaveTimeoutRef.current = setTimeout(() => setActiveDropdown((prev) => (prev === 'more' ? null : prev)), 150);
                  }}
                >
                  {moreMenuItems.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className="block px-4 py-3 text-sm transition-all hover:pl-6"
                      style={{ 
                        color: theme.light,
                        borderLeft: '3px solid transparent'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderLeftColor = theme.accent;
                        e.currentTarget.style.backgroundColor = theme.hoverBg;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderLeftColor = 'transparent';
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
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
              className="px-3 py-2 rounded-md font-medium transition-colors flex items-center"
              style={{ color: theme.light }}
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: theme.accent }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Cart
            </Link>

            {/* Get Support Button */}
            <button
              onClick={() => onOpenSupport && onOpenSupport()}
              className="px-4 py-2 rounded-md font-medium transition-all transform hover:scale-105"
              style={{ 
                backgroundColor: theme.accent,
                color: theme.background
              }}
            >
              Get Support
            </button>

            {isAuthenticated ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen((s) => !s)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md"
                  style={{ 
                    backgroundColor: theme.primary,
                    color: theme.light
                  }}
                >
                  <span className="font-medium">{user?.name}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: theme.accent }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {profileOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-44 rounded-lg shadow-xl py-2 border z-40"
                    style={{ 
                      backgroundColor: theme.primary,
                      borderColor: theme.secondary
                    }}
                  >
                    <Link
                      to="/profile"
                      className="block px-4 py-3 text-sm transition-all hover:pl-6"
                      style={{ color: theme.light }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = theme.hoverBg;
                        e.currentTarget.style.paddingLeft = '1.5rem';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.paddingLeft = '1rem';
                      }}
                      onClick={() => setProfileOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => { setProfileOpen(false); navigate('/lms'); }}
                      className="w-full text-left px-4 py-3 text-sm transition-all hover:pl-6"
                      style={{ color: theme.light }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = theme.hoverBg;
                        e.currentTarget.style.paddingLeft = '1.5rem';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.paddingLeft = '1rem';
                      }}
                    >
                      LMS
                    </button>
                    <button
                      onClick={async () => { setProfileOpen(false); await handleLogout(); }}
                      className="w-full text-left px-4 py-3 text-sm transition-all hover:pl-6"
                      style={{ color: theme.light }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = theme.hoverBg;
                        e.currentTarget.style.paddingLeft = '1.5rem';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.paddingLeft = '1rem';
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/signup" 
                  className="font-medium"
                  style={{ color: theme.accent }}
                >
                  Sign up
                </Link>
                <Link 
                  to="/login" 
                  className="px-4 py-2 rounded-md font-medium transition-all transform hover:scale-105"
                  style={{ 
                    backgroundColor: theme.secondary,
                    color: theme.light
                  }}
                >
                  Login
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="p-2 rounded-md" style={{ color: theme.light }}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </Link>
            <button
              onClick={() => {
                toggleMobileMenu();
                onOpenSupport && onOpenSupport();
              }}
              className="p-2 rounded-md font-medium"
              style={{ color: theme.accent }}
            >
              Get Support
            </button>
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md"
              style={{ color: theme.light }}
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
          <div className="md:hidden pb-4 space-y-1 rounded-lg mt-2" style={{ backgroundColor: theme.primary }}>
            <Link 
              to="/" 
              className="block px-4 py-3 rounded-md transition-colors"
              style={{ color: theme.light }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/admin" 
              className="block px-4 py-3 rounded-md transition-colors"
              style={{ color: theme.light }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Admin Panel
            </Link>
            
            <div>
              <button 
                onClick={() => handleDropdown('programs-mobile')}
                className="w-full text-left px-4 py-3 rounded-md flex items-center justify-between transition-colors"
                style={{ color: theme.light }}
              >
                Programs
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === 'programs-mobile' && (
                <div className="pl-6 space-y-1">
                  {programCourses.map((course) => (
                    <Link
                      key={course._id || course.id}
                      to={`/course/${course.slug}`}
                      className="block px-4 py-2 text-sm rounded-md transition-colors"
                      style={{ color: theme.light }}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {course.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link 
              to="/jobs" 
              className="block px-4 py-3 rounded-md transition-colors"
              style={{ color: theme.light }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Jobs
            </Link>

            <div>
              <button 
                onClick={() => handleDropdown('short-term-mobile')}
                className="w-full text-left px-4 py-3 rounded-md flex items-center justify-between transition-colors"
                style={{ color: theme.light }}
              >
                Short-Term Programs
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === 'short-term-mobile' && (
                <div className="pl-6 space-y-1">
                  {shortTermCourses.map((course) => (
                    <Link
                      key={course._id || course.id}
                      to={`/course/${course.slug}`}
                      className="block px-4 py-2 text-sm rounded-md transition-colors"
                      style={{ color: theme.light }}
                      onClick={() => setMobileMenuOpen(false)}
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
                className="w-full text-left px-4 py-3 rounded-md flex items-center justify-between transition-colors"
                style={{ color: theme.light }}
              >
                More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === 'more-mobile' && (
                <div className="pl-6 space-y-1">
                  {moreMenuItems.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className="block px-4 py-2 text-sm rounded-md transition-colors"
                      style={{ color: theme.light }}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {isAuthenticated ? (
              <div className="px-4 py-2 space-y-1">
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-md transition-colors"
                  style={{ color: theme.light }}
                >
                  Profile
                </Link>
                <Link
                  to="/lms"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-md transition-colors"
                  style={{ color: theme.light }}
                >
                  LMS
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 rounded-md font-medium"
                  style={{ 
                    backgroundColor: theme.accent,
                    color: theme.background
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="px-4 py-2 space-y-2">
                <Link 
                  to="/signup" 
                  className="block px-4 py-3 text-center rounded-md font-medium"
                  style={{ 
                    color: theme.accent,
                    border: `1px solid ${theme.accent}`
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign up
                </Link>
                <Link 
                  to="/login" 
                  className="block px-4 py-3 text-center rounded-md font-medium"
                  style={{ 
                    backgroundColor: theme.secondary,
                    color: theme.light
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;