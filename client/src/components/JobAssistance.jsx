import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Users, 
  TrendingUp, 
  FileText, 
  Video, 
  CheckCircle,
  Award,
  MessageSquare
} from 'lucide-react';

const JobAssistance = () => {
  const theme = {
    primary: "#2F3E46",
    secondary: "#354F52",
    accent: "#84A98C",
    light: "#CAD2C5",
    background: "#FFFFFF"
  };

  const assistanceFeatures = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Resume Building",
      description: "ATS-optimized resume templates & personalized review",
      stats: "98% ATS Success Rate"
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: "Mock Interviews",
      description: "Practice with industry experts & real-time feedback",
      stats: "50+ Interview Patterns"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "1:1 Career Mentorship",
      description: "Weekly sessions with dedicated career coaches",
      stats: "100+ Expert Mentors"
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Job Portal Access",
      description: "Exclusive access to 500+ hiring partners",
      stats: "500+ Companies"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Salary Negotiation",
      description: "Learn negotiation strategies from HR professionals",
      stats: "30% Avg. Salary Hike"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "LinkedIn Optimization",
      description: "Profile makeover & networking strategies",
      stats: "5x Profile Views"
    }
  ];

  const placementStats = [
    { value: "94%", label: "Placement Rate", icon: "🎯" },
    { value: "30%", label: "Average Salary Hike", icon: "💰" },
    { value: "500+", label: "Hiring Partners", icon: "🤝" },
    { value: "15 Days", label: "Avg. Time to Offer", icon: "⚡" }
  ];

  return (
    <section className="py-16 md:py-24 lg:py-32 relative overflow-hidden" style={{ backgroundColor: theme.background }}>
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Network pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke={theme.primary} strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Floating elements */}
        <motion.div
          className="absolute top-1/4 right-10 w-16 h-16 rounded-full"
          style={{ backgroundColor: theme.accent, opacity: 0.1 }}
          animate={{ y: [0, -20, 0], rotate: [0, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-10 w-24 h-24 rounded-full"
          style={{ backgroundColor: theme.primary, opacity: 0.1 }}
          animate={{ y: [0, 20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl"
              style={{ backgroundColor: `${theme.accent}15`, border: `2px solid ${theme.accent}30` }}>
              <Briefcase className="w-8 h-8" style={{ color: theme.accent }} />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: theme.primary }}>
            Complete Job Assistance Program
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto" style={{ color: theme.secondary }}>
            End-to-end career support from resume to offer letter with 94% placement success rate
          </p>
        </motion.div>

        {/* Placement Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {placementStats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-6 text-center shadow-lg border"
              style={{ borderColor: `${theme.accent}20` }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold mb-1" style={{ color: theme.primary }}>
                {stat.value}
              </div>
              <div className="text-sm font-medium" style={{ color: theme.secondary }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Assistance Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 lg:mb-16">
          {assistanceFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-lg border group hover:shadow-xl transition-all duration-300"
              style={{ 
                borderColor: `${theme.accent}20`,
                transform: 'translateY(0)'
              }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ 
                    backgroundColor: `${theme.accent}15`,
                    color: theme.accent
                  }}>
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2" style={{ color: theme.primary }}>
                    {feature.title}
                  </h3>
                  <p className="mb-3" style={{ color: theme.secondary }}>
                    {feature.description}
                  </p>
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold"
                    style={{ 
                      backgroundColor: `${theme.accent}10`,
                      color: theme.accent
                    }}>
                    {feature.stats}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Job Guarantee Banner */}
        <motion.div
          className="rounded-2xl overflow-hidden shadow-2xl mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          style={{ 
            background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`
          }}
        >
          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  <Award className="w-8 h-8 mr-3" style={{ color: theme.light }} />
                  <h3 className="text-2xl font-bold" style={{ color: theme.light }}>
                    94% Placement Guarantee
                  </h3>
                </div>
                <p className="text-lg mb-6" style={{ color: '#CAD2C5' }}>
                  Complete the program with 80%+ score, participate in placement activities, 
                  and if you don't get placed within 6 months, get 100% refund.
                </p>
                <ul className="space-y-3">
                  {['Complete course with 80%+ score', 'Attend all placement sessions', 
                    'Apply to minimum 50 companies', 'Participate in mock interviews'].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-3" style={{ color: theme.accent }} />
                      <span style={{ color: theme.light }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-shrink-0">
                <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                  <div className="text-5xl font-bold mb-2" style={{ color: theme.primary }}>
                    94%
                  </div>
                  <div className="text-lg font-bold mb-1" style={{ color: theme.primary }}>
                    Success Rate
                  </div>
                  <div className="text-sm" style={{ color: theme.secondary }}>
                    Across 5,000+ students
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="inline-flex flex-col items-center space-y-6">
            <p className="text-xl font-medium" style={{ color: theme.secondary }}>
              Ready to launch your tech career?
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
                style={{ 
                  backgroundColor: theme.accent,
                  color: theme.primary
                }}>
                Book Free Career Consultation
              </button>
              <button className="px-8 py-4 rounded-xl font-semibold text-lg border hover:shadow-lg transition-all"
                style={{ 
                  borderColor: theme.primary,
                  color: theme.primary
                }}>
                Download Placement Brochure
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default JobAssistance;