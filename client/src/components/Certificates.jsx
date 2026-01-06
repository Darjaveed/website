import { motion } from 'framer-motion';
import { Award, CheckCircle, Eye, Download, Share2, Linkedin } from 'lucide-react';

const Certificates = () => {
  const theme = {
    primary: "#2F3E46",
    secondary: "#354F52",
    accent: "#84A98C",
    light: "#CAD2C5",
    background: "#FFFFFF"
  };

  const certificates = [
    {
      id: 1,
      type: "Program Completion",
      level: "Advanced",
      verification: "Online Verifiable",
      features: ["Digital Badge", "LinkedIn Integration", "Shareable URL", "QR Code"],
      recognition: "Industry-Recognized",
      sampleImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop"
    },
    {
      id: 2,
      type: "Specialization",
      level: "Expert",
      verification: "Blockchain Verified",
      features: ["NFT Certificate", "Immutable Record", "Skill Badges", "Portfolio Display"],
      recognition: "Global Recognition",
      sampleImage: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop"
    },
    {
      id: 3,
      type: "Industry Partnership",
      level: "Professional",
      verification: "Co-Branded",
      features: ["Partner Logo", "Industry Standards", "Network Access", "Alumni Status"],
      recognition: "Hiring Priority",
      sampleImage: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=600&fit=crop"
    }
  ];

  const verificationFeatures = [
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Online Verification",
      description: "Employers can verify certificates instantly via unique URL"
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      title: "LinkedIn Integration",
      description: "One-click addition to LinkedIn profile with auto-fill"
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Download Options",
      description: "PDF, PNG, and vector formats for all use cases"
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      title: "Easy Sharing",
      description: "Share via link, email, or social media with one click"
    }
  ];

  return (
    <section className="py-16 md:py-24 lg:py-32 relative overflow-hidden" style={{ backgroundColor: theme.background }}>
      {/* Background Certificate Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(${theme.accent} 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
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
              <Award className="w-8 h-8" style={{ color: theme.accent }} />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: theme.primary }}>
            Industry-Recognized Certificates
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto" style={{ color: theme.secondary }}>
            Earn verifiable certificates that employers trust and recognize globally
          </p>
        </motion.div>

        {/* Certificate Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 lg:mb-16">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border group"
              style={{ borderColor: `${theme.accent}20` }}
              whileHover={{ y: -8 }}
            >
              {/* Certificate Preview */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={cert.sampleImage}
                  alt={cert.type}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Badge */}
                <div className="absolute top-4 right-4">
                  <div className="px-3 py-1 rounded-full text-sm font-bold shadow-lg"
                    style={{ 
                      backgroundColor: theme.accent,
                      color: theme.primary
                    }}>
                    {cert.level}
                  </div>
                </div>
              </div>

              {/* Certificate Details */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold" style={{ color: theme.primary }}>
                    {cert.type} Certificate
                  </h3>
                  <div className="text-xs font-semibold px-2 py-1 rounded"
                    style={{ 
                      backgroundColor: `${theme.accent}15`,
                      color: theme.accent
                    }}>
                    {cert.verification}
                  </div>
                </div>

                <p className="text-sm mb-6" style={{ color: theme.secondary }}>
                  {cert.recognition} certificate with advanced verification features
                </p>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  {cert.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center mr-3"
                        style={{ backgroundColor: `${theme.accent}15` }}>
                        <CheckCircle className="w-3 h-3" style={{ color: theme.accent }} />
                      </div>
                      <span className="text-sm" style={{ color: theme.secondary }}>{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full py-3 rounded-lg font-semibold transition-all hover:shadow-lg"
                  style={{ 
                    backgroundColor: `${theme.accent}15`,
                    color: theme.accent
                  }}>
                  View Sample Certificate
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Verification Features */}
        <motion.div
          className="mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8" style={{ color: theme.primary }}>
            Advanced Verification Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {verificationFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 text-center border hover:shadow-lg transition-all"
                style={{ borderColor: `${theme.accent}20` }}
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.7 }}
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ 
                    backgroundColor: `${theme.accent}15`,
                    color: theme.accent
                  }}>
                  {feature.icon}
                </div>
                <h4 className="font-bold text-lg mb-2" style={{ color: theme.primary }}>
                  {feature.title}
                </h4>
                <p className="text-sm" style={{ color: theme.secondary }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certificate Value Proposition */}
        <motion.div
          className="rounded-2xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          style={{ 
            background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`
          }}
        >
          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4" style={{ color: theme.light }}>
                  Why Our Certificates Matter
                </h3>
                <ul className="space-y-4">
                  {[
                    "94% of hiring managers recognize our certificates",
                    "LinkedIn profile with certificate gets 3x more views",
                    "Average 30% salary hike for certified professionals",
                    "Direct verification reduces hiring process time by 40%"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center mr-4"
                        style={{ backgroundColor: theme.accent }}>
                        <span className="text-white font-bold">{index + 1}</span>
                      </div>
                      <span style={{ color: theme.light }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-shrink-0">
                <div className="bg-white rounded-xl p-8 text-center shadow-lg">
                  <div className="text-4xl font-bold mb-2" style={{ color: theme.primary }}>
                    94%
                  </div>
                  <div className="text-lg font-bold mb-1" style={{ color: theme.primary }}>
                    Employer Recognition
                  </div>
                  <div className="text-sm" style={{ color: theme.secondary }}>
                    Across 500+ companies
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <p className="text-xl font-medium mb-6" style={{ color: theme.secondary }}>
            Earn a certificate that opens doors
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
              style={{ 
                backgroundColor: theme.accent,
                color: theme.primary
              }}>
              View All Certificate Samples
            </button>
            <button className="px-8 py-4 rounded-xl font-semibold text-lg border hover:shadow-lg transition-all"
              style={{ 
                borderColor: theme.primary,
                color: theme.primary
              }}>
              Verify a Certificate
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certificates;