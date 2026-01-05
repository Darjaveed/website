/**
 * Home Page
 * Landing page with hero section, program previews, and features
 */

import Hero from '../components/Hero';
import ProgramSection from '../components/ProgramSection';
import ShortTermSection from '../components/ShortTermSection';
import WhyChooseUs from '../components/WhyChooseUs';

const Home = () => {
  

  return (
    <div className="min-h-screen">
      <Hero />

      <ProgramSection />

      <ShortTermSection />

      <WhyChooseUs />
    </div>
  );
};

export default Home;
