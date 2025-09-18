/**
 * Hero section component for portfolio landing.
 * 
 * This component displays the main introduction with animated text,
 * call-to-action buttons, and background effects.
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ComponentProps, About } from '../types';
import { useAbout } from '../hooks/usePortfolio';
import './Hero.css';

interface HeroProps extends ComponentProps {
  onContactClick?: () => void;
  onProjectsClick?: () => void;
}

/**
 * Hero section with animated introduction
 */
const Hero: React.FC<HeroProps> = ({ 
  className = '', 
  onContactClick,
  onProjectsClick 
}) => {
  const { data: about, loading, error } = useAbout();
  const [currentText, setCurrentText] = useState(0);

  // Animated text rotation
  const animatedTexts = [
    'Full-Stack Developer',
    'React Specialist',
    'Django Expert',
    'Problem Solver',
    'Tech Enthusiast'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % animatedTexts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    onContactClick?.();
  };

  const handleProjectsClick = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
    onProjectsClick?.();
  };

  if (loading) {
    return (
      <section id="home" className={`hero ${className}`}>
        <div className="hero__container">
          <div className="hero__loading">
            <div className="hero__spinner"></div>
            <p>Loading...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="home" className={`hero ${className}`}>
        <div className="hero__container">
          <div className="hero__error">
            <h1>Welcome to My Portfolio</h1>
            <p>Unable to load personal information. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="home" className={`hero ${className}`}>
      {/* Background Effects */}
      <div className="hero__background">
        <div className="hero__gradient"></div>
        <div className="hero__particles">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="hero__particle"
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="hero__container">
        <motion.div
          className="hero__content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Greeting */}
          <motion.div className="hero__greeting" variants={itemVariants}>
            <span className="hero__wave">👋</span>
            <span>Hello, I'm</span>
          </motion.div>

          {/* Name */}
          <motion.h1 className="hero__name" variants={itemVariants}>
            {about?.name || 'Cheptoo'}
          </motion.h1>

          {/* Animated Title */}
          <motion.div className="hero__title-container" variants={itemVariants}>
            <span className="hero__title-prefix">I'm a </span>
            <motion.span
              key={currentText}
              className="hero__title-animated"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {animatedTexts[currentText]}
            </motion.span>
          </motion.div>

          {/* Description */}
          <motion.p className="hero__description" variants={itemVariants}>
            {about?.bio || 'Passionate about creating innovative solutions and bringing ideas to life through code. I specialize in modern web technologies and love building user-centric applications.'}
          </motion.p>

          {/* Action Buttons */}
          <motion.div className="hero__actions" variants={itemVariants}>
            <motion.button
              className="hero__btn hero__btn--primary"
              onClick={handleContactClick}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
              <span className="hero__btn-icon">→</span>
            </motion.button>

            <motion.button
              className="hero__btn hero__btn--secondary"
              onClick={handleProjectsClick}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
              <span className="hero__btn-icon">↓</span>
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div className="hero__social" variants={itemVariants}>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hero__social-link"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hero__social-link"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>

            <a
              href="mailto:contact@example.com"
              className="hero__social-link"
              aria-label="Email"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="hero__scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="hero__scroll-arrow"></div>
          <span>Scroll Down</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
