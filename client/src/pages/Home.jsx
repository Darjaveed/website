/**
 * Home Page
 * Landing page with hero section, program previews, and features
 */
import AboutUs from '../components/AboutUs';
import Hero from '../components/Hero';
import ProgramSection from '../components/ProgramSection';
import ShortTermSection from '../components/ShortTermSection';
import WhyChooseUs from '../components/WhyChooseUs';
import FAQAccordion from '../components/FAQAccordion';
import InstructorSpotlight from '../components/InstructorSpotlight';
import JobAssistance from '../components/JobAssistance';
import Certificates from '../components/Certificates';
import HiringPartners from '../components/HiringPartners';

const Home = () => {
  

  return (
    <div className="min-h-screen">
      <Hero />
      <AboutUs />

      <ProgramSection />

      <ShortTermSection />

      <WhyChooseUs />


      <InstructorSpotlight />
      <JobAssistance />
      <Certificates />
      <HiringPartners />
      <FAQAccordion />  
      
    </div>
  );
};

export default Home;
