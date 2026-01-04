/**
 * About Page
 * Information about the platform and mission
 */

import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">About Us</h1>
          
          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our mission is to provide high-quality, accessible education that empowers learners
                to achieve their career goals and realize their full potential. We believe that
                education should be engaging, practical, and applicable to real-world scenarios.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Offer</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We offer comprehensive programs and short-term courses designed to help you acquire
                in-demand skills and advance your career. Our curriculum is developed by industry
                experts and is regularly updated to reflect the latest trends and technologies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Approach</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Hands-on, project-based learning</li>
                <li>Expert instructors with real-world experience</li>
                <li>Flexible learning schedules</li>
                <li>Lifetime access to course materials</li>
                <li>Supportive learning community</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h2>
              <p className="text-gray-700 leading-relaxed">
                Have questions? We'd love to hear from you. Visit our{' '}
                <Link to="/contact" className="text-blue-600 hover:text-blue-700 underline">
                  Contact page
                </Link>{' '}
                to get in touch with our team.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

