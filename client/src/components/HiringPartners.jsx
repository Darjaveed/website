import { motion } from 'framer-motion';
import { Building2, Users, MapPin, TrendingUp, CheckCircle } from 'lucide-react';

const HiringPartners = () => {
  const theme = {
    primary: "#2F3E46",
    secondary: "#354F52",
    accent: "#84A98C",
    light: "#CAD2C5",
    background: "#FFFFFF"
  };

  // Company logos - Using real company names with placeholder colors
  const companies = [
    { name: "Microsoft", logo: "🪟", color: "#00A4EF", hires: 120 },
    { name: "Google", logo: "🔍", color: "#4285F4", hires: 85 },
    { name: "Amazon", logo: "📦", color: "#FF9900", hires: 150 },
    { name: "Meta", logo: "📘", color: "#1877F2", hires: 65 },
    { name: "Apple", logo: "🍎", color: "#000000", hires: 45 },
    { name: "Netflix", logo: "🎬", color: "#E50914", hires: 30 },
    { name: "Uber", logo: "🚗", color: "#000000", hires: 55 },
    { name: "Airbnb", logo: "🏠", color: "#FF5A5F", hires: 40 },
    { name: "Spotify", logo: "🎵", color: "#1DB954", hires: 35 },
    { name: "Salesforce", logo: "☁️", color: "#00A1E0", hires: 60 },
    { name: "Adobe", logo: "🎨", color: "#FF0000", hires: 50 },
    { name: "Intel", logo: "💻", color: "#0071C5", hires: 40 }
  ];

  const partnerStats = [
    { value: "500+", label: "Active Partners", icon: <Building2 className="w-6 h-6" /> },
    { value: "2,000+", label: "Placements", icon: <Users className="w-6 h-6" /> },
    { value: "15+", label: "Countries", icon: <MapPin className="w-6 h-6" /> },
    { value: "$85K", label: "Avg. Salary", icon: <TrendingUp className="w-6 h-6" /> }
  ];

  const partnershipBenefits = [
    "Direct hiring pipelines",
    "Preferred candidate status",
    "Exclusive job openings",
    "Fast-track interview process",
    "Higher starting salaries",
    "Relocation assistance"
  ];

  return (
    <section className="py-16 md:py-24 lg:py-32 relative overflow-hidden" style={{ backgroundColor: theme.background }}>
      {/* Network connection pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="connections" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="2" fill={theme.accent} />
              <path d="M50,50 L100,50 M50,50 L50,100 M50,50 L0,50 M50,50 L50,0" 
                stroke={theme.accent} strokeWidth="1" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#connections)" />
        </svg>
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
              <Building2 className="w-8 h-8" style={{ color: theme.accent }} />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: theme.primary }}>
            Our Hiring Partners Network
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto" style={{ color: theme.secondary }}>
            Join 5,000+ alumni placed at top companies worldwide through our exclusive partnerships
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {partnerStats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-6 text-center shadow-lg border hover:shadow-xl transition-all"
              style={{ borderColor: `${theme.accent}20` }}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ 
                    backgroundColor: `${theme.accent}15`,
                    color: theme.accent
                  }}>
                  {stat.icon}
                </div>
              </div>
              <div className="text-3xl font-bold mb-1" style={{ color: theme.primary }}>
                {stat.value}
              </div>
              <div className="text-sm font-medium" style={{ color: theme.secondary }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Company Logos Grid */}
        <motion.div
          className="mb-12 lg:mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8" style={{ color: theme.primary }}>
            Trusted by Industry Leaders
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
            {companies.map((company, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 + 0.7 }}
                className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center shadow-lg border hover:shadow-xl transition-all group"
                style={{ borderColor: `${theme.accent}20` }}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-3">{company.logo}</div>
                <h4 className="font-bold text-center mb-2" style={{ color: theme.primary }}>
                  {company.name}
                </h4>
                <div className="text-xs px-2 py-1 rounded-full font-semibold"
                  style={{ 
                    backgroundColor: `${company.color}15`,
                    color: company.color
                  }}>
                  {company.hires}+ Hires
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Partnership Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: theme.primary }}>
              Partnership Benefits for Students
            </h3>
            <div className="space-y-4">
              {partnershipBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 1 }}
                  className="flex items-start"
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0"
                    style={{ 
                      backgroundColor: `${theme.accent}15`
                    }}>
                    <CheckCircle className="w-4 h-4" style={{ color: theme.accent }} />
                  </div>
                  <span className="text-lg" style={{ color: theme.secondary }}>{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Microsoft Collaboration Highlight */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-white rounded-2xl overflow-hidden shadow-xl border"
            style={{ borderColor: `${theme.accent}20` }}
          >
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center mr-4"
                  style={{ backgroundColor: '#00A4EF', color: 'white' }}>
                  <span className="text-2xl">🪟</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold" style={{ color: theme.primary }}>Microsoft Partnership</h4>
                  <p className="text-sm" style={{ color: theme.secondary }}>Official Learning Partner</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-lg" style={{ backgroundColor: `${theme.accent}05` }}>
                  <div className="text-sm font-semibold mb-1" style={{ color: theme.primary }}>
                    Microsoft Certified Curriculum
                  </div>
                  <p className="text-sm" style={{ color: theme.secondary }}>
                    Courses aligned with Microsoft certification paths
                  </p>
                </div>
                
                <div className="p-4 rounded-lg" style={{ backgroundColor: `${theme.accent}05` }}>
                  <div className="text-sm font-semibold mb-1" style={{ color: theme.primary }}>
                    Direct Hiring Pipeline
                  </div>
                  <p className="text-sm" style={{ color: theme.secondary }}>
                    Exclusive access to Microsoft job openings
                  </p>
                </div>
                
                <div className="p-4 rounded-lg" style={{ backgroundColor: `${theme.accent}05` }}>
                  <div className="text-sm font-semibold mb-1" style={{ color: theme.primary }}>
                    Azure Credits & Tools
                  </div>
                  <p className="text-sm" style={{ color: theme.secondary }}>
                    Free Azure credits for hands-on practice
                  </p>
                </div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold mb-1" style={{ color: theme.primary }}>120+</div>
                <div className="text-sm font-medium" style={{ color: theme.secondary }}>
                  Students placed at Microsoft
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <div className="inline-flex flex-col items-center space-y-6">
            <p className="text-xl font-medium" style={{ color: theme.secondary }}>
              Want to get noticed by these companies?
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
                style={{ 
                  backgroundColor: theme.accent,
                  color: theme.primary
                }}>
                View Partner Job Openings
              </button>
              <button className="px-8 py-4 rounded-xl font-semibold text-lg border hover:shadow-lg transition-all"
                style={{ 
                  borderColor: theme.primary,
                  color: theme.primary
                }}>
                Download Placement Report
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HiringPartners;