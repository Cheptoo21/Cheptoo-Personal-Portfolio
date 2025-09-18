/**
 * Main App component for Cheptoo Personal Portfolio.
 * 
 * This component orchestrates the entire portfolio application,
 * including routing, layout, and component composition.
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import './App.css';

/**
 * Main App component
 */
const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll events for header styling
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle contact section navigation
  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle projects section navigation
  const handleProjectsClick = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="App">
      {/* Header with navigation */}
      <Header isScrolled={isScrolled} />

      {/* Main content sections */}
      <main className="App__main">
        {/* Hero section */}
        <Hero 
          onContactClick={handleContactClick}
          onProjectsClick={handleProjectsClick}
        />

        {/* About section */}
        <About onContactClick={handleContactClick} />

        {/* Skills section */}
        <Skills showAll={false} />

        {/* Placeholder for future sections */}
        <motion.section
          id="projects"
          className="App__placeholder"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="App__placeholder-content">
            <h2>Projects Section</h2>
            <p>Coming soon! This section will showcase my portfolio projects.</p>
          </div>
        </motion.section>

        <motion.section
          id="experience"
          className="App__placeholder"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="App__placeholder-content">
            <h2>Experience Section</h2>
            <p>Coming soon! This section will display my work experience.</p>
          </div>
        </motion.section>

        <motion.section
          id="contact"
          className="App__placeholder"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="App__placeholder-content">
            <h2>Contact Section</h2>
            <p>Coming soon! This section will include contact information and a contact form.</p>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="App__footer">
        <div className="App__footer-content">
          <p>&copy; 2024 Cheptoo. All rights reserved.</p>
          <p>Built with React, Django, and lots of ☕</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
