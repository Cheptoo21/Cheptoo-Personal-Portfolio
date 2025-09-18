/**
 * About section component for portfolio.
 * 
 * This component displays personal information, bio, and key highlights
 * with animated elements and responsive design.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { ComponentProps, About as AboutType } from '../types';
import { useAbout } from '../hooks/usePortfolio';
import './About.css';

interface AboutProps extends ComponentProps {
  onContactClick?: () => void;
}

/**
 * About section with personal information and highlights
 */
const About: React.FC<AboutProps> = ({ className = '', onContactClick }) => {
  const { data: about, loading, error } = useAbout();

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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };

  // Key highlights data
  const highlights = [
    {
      icon: '💻',
      title: 'Full-Stack Development',
      description: 'Building end-to-end web applications with modern technologies'
    },
    {
      icon: '🚀',
      title: 'Performance Optimization',
      description: 'Creating fast, efficient, and scalable solutions'
    },
    {
      icon: '🎨',
      title: 'User Experience',
      description: 'Designing intuitive and engaging user interfaces'
    },
    {
      icon: '🔧',
      title: 'Problem Solving',
      description: 'Analyzing complex problems and finding innovative solutions'
    }
  ];

  if (loading) {
    return (
      <section id="about" className={`about ${className}`}>
        <div className="about__container">
          <div className="about__loading">
            <div className="about__spinner"></div>
            <p>Loading about information...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="about" className={`about ${className}`}>
        <div className="about__container">
          <div className="about__error">
            <h2>About Me</h2>
            <p>Unable to load personal information. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className={`about ${className}`}>
      <div className="about__container">
        <motion.div
          className="about__content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Section Header */}
          <motion.div className="about__header" variants={itemVariants}>
            <h2 className="about__title">About Me</h2>
            <p className="about__subtitle">Get to know me better</p>
          </motion.div>

          <div className="about__main">
            {/* Profile Image */}
            <motion.div className="about__image-container" variants={imageVariants}>
              <div className="about__image-wrapper">
                {about?.profile_image ? (
                  <img
                    src={about.profile_image}
                    alt={about.name || 'Profile'}
                    className="about__image"
                  />
                ) : (
                  <div className="about__image-placeholder">
                    <span className="about__image-icon">👨‍💻</span>
                  </div>
                )}
                <div className="about__image-overlay">
                  <div className="about__image-badge">
                    <span>Available for work</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <div className="about__text">
              <motion.div className="about__intro" variants={itemVariants}>
                <h3 className="about__name">
                  Hi, I'm {about?.name || 'Cheptoo'}
                </h3>
                <p className="about__title-text">
                  {about?.title || 'Full-Stack Developer & Problem Solver'}
                </p>
              </motion.div>

              <motion.div className="about__bio" variants={itemVariants}>
                <p>
                  {about?.bio || `I'm a passionate full-stack developer with a love for creating innovative solutions. 
                  With expertise in modern web technologies, I enjoy building applications that make a difference 
                  and solving complex problems through code.`}
                </p>
                <p>
                  When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, 
                  or sharing knowledge with the developer community. I believe in continuous learning and staying 
                  up-to-date with the latest industry trends.
                </p>
              </motion.div>

              {/* Key Highlights */}
              <motion.div className="about__highlights" variants={itemVariants}>
                <h4 className="about__highlights-title">What I Do</h4>
                <div className="about__highlights-grid">
                  {highlights.map((highlight, index) => (
                    <motion.div
                      key={highlight.title}
                      className="about__highlight"
                      variants={itemVariants}
                      whileHover={{ scale: 1.05, y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="about__highlight-icon">
                        {highlight.icon}
                      </div>
                      <h5 className="about__highlight-title">
                        {highlight.title}
                      </h5>
                      <p className="about__highlight-description">
                        {highlight.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Call to Action */}
              <motion.div className="about__cta" variants={itemVariants}>
                <motion.button
                  className="about__btn about__btn--primary"
                  onClick={onContactClick}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Let's Work Together
                  <span className="about__btn-icon">→</span>
                </motion.button>

                <motion.a
                  href={about?.resume_file || '#'}
                  className="about__btn about__btn--secondary"
                  download
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Download Resume
                  <span className="about__btn-icon">↓</span>
                </motion.a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
