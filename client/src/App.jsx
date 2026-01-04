/**
 * App Component
 * Main application component with routing setup
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

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

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
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
              <Route path="/verify-assignment" element={<VerifyAssignment />} />
              <Route path="/verify-certificate" element={<VerifyCertificate />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
