import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Youtube,
  ArrowUpRight,
  Shield,
  Award,
  Users
} from 'lucide-react';

const Footer = () => {
  const theme = {
    primary: "#2F3E46",
    secondary: "#354F52",
    accent: "#84A98C",
    light: "#CAD2C5",
    background: "#FFFFFF",
    text: "#2F3E46"
  };

  const footerLinks = {
    programs: [
      { label: 'Full Stack Development', path: '/programs/full-stack' },
      { label: 'Data Science & AI', path: '/programs/data-science' },
      { label: 'Cloud Computing', path: '/programs/cloud' },
      { label: 'Cybersecurity', path: '/programs/cybersecurity' },
      { label: 'UI/UX Design', path: '/programs/ui-ux' },
      { label: 'DevOps', path: '/programs/devops' }
    ],
    quickLinks: [
      { label: 'Home', path: '/' },
      { label: 'About Us', path: '/about' },
      { label: 'Contact Us', path: '/contact' },
      { label: 'Reviews', path: '/reviews' },
      { label: 'Jobs', path: '/jobs' },
      { label: 'News', path: '/news' }
    ],
    resources: [
      { label: 'Blog', path: '/blog' },
      { label: 'Career Guide', path: '/career-guide' },
      { label: 'Interview Prep', path: '/interview-prep' },
      { label: 'Scholarships', path: '/scholarships' },
      { label: 'Verify Certificate', path: '/verify-certificate' },
      { label: 'Verify Assignment', path: '/verify-assignment' }
    ],
    support: [
      { label: 'Help Center', path: '/help' },
      { label: 'FAQ', path: '/faq' },
      { label: 'Terms of Service', path: '/terms' },
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Refund Policy', path: '/refund' },
      { label: 'Contact Support', path: '/support' }
    ]
  };

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, label: 'Facebook', url: '#' },
    { icon: <Twitter className="w-5 h-5" />, label: 'Twitter', url: '#' },
    { icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn', url: '#' },
    { icon: <Instagram className="w-5 h-5" />, label: 'Instagram', url: '#' },
    { icon: <Youtube className="w-5 h-5" />, label: 'YouTube', url: '#' }
  ];

  const trustBadges = [
    { icon: <Shield className="w-5 h-5" />, label: 'Secure Payment', description: 'SSL Encrypted' },
    { icon: <Award className="w-5 h-5" />, label: 'Award Winning', description: '29+ Awards' },
    { icon: <Users className="w-5 h-5" />, label: '5K+ Students', description: 'Community' }
  ];

  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: theme.primary }}>
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full" style={{ backgroundColor: theme.accent }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full" style={{ backgroundColor: theme.secondary }} />
      </div>

      <div className="relative z-10">
        {/* Newsletter Section */}
        <div className="py-12 border-b" style={{ borderColor: `${theme.accent}20` }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: theme.light }}>
                  Stay Ahead in Your Career
                </h3>
                <p className="text-lg" style={{ color: '#CAD2C5' }}>
                  Get weekly career tips, industry insights, and exclusive course updates
                </p>
              </div>
              <div className="flex-1 max-w-md">
                <form className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      border: `1px solid ${theme.accent}30`,
                      color: theme.light
                    }}
                  />
                  <motion.button
                    type="submit"
                    className="px-6 py-3 rounded-lg font-semibold transition-all"
                    style={{ 
                      backgroundColor: theme.accent,
                      color: theme.primary
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Subscribe
                  </motion.button>
                </form>
                <p className="text-sm mt-3" style={{ color: '#CAD2C5' }}>
                  By subscribing, you agree to our Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {/* Brand Section */}
              <div className="lg:col-span-2">
                <Link to="/" className="inline-flex items-center space-x-2 mb-6">
                  <div className="text-3xl font-bold" style={{ color: theme.light }}>
                    UpstairsX
                  </div>
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.accent }} />
                </Link>
                <p className="mb-6 max-w-md" style={{ color: '#CAD2C5' }}>
                  Empowering 5,000+ learners with industry-relevant skills, expert mentorship, 
                  and guaranteed career outcomes. Your journey to tech excellence starts here.
                </p>
                
                {/* Trust Badges */}
                <div className="flex flex-wrap gap-4 mb-8">
                  {trustBadges.map((badge, index) => (
                    <div key={index} className="flex items-center space-x-2 px-3 py-2 rounded-lg"
                      style={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        border: `1px solid ${theme.accent}20`
                      }}>
                      <div style={{ color: theme.accent }}>
                        {badge.icon}
                      </div>
                      <div>
                        <div className="text-sm font-semibold" style={{ color: theme.light }}>
                          {badge.label}
                        </div>
                        <div className="text-xs" style={{ color: '#CAD2C5' }}>
                          {badge.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Links */}
                <div>
                  <h4 className="font-semibold mb-4" style={{ color: theme.light }}>Follow Us</h4>
                  <div className="flex space-x-3">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.url}
                        className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                        style={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          color: theme.light
                        }}
                        whileHover={{ y: -3 }}
                        aria-label={social.label}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Programs */}
              <div>
                <h4 className="text-lg font-bold mb-6 pb-2 border-b" 
                  style={{ color: theme.light, borderColor: `${theme.accent}30` }}>
                  Programs
                </h4>
                <ul className="space-y-3">
                  {footerLinks.programs.map((link, index) => (
                    <motion.li key={index} whileHover={{ x: 5 }}>
                      <Link
                        to={link.path}
                        className="flex items-center text-sm hover:opacity-80 transition-opacity"
                        style={{ color: '#CAD2C5' }}
                      >
                        <ArrowUpRight className="w-3 h-3 mr-2" style={{ color: theme.accent }} />
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-bold mb-6 pb-2 border-b" 
                  style={{ color: theme.light, borderColor: `${theme.accent}30` }}>
                  Quick Links
                </h4>
                <ul className="space-y-3">
                  {footerLinks.quickLinks.map((link, index) => (
                    <motion.li key={index} whileHover={{ x: 5 }}>
                      <Link
                        to={link.path}
                        className="flex items-center text-sm hover:opacity-80 transition-opacity"
                        style={{ color: '#CAD2C5' }}
                      >
                        <ArrowUpRight className="w-3 h-3 mr-2" style={{ color: theme.accent }} />
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="text-lg font-bold mb-6 pb-2 border-b" 
                  style={{ color: theme.light, borderColor: `${theme.accent}30` }}>
                  Contact Info
                </h4>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Mail className="w-5 h-5 mr-3 flex-shrink-0" style={{ color: theme.accent }} />
                    <div>
                      <div className="text-sm font-semibold" style={{ color: theme.light }}>Email</div>
                      <a href="mailto:info@upstairsx.com" className="text-sm hover:opacity-80 transition-opacity"
                        style={{ color: '#CAD2C5' }}>
                        info@upstairsx.com
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Phone className="w-5 h-5 mr-3 flex-shrink-0" style={{ color: theme.accent }} />
                    <div>
                      <div className="text-sm font-semibold" style={{ color: theme.light }}>Phone</div>
                      <a href="tel:+15551234567" className="text-sm hover:opacity-80 transition-opacity"
                        style={{ color: '#CAD2C5' }}>
                        +1 (555) 123-4567
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <MapPin className="w-5 h-5 mr-3 flex-shrink-0" style={{ color: theme.accent }} />
                    <div>
                      <div className="text-sm font-semibold" style={{ color: theme.light }}>Office</div>
                      <div className="text-sm" style={{ color: '#CAD2C5' }}>
                        123 Tech Street, Suite 500<br />
                        San Francisco, CA 94107
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Resources & Support */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 pt-8 border-t"
              style={{ borderColor: `${theme.accent}20` }}>
              <div>
                <h4 className="font-semibold mb-4" style={{ color: theme.light }}>Resources</h4>
                <div className="flex flex-wrap gap-3">
                  {footerLinks.resources.map((link, index) => (
                    <Link
                      key={index}
                      to={link.path}
                      className="px-3 py-1.5 rounded-full text-sm transition-all hover:scale-105"
                      style={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        color: '#CAD2C5'
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-4" style={{ color: theme.light }}>Support</h4>
                <div className="flex flex-wrap gap-3">
                  {footerLinks.support.map((link, index) => (
                    <Link
                      key={index}
                      to={link.path}
                      className="px-3 py-1.5 rounded-full text-sm transition-all hover:scale-105"
                      style={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        color: '#CAD2C5'
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t" style={{ borderColor: `${theme.accent}20`, backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <p className="text-sm" style={{ color: '#CAD2C5' }}>
                  &copy; {new Date().getFullYear()} UpstairsX. All rights reserved.
                </p>
                <p className="text-xs mt-1" style={{ color: '#CAD2C5' }}>
                  UpstairsX is a registered trademark. All other trademarks are property of their respective owners.
                </p>
              </div>
              
              {/* Payment Methods */}
              <div className="flex items-center space-x-4">
                <div className="text-xs" style={{ color: '#CAD2C5' }}>We accept:</div>
                <div className="flex space-x-2">
                  <div className="w-10 h-6 rounded bg-white flex items-center justify-center text-xs font-bold">
                    Visa
                  </div>
                  <div className="w-10 h-6 rounded bg-white flex items-center justify-center text-xs font-bold">
                    MC
                  </div>
                  <div className="w-10 h-6 rounded bg-white flex items-center justify-center text-xs font-bold">
                    PP
                  </div>
                  <div className="w-10 h-6 rounded bg-white flex items-center justify-center text-xs font-bold">
                    EMI
                  </div>
                </div>
              </div>

              {/* Back to Top */}
              <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-4 py-2 rounded-lg text-sm font-semibold flex items-center"
                style={{ 
                  backgroundColor: theme.accent,
                  color: theme.primary
                }}
                whileHover={{ y: -2 }}
              >
                <span>Back to Top</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Floating Chat Button */}
        <motion.button
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center z-50"
          style={{ 
            backgroundColor: theme.accent,
            color: theme.primary
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full"
            style={{ backgroundColor: '#EF4444' }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;