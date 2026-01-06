import { motion } from 'framer-motion';
import { useState } from 'react';

const WhyChooseUs = () => {
  // Theme colors
  const theme = {
    primary: "#2F3E46",
    secondary: "#354F52",
    accent: "#84A98C",
    light: "#CAD2C5",
    text: "#2F3E46",
    background: "#FFFFFF"
  };

  const [hoveredCard, setHoveredCard] = useState(null);

  const features = [
    {
      icon: '👨‍🏫',
      title: 'Expert Instructors',
      description: 'Learn from industry leaders with 10+ years of real-world experience and Silicon Valley expertise.',
      stats: '50+ Industry Experts',
      color: theme.primary,
      subFeatures: [
        '1:1 Mentorship Sessions',
        'Live Q&A Sessions',
        'Career Guidance'
      ],
      animation: {
        rotate: [0, 5, -5, 0],
        scale: [1, 1.05, 1]
      }
    },
    {
      icon: '🏆',
      title: 'Award-Winning Content',
      description: '29+ award-winning courses with cutting-edge curriculum updated quarterly for industry relevance.',
      stats: '29+ Awards Won',
      color: theme.accent,
      subFeatures: [
        'Industry-Aligned Curriculum',
        'Real-World Projects',
        'Case Studies'
      ],
      animation: {
        y: [0, -8, 0],
        scale: [1, 1.05, 1]
      }
    },
    {
      icon: '⚡',
      title: 'Flexible Learning',
      description: 'Learn at your pace with lifetime access, 24/7 availability, and mobile-optimized learning platform.',
      stats: '24/7 Access',
      color: theme.secondary,
      subFeatures: [
        'Self-Paced Learning',
        'Mobile App Access',
        'Downloadable Content'
      ],
      animation: {
        rotate: [0, 360],
        duration: 20
      }
    },
    {
      icon: '🤝',
      title: 'Job Support',
      description: '94% placement rate with 500+ hiring partners, resume building, and interview preparation.',
      stats: '94% Placement Rate',
      color: theme.accent,
      subFeatures: [
        'Resume Building',
        'Mock Interviews',
        'Job Portal Access'
      ],
      animation: {
        scale: [1, 1.1, 1],
        opacity: [1, 0.8, 1]
      }
    },
    {
      icon: '💻',
      title: 'Hands-On Projects',
      description: 'Build real portfolio with 50+ industry projects, GitHub integration, and live code reviews.',
      stats: '50+ Live Projects',
      color: theme.primary,
      subFeatures: [
        'GitHub Integration',
        'Code Reviews',
        'Portfolio Building'
      ],
      animation: {
        x: [0, 5, 0, -5, 0]
      }
    },
    {
      icon: '🌍',
      title: 'Global Community',
      description: 'Join 5,000+ learners worldwide, network with peers, and access exclusive alumni community.',
      stats: '5K+ Global Learners',
      color: theme.secondary,
      subFeatures: [
        'Networking Events',
        'Alumni Network',
        'Group Projects'
      ],
      animation: {
        rotate: [0, 10, -10, 0]
      }
    }
  ];

  return (
    <section className="py-16 md:py-24 lg:py-32 relative overflow-hidden" style={{ backgroundColor: theme.background }}>
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              backgroundColor: theme.accent,
              width: Math.random() * 4 + 1 + 'px',
              height: Math.random() * 4 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              opacity: 0.1
            }}
            animate={{
              y: [0, Math.random() * 50 - 25, 0],
              x: [0, Math.random() * 30 - 15, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Large background shapes */}
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-5"
          style={{ backgroundColor: theme.primary }}
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full opacity-5"
          style={{ backgroundColor: theme.accent }}
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
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
          {/* Decorative label */}
          <motion.div
            className="inline-block mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div className="relative">
              <div className="px-6 py-2 rounded-full text-sm font-semibold tracking-wider uppercase shadow-lg"
                style={{
                  backgroundColor: theme.accent + '20',
                  color: theme.primary,
                  border: `2px solid ${theme.accent}`
                }}
              >
                Why Choose Us
              </div>
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full"
                style={{ backgroundColor: theme.accent }}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            style={{ color: theme.primary }}
          >
            The UpstairsX Advantage
            <span className="block text-xl md:text-2xl mt-4 font-normal" style={{ color: theme.accent }}>
              Your Success, Our Commitment
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: theme.secondary }}
          >
            We don't just teach skills—we build careers. Here's what sets us apart in your learning journey.
          </motion.p>

          {/* Stats overview */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {[
              { value: '5K+', label: 'Students Transformed', icon: '👨‍🎓' },
              { value: '94%', label: 'Placement Rate', icon: '📈' },
              { value: '50+', label: 'Hiring Partners', icon: '🤝' },
              { value: '29+', label: 'Awards Won', icon: '🏆' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-4 rounded-xl border"
                style={{ 
                  backgroundColor: 'white',
                  borderColor: `${theme.accent}20`,
                  boxShadow: '0 4px 12px rgba(47, 62, 70, 0.05)'
                }}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold mb-1" style={{ color: theme.primary }}>
                  {stat.value}
                </div>
                <div className="text-sm font-medium" style={{ color: theme.secondary }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.1 + 0.8,
                duration: 0.5,
                type: "spring",
                stiffness: 100
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className="relative"
            >
              {/* Card container */}
              <div className="h-full rounded-2xl overflow-hidden border group hover:shadow-2xl transition-all duration-300"
                style={{ 
                  backgroundColor: theme.background,
                  borderColor: hoveredCard === index ? feature.color : `${feature.color}20`,
                  transform: hoveredCard === index ? 'translateY(-8px)' : 'translateY(0)',
                  boxShadow: hoveredCard === index 
                    ? `0 20px 40px ${feature.color}20` 
                    : '0 4px 20px rgba(47, 62, 70, 0.1)'
                }}
              >
                {/* Top accent bar */}
                <div className="h-1.5 w-full" style={{ backgroundColor: feature.color }} />

                {/* Content */}
                <div className="p-6">
                  {/* Icon with animation */}
                  <div className="mb-6">
                    <motion.div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg relative overflow-hidden"
                      style={{ 
                        backgroundColor: `${feature.color}15`,
                        border: `2px solid ${feature.color}30`
                      }}
                      animate={hoveredCard === index ? feature.animation : {}}
                      transition={{ duration: feature.animation.duration || 2, ease: "easeInOut" }}
                    >
                      <span className="text-3xl relative z-10">{feature.icon}</span>
                      
                      {/* Icon glow */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                        style={{ backgroundColor: feature.color }}
                      />
                    </motion.div>

                    {/* Stats badge */}
                    <div className="text-center mb-4">
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold"
                        style={{ 
                          backgroundColor: `${feature.color}15`,
                          color: feature.color,
                          border: `1px solid ${feature.color}30`
                        }}
                      >
                        <motion.span
                          animate={{ scale: hoveredCard === index ? [1, 1.2, 1] : 1 }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          {feature.stats}
                        </motion.span>
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-center mb-3" style={{ color: theme.primary }}>
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-center mb-6 leading-relaxed" style={{ color: theme.secondary }}>
                    {feature.description}
                  </p>

                  {/* Sub-features */}
                  <div className="space-y-2">
                    {feature.subFeatures.map((subFeature, subIndex) => (
                      <motion.div
                        key={subIndex}
                        className="flex items-center text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ 
                          opacity: hoveredCard === index ? 1 : 0.8,
                          x: hoveredCard === index ? 0 : -5
                        }}
                        transition={{ delay: subIndex * 0.1 }}
                      >
                        <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                          style={{ color: feature.color }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                        <span style={{ color: theme.secondary }}>{subFeature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Learn more button - appears on hover */}
                  <motion.div
                    className="mt-6"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: hoveredCard === index ? 1 : 0,
                      height: hoveredCard === index ? 'auto' : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <button className="w-full py-3 rounded-lg font-semibold transition-all group/btn"
                      style={{
                        backgroundColor: feature.color,
                        color: theme.primary
                      }}
                    >
                      <span className="flex items-center justify-center">
                        Learn More
                        <svg className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform"
                          fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    </button>
                  </motion.div>
                </div>
              </div>

              {/* Glow effect behind card */}
              {hoveredCard === index && (
                <div className="absolute -inset-4 rounded-3xl opacity-30 blur-xl -z-10 transition-opacity duration-300"
                  style={{ backgroundColor: feature.color }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          <div className="inline-flex flex-col items-center space-y-6">
            <p className="text-lg font-medium" style={{ color: theme.secondary }}>
              Ready to transform your career?
            </p>
            
            <div className="relative">
              {/* Glow effect */}
              <motion.div
                className="absolute -inset-4 rounded-full blur-xl"
                style={{ backgroundColor: theme.accent }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.3, 0.2]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              <button className="relative px-10 py-4 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 group"
                style={{
                  backgroundColor: theme.accent,
                  color: theme.primary
                }}
              >
                <span className="flex items-center">
                  Start Your Journey Today
                  <svg className="w-5 h-5 ml-3 transform group-hover:translate-x-2 transition-transform"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              {['✓ 7-Day Trial', '✓ Money Back Guarantee', '✓ No Credit Card Required'].map((badge, index) => (
                <div key={index} className="px-3 py-1.5 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: `${theme.accent}15`,
                    color: theme.primary,
                    border: `1px solid ${theme.accent}30`
                  }}
                >
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;