import { motion } from 'framer-motion';

const AboutUs = () => {
  // Theme colors matching your design
  const theme = {
    primary: "#2F3E46",
    secondary: "#354F52",
    accent: "#84A98C",
    light: "#CAD2C5",
    text: "#2F3E46",
    background: "#FFFFFF" // White background
  };

  return (
    <section className="py-16 md:py-24 lg:py-32 relative overflow-hidden" style={{ backgroundColor: theme.background }}>
      {/* Background Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Shape 1 - Top Right */}
        <motion.div
          className="absolute top-20 right-10 w-64 h-64 rounded-full opacity-5"
          style={{ backgroundColor: theme.accent }}
          animate={{ 
            x: [0, 10, 0],
            y: [0, -10, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Shape 2 - Bottom Left */}
        <motion.div
          className="absolute bottom-20 left-10 w-80 h-80 rounded-full opacity-5"
          style={{ backgroundColor: theme.primary }}
          animate={{ 
            x: [0, -15, 0],
            y: [0, 15, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        
        {/* Shape 3 - Center */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-3"
          style={{ backgroundColor: theme.secondary }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="order-2 lg:order-1"
          >
            {/* Section Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mb-6"
            >
              <div 
                className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider uppercase"
                style={{
                  backgroundColor: theme.accent + '20',
                  color: theme.primary,
                  border: `1px solid ${theme.accent}40`
                }}
              >
                ABOUT US
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ color: theme.primary }}
            >
              Explore Your Future:
              <br />
              <span style={{ color: theme.secondary }}>Learn Anytime,</span>
              <br />
              <span style={{ color: theme.accent }}>Succeed Anywhere</span>
            </motion.h2>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-6"
            >
              <p className="text-lg leading-relaxed" style={{ color: theme.secondary }}>
                At <span className="font-semibold" style={{ color: theme.primary }}>UpstairsX</span>, we're committed to equipping ambitious people with the capability and self-assurance to succeed in today's quick-paced digital environment. Our vision is straightforward—to accelerate your career achievement through industry-specific training, hands-on experience through real-world projects, and mentorship from experienced professionals, all available online for your convenience.
              </p>
              
              <p className="text-lg leading-relaxed" style={{ color: theme.secondary }}>
                Whether you're starting out or want to advance your skills, our courses are carefully crafted to keep you ahead of the game. With emphasis on practical education, individual guidance, and palpable outcomes, we make sure that each student is positioned for success.
              </p>
            </motion.div>

            {/* Key Features with Checkmarks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[
                {
                  title: "Project Experience",
                  description: "Real-world projects to build practical skills",
                  icon: "✓",
                  color: theme.accent
                },
                {
                  title: "100% Job Assistance",
                  description: "Complete support for your career journey",
                  icon: "✓",
                  color: theme.primary
                },
                {
                  title: "Sessions by Experts",
                  description: "Learn from industry professionals",
                  icon: "✓",
                  color: theme.secondary
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="p-5 rounded-xl group hover:shadow-lg transition-all duration-300 border"
                  style={{
                    backgroundColor: 'white',
                    borderColor: feature.color + '30'
                  }}
                  whileHover={{ y: -3 }}
                >
                  <div className="flex items-start space-x-3">
                    <motion.div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ 
                        backgroundColor: feature.color + '15',
                        border: `2px solid ${feature.color}30`
                      }}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                    >
                      <span className="text-lg font-bold" style={{ color: feature.color }}>
                        {feature.icon}
                      </span>
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1" style={{ color: theme.primary }}>
                        {feature.title}
                      </h3>
                      <p className="text-sm" style={{ color: theme.secondary }}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button - Register Now */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-10"
            >
              <button className="px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                style={{
                  backgroundColor: theme.accent,
                  color: theme.primary
                }}
              >
                <span className="relative z-10 flex items-center justify-center">
                  Register Now
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" 
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </button>
              
              {/* Placement Support Badge */}
              <motion.div
                className="mt-6 inline-flex items-center px-4 py-2 rounded-full"
                style={{
                  backgroundColor: theme.primary + '10',
                  border: `1px solid ${theme.primary}30`
                }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2" 
                  style={{ backgroundColor: theme.primary }}>
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="font-medium" style={{ color: theme.primary }}>
                  Placement Support
                </span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="order-1 lg:order-2 relative"
          >
            {/* Main Visual Container */}
            <div className="relative">
              {/* Stats Card - 29+ Wonderful Awards */}
              <motion.div
                className="absolute -top-6 -left-6 bg-white rounded-2xl p-6 shadow-2xl z-20"
                style={{ border: `2px solid ${theme.accent}` }}
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2" style={{ color: theme.primary }}>
                    29+
                  </div>
                  <div className="text-sm font-semibold uppercase tracking-wider" style={{ color: theme.accent }}>
                    Wonderful Awards
                  </div>
                  <div className="mt-2 flex justify-center space-x-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: theme.accent }}
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Main Image/Visual */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl h-96 lg:h-[500px]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#2F3E46] via-[#354F52] to-[#52796F]">
                  {/* Animated grid pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `linear-gradient(${theme.accent} 1px, transparent 1px), linear-gradient(90deg, ${theme.accent} 1px, transparent 1px)`,
                      backgroundSize: '40px 40px',
                    }} />
                  </div>
                  
                  {/* Content inside visual */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                    <motion.div
                      className="text-6xl mb-6"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      🏆
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-4 text-center" style={{ color: theme.light }}>
                      Award-Winning Education
                    </h3>
                    <p className="text-lg text-center max-w-md" style={{ color: '#CAD2C5' }}>
                      Recognized for excellence in online learning and career outcomes
                    </p>
                  </div>
                  
                  {/* Floating elements */}
                  <motion.div
                    className="absolute top-6 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: theme.accent }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <span className="text-xl font-bold" style={{ color: theme.primary }}>↑</span>
                  </motion.div>
                  
                  <motion.div
                    className="absolute bottom-6 left-6 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: theme.primary }}
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <span className="text-lg font-bold" style={{ color: theme.light }}>✓</span>
                  </motion.div>
                </div>
              </div>

              {/* Additional Stats Cards */}
              <motion.div
                className="absolute -bottom-8 -right-8 bg-white rounded-2xl p-5 shadow-2xl"
                style={{ border: `2px solid ${theme.secondary}` }}
                initial={{ opacity: 0, x: 20, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" 
                    style={{ backgroundColor: theme.secondary + '20' }}>
                    <span className="text-xl">👨‍🎓</span>
                  </div>
                  <div>
                    <div className="text-2xl font-bold" style={{ color: theme.primary }}>5K+</div>
                    <div className="text-sm font-medium" style={{ color: theme.secondary }}>Students</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom Stats */}
            <div className="mt-12 grid grid-cols-2 gap-4">
              {[
                { value: "94%", label: "Placement Rate", icon: "📈" },
                { value: "50+", label: "Hiring Partners", icon: "🤝" },
                { value: "1:1", label: "Mentorship", icon: "🎯" },
                { value: "24/7", label: "Support", icon: "📱" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="p-4 rounded-xl text-center"
                  style={{ 
                    backgroundColor: 'white',
                    border: `1px solid ${theme.accent}20`,
                    boxShadow: '0 4px 12px rgba(47, 62, 70, 0.05)'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  <div className="text-xl mb-1">{stat.icon}</div>
                  <div className="text-2xl font-bold mb-1" style={{ color: theme.primary }}>
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium" style={{ color: theme.secondary }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;