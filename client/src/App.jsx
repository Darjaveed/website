/**
 * App Component
 * Main application component with routing setup
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SupportModal from './components/SupportModal';

// Pages
import Home from './pages/Home';
import Programs from './pages/Programs';
import CourseDetails from './pages/CourseDetails';
import Jobs from './pages/Jobs';
import News from './pages/News';
import Reviews from './pages/Reviews';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Login from './pages/Login';
import VerifyAssignment from './pages/VerifyAssignment';
import VerifyCertificate from './pages/VerifyCertificate';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import LMSLayout from './pages/lms/LMSLayout';
import Dashboard from './pages/lms/Dashboard';
import MyCourses from './pages/lms/MyCourses';
import CoursePlayer from './pages/lms/CoursePlayer';
// Admin
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminCourses from './pages/admin/Courses';
import AdminModules from './pages/admin/Modules';
import AdminLessons from './pages/admin/Lessons';
import AdminAssignments from './pages/admin/Assignments';
import AdminNotes from './pages/admin/Notes';

function App() {
  const [showSupport, setShowSupport] = useState(false);

  useEffect(() => {
    // Show the support form once on initial page load after 5 seconds
    const timer = setTimeout(() => setShowSupport(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar onOpenSupport={() => setShowSupport(true)} />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/course/:slug" element={<CourseDetails />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/news" element={<News />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/lms" element={<LMSLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="courses" element={<MyCourses />} />
                <Route path="course/:slug" element={<CoursePlayer />} />
              </Route>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="courses" element={<AdminCourses />} />
                <Route path="modules/:courseId" element={<AdminModules />} />
                <Route path="lessons/:courseId" element={<AdminLessons />} />
                <Route path="assignments/:courseId" element={<AdminAssignments />} />
                <Route path="notes/:courseId" element={<AdminNotes />} />
              </Route>
              <Route path="/verify-assignment" element={<VerifyAssignment />} />
              <Route path="/verify-certificate" element={<VerifyCertificate />} />
            </Routes>
          </main>
          <Footer />
          <SupportModal open={showSupport} onClose={() => setShowSupport(false)} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
