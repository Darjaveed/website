import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Briefcase, MessageSquare, Linkedin, Twitter, Github } from 'lucide-react';

const InstructorSpotlight = () => {
  const [activeInstructor, setActiveInstructor] = useState(0);

  const theme = {
    primary: "#2F3E46",
    secondary: "#354F52",
    accent: "#84A98C",
    light: "#CAD2C5",
    background: "#FFFFFF"
  };

  const instructors = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Senior Full Stack Developer",
      company: "Ex-Microsoft, Google",
      experience: "12+ years",
      students: "5,000+",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1494790108755-2616b786d4d1?w=400&h=400&fit=crop&crop=face",
      skills: ["React", "Node.js", "AWS", "Microservices"],
      achievements: ["Built systems serving 10M+ users", "Author of 3 tech books", "Speaker at 50+ conferences"],
      bio: "Former Tech Lead at Microsoft with expertise in scalable web applications. Passionate about mentoring next-gen developers.",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#"
      }
    },
    {
      id: 2,
      name: "David Rodriguez",
      role: "Machine Learning Lead",
      company: "Ex-Google, Facebook",
      experience: "10+ years",
      students: "3,500+",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      skills: ["Python", "TensorFlow", "PyTorch", "MLOps"],
      achievements: ["PhD in Computer Science", "Published 20+ research papers", "ML systems for 5M+ users"],
      bio: "Machine Learning expert with production experience at Google. Focuses on practical ML implementation.",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#"
      }
    },
    {
      id: 3,
      name: "Priya Sharma",
      role: "DevOps & Cloud Architect",
      company: "Ex-Amazon, Netflix",
      experience: "8+ years",
      students: "4,200+",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w-400&h=400&fit=crop&crop=face",
      skills: ["Kubernetes", "Docker", "AWS", "Terraform"],
      achievements: ["Certified AWS Solutions Architect", "Built systems handling 1B+ requests/day", "Open source contributor"],
      bio: "Cloud infrastructure specialist with experience building highly available systems at Amazon scale.",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#"
      }
    }
  ];

  const activeInstructorData = instructors[activeInstructor];

  return (
    <section className="py-16 md:py-24 lg:py-32 relative overflow-hidden" style={{ backgroundColor: theme.background }}>
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{ 
              backgroundColor: theme.accent,
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              left: `${20 + i * 20}%`,
              top: `${10 + i * 30}%`
            }}
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.05, 0.1, 0.05]
            }}
            transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
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
            Meet Our Expert Instructors
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: theme.secondary }}>
            Learn from industry veterans with real-world experience at top tech companies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Instructor Selection */}
          <div className="lg:col-span-1 space-y-4">
            {instructors.map((instructor, index) => (
              <motion.button
                key={instructor.id}
                onClick={() => setActiveInstructor(index)}
                className={`w-full p-4 rounded-2xl text-left transition-all ${activeInstructor === index ? 'shadow-xl' : 'shadow-sm hover:shadow-md'}`}
                style={{ 
                  backgroundColor: activeInstructor === index ? `${theme.accent}15` : 'white',
                  border: `2px solid ${activeInstructor === index ? theme.accent : `${theme.primary}20`}`
                }}
                whileHover={{ x: 5 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2"
                    style={{ borderColor: theme.accent }}>
                    <img 
                      src={instructor.image} 
                      alt={instructor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold truncate" style={{ color: theme.primary }}>
                      {instructor.name}
                    </h3>
                    <p className="text-sm truncate" style={{ color: theme.secondary }}>
                      {instructor.role}
                    </p>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1 text-sm font-semibold" style={{ color: theme.primary }}>
                          {instructor.rating}
                        </span>
                      </div>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-xs" style={{ color: theme.secondary }}>
                        {instructor.students} students
                      </span>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Instructor Details */}
          <div className="lg:col-span-2">
            <motion.div
              key={activeInstructor}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border"
              style={{ borderColor: `${theme.primary}20` }}
            >
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
                  {/* Instructor Image */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 shadow-lg"
                        style={{ borderColor: theme.accent }}>
                        <img 
                          src={activeInstructorData.image} 
                          alt={activeInstructorData.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <motion.div
                        className="absolute -top-2 -right-2 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                        style={{ backgroundColor: theme.accent }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        <Award className="w-6 h-6 text-white" />
                      </motion.div>
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center space-x-3 mt-4">
                      {Object.entries(activeInstructorData.social).map(([platform, url]) => {
                        const Icon = platform === 'linkedin' ? Linkedin : platform === 'twitter' ? Twitter : Github;
                        return (
                          <motion.a
                            key={platform}
                            href={url}
                            className="w-10 h-10 rounded-lg flex items-center justify-center hover:shadow-lg transition-all"
                            style={{ 
                              backgroundColor: `${theme.accent}15`,
                              color: theme.accent
                            }}
                            whileHover={{ scale: 1.1, y: -2 }}
                          >
                            <Icon className="w-5 h-5" />
                          </motion.a>
                        );
                      })}
                    </div>
                  </div>

                  {/* Instructor Info */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <h2 className="text-2xl md:text-3xl font-bold" style={{ color: theme.primary }}>
                        {activeInstructorData.name}
                      </h2>
                      <span className="px-3 py-1 rounded-full text-sm font-semibold"
                        style={{ 
                          backgroundColor: `${theme.accent}15`,
                          color: theme.accent
                        }}>
                        {activeInstructorData.experience}
                      </span>
                    </div>

                    <div className="flex items-center space-x-4 mb-6">
                      <div className="flex items-center">
                        <Briefcase className="w-5 h-5 mr-2" style={{ color: theme.accent }} />
                        <span className="font-medium" style={{ color: theme.secondary }}>
                          {activeInstructorData.company}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="w-5 h-5 mr-2" style={{ color: theme.accent }} />
                        <span className="font-medium" style={{ color: theme.secondary }}>
                          {activeInstructorData.students} Students
                        </span>
                      </div>
                    </div>

                    <p className="text-lg mb-6 leading-relaxed" style={{ color: theme.secondary }}>
                      {activeInstructorData.bio}
                    </p>

                    {/* Skills */}
                    <div className="mb-6">
                      <h3 className="font-bold text-lg mb-3" style={{ color: theme.primary }}>Expertise</h3>
                      <div className="flex flex-wrap gap-2">
                        {activeInstructorData.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 rounded-lg text-sm font-medium"
                            style={{ 
                              backgroundColor: `${theme.accent}15`,
                              color: theme.accent
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div>
                      <h3 className="font-bold text-lg mb-3" style={{ color: theme.primary }}>Key Achievements</h3>
                      <ul className="space-y-2">
                        {activeInstructorData.achievements.map((achievement, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-5 h-5 rounded-full flex items-center justify-center mr-3 mt-0.5"
                              style={{ backgroundColor: `${theme.accent}15` }}>
                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.accent }} />
                            </div>
                            <span style={{ color: theme.secondary }}>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Session Info */}
              <div className="px-6 md:px-8 py-4 border-t"
                style={{ borderColor: `${theme.primary}10`, backgroundColor: `${theme.accent}05` }}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold" style={{ color: theme.primary }}>Next Live Session</h4>
                    <p className="text-sm" style={{ color: theme.secondary }}>
                      Join {activeInstructorData.name}'s live Q&A session this Friday
                    </p>
                  </div>
                  <button className="px-6 py-2 rounded-lg font-semibold transition-all hover:shadow-lg"
                    style={{ 
                      backgroundColor: theme.accent,
                      color: theme.primary
                    }}>
                    Register for Session
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstructorSpotlight;