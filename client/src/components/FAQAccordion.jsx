import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const theme = {
    primary: "#2F3E46",
    secondary: "#354F52",
    accent: "#84A98C",
    light: "#CAD2C5",
    background: "#FFFFFF"
  };

  const faqs = [
    {
      question: "What makes UpstairsX different from other learning platforms?",
      answer: "We focus on career outcomes with 94% placement rate, 1:1 mentorship, and real-world projects. Unlike other platforms, we provide end-to-end career support including resume building, mock interviews, and direct connections with 500+ hiring partners."
    },
    {
      question: "Do I need prior experience to join the courses?",
      answer: "No! Our courses are designed for all levels - beginners to advanced. We offer foundational modules for beginners and advanced tracks for experienced professionals looking to upskill."
    },
    {
      question: "What is the duration of the programs?",
      answer: "Program durations vary: Comprehensive Programs (4-6 months), Short-Term Programs (4-12 weeks). All courses are self-paced with lifetime access to materials."
    },
    {
      question: "Is there any job guarantee?",
      answer: "Yes! We offer a 94% placement success rate. If you complete the course with minimum 80% score and actively participate in placement activities but don't get placed within 6 months, you get a 100% refund."
    },
    {
      question: "What kind of certificate will I receive?",
      answer: "You'll receive an industry-recognized certificate co-branded with hiring partners. Our certificates are verifiable online and include LinkedIn integration for easy sharing with recruiters."
    },
    {
      question: "Can I pay in installments?",
      answer: "Yes! We offer flexible EMI options with 0% interest for up to 12 months. Corporate sponsorship and scholarship options are also available for eligible candidates."
    },
    {
      question: "What support will I get during the course?",
      answer: "24/7 doubt resolution, weekly live Q&A sessions, 1:1 mentorship calls, peer learning groups, career counseling, and project reviews by industry experts."
    },
    {
      question: "Do you help with international placements?",
      answer: "Absolutely! We have partnerships with companies in the US, Canada, UK, Australia, and Germany. We provide visa guidance, relocation support, and interview preparation for international roles."
    }
  ];

  return (
    <section className="py-16 md:py-24 lg:py-32 relative overflow-hidden" style={{ backgroundColor: theme.background }}>
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full" style={{ backgroundColor: theme.accent }} />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full" style={{ backgroundColor: theme.primary }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
              <HelpCircle className="w-8 h-8" style={{ color: theme.accent }} />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: theme.primary }}>
            Frequently Asked Questions
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: theme.secondary }}>
            Find answers to common questions about our programs, placements, and learning experience
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border rounded-2xl overflow-hidden"
              style={{ 
                borderColor: activeIndex === index ? theme.accent : `${theme.primary}20`,
                backgroundColor: activeIndex === index ? `${theme.accent}08` : 'white',
                boxShadow: activeIndex === index 
                  ? `0 8px 32px ${theme.accent}20` 
                  : '0 4px 12px rgba(47, 62, 70, 0.05)'
              }}
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none group"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-1"
                    style={{ 
                      backgroundColor: activeIndex === index ? theme.accent : `${theme.accent}15`,
                      color: activeIndex === index ? 'white' : theme.accent
                    }}>
                    <span className="font-semibold">{index + 1}</span>
                  </div>
                  <h3 className="text-lg font-semibold flex-1" style={{ color: theme.primary }}>
                    {faq.question}
                  </h3>
                </div>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-4"
                >
                  <ChevronDown className="w-5 h-5" style={{ color: theme.accent }} />
                </motion.div>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pl-14">
                      <p className="text-gray-600 leading-relaxed" style={{ color: theme.secondary }}>
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-lg font-medium mb-6" style={{ color: theme.secondary }}>
            Still have questions?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 rounded-xl font-semibold transition-all hover:shadow-lg"
              style={{ 
                backgroundColor: theme.accent,
                color: theme.primary
              }}>
              Chat with Advisor
            </button>
            <button className="px-8 py-3 rounded-xl font-semibold border transition-all hover:shadow-lg"
              style={{ 
                borderColor: theme.primary,
                color: theme.primary
              }}>
              Schedule a Call
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQAccordion;