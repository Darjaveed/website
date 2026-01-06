import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import hero1 from "../assets/hero1.jpg";
import hero2 from "../assets/hero2.jpg";
import hero3 from "../assets/hero3.jpg";
import hero4 from "../assets/hero4.jpg";

const images = [hero1, hero2, hero3, hero4];

// Moving banner text
const bannerMessages = [
  "🎯 94% Placement Rate | 💼 500+ Companies Hiring | 🎓 5,000+ Successful Graduates",
  "🤝 1:1 Mentorship | 🚀 Career Support | 💻 Live Projects",
  "📈 Industry-Ready Skills | 🌍 Global Opportunities | ⚡ Fast-Track Learning",
  "🏆 Top-Rated Programs | 📱 24/7 Support | 💰 Affordable Learning"
];

export default function Hero() {
  const [imageIndex, setImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const imgInterval = setInterval(() => {
      if (!isHovered) {
        setImageIndex((prev) => (prev + 1) % images.length);
      }
    }, 4000);

    return () => {
      clearInterval(imgInterval);
    };
  }, [isHovered]);

  // Creative Trust Pill Component
  const CreativeTrustPill = () => (
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: -10 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="inline-flex items-center gap-3 px-5 py-3 rounded-full relative overflow-hidden group"
        style={{
          backgroundColor: "#f0f4f0",
          border: "1px solid #d4ddd4",
          boxShadow: "0 4px 12px rgba(47, 62, 70, 0.1)",
        }}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#84A98C]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        
        {/* Animated avatar group with creative layout */}
        <div className="flex -space-x-2 relative">
          {/* Animated halo effect */}
          <motion.div
            className="absolute -inset-1 rounded-full"
            style={{ border: "2px solid #84A98C", opacity: 0.3 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Avatars with individual animations */}
          {[
            { bg: "from-gray-300 to-gray-400", delay: 0 },
            { bg: "from-gray-400 to-gray-500", delay: 0.1 },
            { bg: "from-gray-500 to-gray-600", delay: 0.2 },
          ].map((avatar, idx) => (
            <motion.div
              key={idx}
              className={`w-7 h-7 rounded-full border-2 border-white shadow-md bg-gradient-to-br ${avatar.bg} relative`}
              animate={{ 
                y: [0, -3, 0],
                rotate: idx % 2 === 0 ? [0, 5, 0] : [0, -5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: avatar.delay,
                ease: "easeInOut",
              }}
            >
              {/* Subtle glow inside avatars */}
              <div className="absolute inset-0 rounded-full bg-white/20 blur-[1px]" />
            </motion.div>
          ))}
          
          {/* Plus sign for additional avatars */}
          <div className="w-7 h-7 rounded-full border-2 border-white bg-gradient-to-br from-[#84A98C] to-[#52796F] flex items-center justify-center shadow-md">
            <span className="text-xs font-bold text-white">+</span>
          </div>
        </div>

        {/* Text with creative styling */}
        <div className="relative">
          <motion.div
            className="flex items-center space-x-2"
            animate={{ x: [0, 2, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-sm font-medium whitespace-nowrap" style={{ color: "#4a5568" }}>
              Trusted by 5k+ students 
            </span>
            
            {/* Animated verification badge */}
            <motion.div
              className="flex items-center justify-center"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: "#84A98C" }}>
                <svg className="w-2 h-2" fill="none" stroke="white" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Subtle underline animation */}
          <motion.div
            className="absolute -bottom-1 left-0 h-0.5"
            style={{ backgroundColor: "#84A98C" }}
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          />
        </div>

        {/* Floating particles */}
        {[...Array(3)].map((_, idx) => (
          <motion.div
            key={idx}
            className="absolute w-1 h-1 rounded-full"
            style={{ backgroundColor: "#84A98C" }}
            animate={{
              y: [0, -10, 0],
              x: [0, 5, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: idx * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );

  // Creative Stats Component
  const CreativeStats = () => (
    <motion.div 
      className="mt-10 flex flex-wrap gap-6 justify-center lg:justify-start"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      {[
        { value: "5K+", label: "Students", icon: "👨‍🎓", color: "#84A98C" },
        { value: "94%", label: "Placement", icon: "🚀", color: "#52796F" },
        { value: "50+", label: "Partners", icon: "🤝", color: "#354F52" },
        { value: "1:1", label: "Mentorship", icon: "🎯", color: "#2F3E46" },
      ].map((stat, index) => (
        <motion.div
          key={index}
          className="text-center p-4 rounded-2xl backdrop-blur-sm relative overflow-hidden group"
          style={{ 
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            border: `1px solid ${stat.color}40`,
            boxShadow: "0 4px 12px rgba(47, 62, 70, 0.1)",
          }}
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Hover effect background */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
            style={{ backgroundColor: stat.color }}
          />
          
          <div className="relative z-10">
            <div className="text-2xl mb-1 transform group-hover:scale-110 transition-transform">
              {stat.icon}
            </div>
            <div className="text-2xl font-bold mb-1" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div className="text-xs font-medium" style={{ color: "#354F52" }}>
              {stat.label}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "#CAD2C5" }}
    >
      {/* Moving Banner - Top of Hero */}
      <div className="overflow-hidden py-3" style={{ backgroundColor: "#2F3E46" }}>
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["100%", "-100%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {[...Array(4)].map((_, index) => (
            <div key={index} className="inline-flex items-center mx-8">
              {bannerMessages.map((msg, i) => (
                <span 
                  key={i} 
                  className="mx-8 text-sm font-semibold"
                  style={{ color: "#CAD2C5" }}
                >
                  {msg}
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-12">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="order-2 lg:order-1"
        >
          {/* Creative Trust Pill */}
          <CreativeTrustPill />

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              style={{ color: "#354F52" }}
            >
              Launch Your{" "}
              <span
                className="relative inline-block"
                style={{ color: "#2F3E46" }}
              >
                <span className="relative z-10">Tech Career</span>
                <motion.div
                  className="absolute bottom-2 left-0 w-full h-3 -z-0"
                  style={{ backgroundColor: "#84A98C", opacity: 0.3 }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </span>{" "}
              <br className="hidden sm:block" />
              <span className="mt-2 block" style={{ color: "#354F52" }}>
                With Real Job Support
              </span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            className="mt-6 text-base sm:text-lg max-w-xl leading-relaxed"
            style={{ color: "#52796F" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            We provide <span className="font-semibold" style={{ color: "#2F3E46" }}>industry-aligned courses</span>, 
            {" "}<span className="font-semibold" style={{ color: "#2F3E46" }}>1:1 expert mentorship</span>, and 
            {" "}<span className="font-semibold" style={{ color: "#2F3E46" }}>direct job placement assistance</span>. 
            Join thousands who've successfully transitioned into high-growth tech roles.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="mt-8 flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.button
              className="px-8 py-4 rounded-xl font-semibold text-white shadow-lg relative overflow-hidden group"
              style={{
                backgroundColor: "#2F3E46",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Explore All Programs
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#84A98C] to-[#52796F] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </motion.button>

            <motion.button
              className="px-8 py-4 rounded-xl font-semibold shadow-lg relative overflow-hidden group"
              style={{
                border: "2px solid #354F52",
                color: "#354F52",
                backgroundColor: "transparent"
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
                Free Career Consultation
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#354F52] to-[#2F3E46] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            </motion.button>
          </motion.div>

          {/* Creative Stats */}
          <CreativeStats />
        </motion.div>

        {/* RIGHT IMAGE SECTION */}
        <motion.div 
          className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] flex items-center justify-center order-1 lg:order-2"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative w-full h-full max-w-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={imageIndex}
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.95, rotateY: 10 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  rotateY: 0,
                  transition: {
                    duration: 0.6,
                    ease: "easeOut"
                  }
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 1.05, 
                  rotateY: -10,
                  transition: {
                    duration: 0.4,
                    ease: "easeIn"
                  }
                }}
              >
                <img
                  src={images[imageIndex]}
                  alt="Career success stories"
                  className="h-full w-auto object-contain rounded-2xl shadow-2xl"
                />
                
                {/* Image indicators */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {images.map((_, idx) => (
                    <motion.div
                      key={idx}
                      className={`w-2 h-2 rounded-full ${idx === imageIndex ? "w-6" : ""}`}
                      style={{ 
                        backgroundColor: idx === imageIndex ? "#84A98C" : "#354F52",
                        opacity: idx === imageIndex ? 1 : 0.5
                      }}
                      animate={idx === imageIndex ? { 
                        scale: [1, 1.2, 1],
                        transition: { repeat: Infinity, duration: 2 }
                      } : {}}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Enhanced glow effect */}
            <motion.div
              className="absolute -z-10 w-72 h-72 rounded-full"
              style={{ backgroundColor: "#84A98C" }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}