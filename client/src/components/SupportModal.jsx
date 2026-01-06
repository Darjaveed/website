import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SupportModal = ({ open, onClose }) => {
  const [form, setForm] = useState({ 
    name: '', 
    phone: '', 
    email: '', 
    country: '', 
    interestedProgram: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Color theme
  const theme = {
    primary: "#2F3E46",
    secondary: "#354F52",
    accent: "#84A98C",
    light: "#CAD2C5",
    text: "#2F3E46",
    border: "#52796F"
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation
    if (!form.name || !form.email) {
      alert('Please provide your name and email');
      return;
    }

    if (!form.email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }

    try {
      setSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Support request submitted:', form);
      setSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setForm({ name: '', phone: '', email: '', country: '', interestedProgram: '', message: '' });
        setSuccess(false);
        onClose && onClose();
      }, 2000);
      
    } catch (err) {
      console.error('Submission error:', err);
      alert('Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div 
          className="fixed inset-0 z-60 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div 
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(47, 62, 70, 0.7)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !submitting && onClose && onClose()}
          />

          {/* Modal */}
          <motion.div 
            className="relative rounded-xl shadow-2xl max-w-md w-full z-70 overflow-hidden"
            style={{ backgroundColor: theme.light }}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Modal Header */}
            <div 
              className="px-6 py-4"
              style={{ backgroundColor: theme.primary }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold" style={{ color: theme.light }}>
                    Get Career Support
                  </h3>
                  <p className="text-sm mt-1" style={{ color: theme.accent }}>
                    We'll help you choose the right path
                  </p>
                </div>
                <button 
                  onClick={() => !submitting && onClose && onClose()}
                  className="text-lg hover:opacity-70 transition-opacity"
                  style={{ color: theme.light }}
                  disabled={submitting}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Success Message */}
            <AnimatePresence>
              {success && (
                <motion.div 
                  className="px-6 py-4"
                  style={{ backgroundColor: theme.accent }}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: theme.primary }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="font-medium" style={{ color: theme.primary }}>
                      Thank you! Our advisor will contact you within 24 hours.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-semibold mb-2" style={{ color: theme.text }}>
                    Full Name *
                  </label>
                  <input 
                    name="name" 
                    value={form.name} 
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all"
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: `1px solid ${theme.border}`,
                      color: theme.text
                    }}
                    placeholder="Enter your name"
                    disabled={submitting}
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-semibold mb-2" style={{ color: theme.text }}>
                    Phone Number
                  </label>
                  <input 
                    name="phone" 
                    value={form.phone} 
                    onChange={handleChange}
                    type="tel"
                    className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all"
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: `1px solid ${theme.border}`,
                      color: theme.text
                    }}
                    placeholder="+1 (123) 456-7890"
                    disabled={submitting}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: theme.text }}>
                  Email Address *
                </label>
                <input 
                  name="email" 
                  type="email" 
                  value={form.email} 
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all"
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: `1px solid ${theme.border}`,
                    color: theme.text
                  }}
                  placeholder="your@email.com"
                  disabled={submitting}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-semibold mb-2" style={{ color: theme.text }}>
                    Country
                  </label>
                  <select 
                    name="country" 
                    value={form.country} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all appearance-none"
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: `1px solid ${theme.border}`,
                      color: theme.text
                    }}
                    disabled={submitting}
                  >
                    <option value="">Select Country</option>
                    <option value="USA">United States</option>
                    <option value="India">India</option>
                    <option value="Canada">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-semibold mb-2" style={{ color: theme.text }}>
                    Interested In
                  </label>
                  <select 
                    name="interestedProgram" 
                    value={form.interestedProgram} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all appearance-none"
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: `1px solid ${theme.border}`,
                      color: theme.text
                    }}
                    disabled={submitting}
                  >
                    <option value="">Select Program</option>
                    <option value="Full Stack Development">Full Stack Development</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="Cloud Computing">Cloud Computing</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: theme.text }}>
                  Additional Message
                </label>
                <textarea 
                  name="message" 
                  value={form.message} 
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all resize-none"
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: `1px solid ${theme.border}`,
                    color: theme.text
                  }}
                  placeholder="Tell us about your goals or questions..."
                  disabled={submitting}
                />
              </div>

              <div className="pt-4">
                <div className="flex items-center mb-4">
                  <input 
                    type="checkbox" 
                    id="consent"
                    required
                    className="mr-2"
                    style={{ accentColor: theme.accent }}
                    disabled={submitting}
                  />
                  <label htmlFor="consent" className="text-sm" style={{ color: theme.text }}>
                    I agree to receive updates and career guidance from UpstairsX
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    type="button"
                    onClick={() => !submitting && onClose && onClose()}
                    className="px-6 py-3 rounded-lg font-semibold transition-all flex-1"
                    style={{ 
                      border: `2px solid ${theme.secondary}`,
                      color: theme.secondary,
                      backgroundColor: 'transparent'
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={submitting}
                  >
                    Cancel
                  </motion.button>

                  <motion.button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-3 rounded-lg font-semibold transition-all flex-1 relative"
                    style={{ 
                      backgroundColor: submitting ? theme.secondary : theme.accent,
                      color: theme.primary
                    }}
                    whileHover={!submitting ? { scale: 1.02 } : {}}
                    whileTap={!submitting ? { scale: 0.98 } : {}}
                  >
                    {submitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" style={{ color: theme.primary }}>
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Submit Request
                      </span>
                    )}
                  </motion.button>
                </div>
              </div>

              <div className="text-center pt-2">
                <p className="text-xs" style={{ color: theme.secondary }}>
                  * Our advisor will contact you within 24 hours
                </p>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SupportModal;