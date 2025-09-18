/**
 * Skills section component for portfolio.
 * 
 * This component displays technical skills with proficiency levels,
 * category filtering, and animated progress bars.
 */

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ComponentProps, Skill, SkillFilters } from '../types';
import { useSkills } from '../hooks/usePortfolio';
import './Skills.css';

interface SkillsProps extends ComponentProps {
  showAll?: boolean;
}

/**
 * Skills section with category filtering and proficiency visualization
 */
const Skills: React.FC<SkillsProps> = ({ className = '', showAll = false }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { data: skills, loading, error } = useSkills();

  // Filter skills based on category and featured status
  const filteredSkills = useMemo(() => {
    if (!skills) return [];
    
    let filtered = skills;
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(skill => skill.category === selectedCategory);
    }
    
    // If not showing all, only show featured skills
    if (!showAll) {
      filtered = filtered.filter(skill => skill.is_featured);
    }
    
    return filtered;
  }, [skills, selectedCategory, showAll]);

  // Get unique categories
  const categories = useMemo(() => {
    if (!skills) return [];
    const uniqueCategories = [...new Set(skills.map(skill => skill.category))];
    return [
      { value: 'all', label: 'All Skills' },
      ...uniqueCategories.map(cat => ({
        value: cat,
        label: cat.charAt(0).toUpperCase() + cat.slice(1).replace('_', ' ')
      }))
    ];
  }, [skills]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
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

  const progressVariants = {
    hidden: { width: 0 },
    visible: (level: number) => ({
      width: `${(level / 5) * 100}%`,
      transition: { duration: 1, ease: 'easeOut', delay: 0.2 }
    })
  };

  // Get proficiency color
  const getProficiencyColor = (level: number) => {
    if (level >= 4) return '#10b981'; // Green
    if (level >= 3) return '#f59e0b'; // Yellow
    if (level >= 2) return '#f97316'; // Orange
    return '#ef4444'; // Red
  };

  // Get proficiency label
  const getProficiencyLabel = (level: number) => {
    const labels = ['Beginner', 'Novice', 'Intermediate', 'Advanced', 'Expert'];
    return labels[level - 1] || 'Unknown';
  };

  if (loading) {
    return (
      <section id="skills" className={`skills ${className}`}>
        <div className="skills__container">
          <div className="skills__loading">
            <div className="skills__spinner"></div>
            <p>Loading skills...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="skills" className={`skills ${className}`}>
        <div className="skills__container">
          <div className="skills__error">
            <h2>Skills & Technologies</h2>
            <p>Unable to load skills information. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className={`skills ${className}`}>
      <div className="skills__container">
        <motion.div
          className="skills__content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Section Header */}
          <motion.div className="skills__header" variants={itemVariants}>
            <h2 className="skills__title">Skills & Technologies</h2>
            <p className="skills__subtitle">
              My technical expertise and proficiency levels
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div className="skills__filter" variants={itemVariants}>
            <div className="skills__filter-container">
              {categories.map((category) => (
                <button
                  key={category.value}
                  className={`skills__filter-btn ${
                    selectedCategory === category.value ? 'skills__filter-btn--active' : ''
                  }`}
                  onClick={() => setSelectedCategory(category.value)}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Skills Grid */}
          <motion.div className="skills__grid" variants={containerVariants}>
            {filteredSkills.length === 0 ? (
              <div className="skills__empty">
                <p>No skills found for the selected category.</p>
              </div>
            ) : (
              filteredSkills.map((skill, index) => (
                <motion.div
                  key={skill.id}
                  className="skills__card"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="skills__card-header">
                    <h3 className="skills__card-name">{skill.name}</h3>
                    <span className="skills__card-category">
                      {skill.category_display}
                    </span>
                  </div>

                  <div className="skills__card-content">
                    <div className="skills__proficiency">
                      <div className="skills__proficiency-header">
                        <span className="skills__proficiency-label">
                          {getProficiencyLabel(skill.proficiency_level)}
                        </span>
                        <span className="skills__proficiency-level">
                          {skill.proficiency_level}/5
                        </span>
                      </div>
                      
                      <div className="skills__progress-bar">
                        <motion.div
                          className="skills__progress-fill"
                          style={{
                            backgroundColor: getProficiencyColor(skill.proficiency_level)
                          }}
                          variants={progressVariants}
                          custom={skill.proficiency_level}
                        />
                      </div>
                    </div>

                    <div className="skills__card-details">
                      <div className="skills__experience">
                        <span className="skills__experience-icon">⏱️</span>
                        <span className="skills__experience-text">
                          {skill.years_experience} year{skill.years_experience !== 1 ? 's' : ''} experience
                        </span>
                      </div>
                      
                      {skill.is_featured && (
                        <div className="skills__featured">
                          <span className="skills__featured-icon">⭐</span>
                          <span className="skills__featured-text">Featured</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>

          {/* Skills Summary */}
          {skills && skills.length > 0 && (
            <motion.div className="skills__summary" variants={itemVariants}>
              <div className="skills__summary-grid">
                <div className="skills__summary-item">
                  <span className="skills__summary-number">
                    {skills.length}
                  </span>
                  <span className="skills__summary-label">Total Skills</span>
                </div>
                
                <div className="skills__summary-item">
                  <span className="skills__summary-number">
                    {skills.filter(skill => skill.is_featured).length}
                  </span>
                  <span className="skills__summary-label">Featured Skills</span>
                </div>
                
                <div className="skills__summary-item">
                  <span className="skills__summary-number">
                    {Math.round(skills.reduce((acc, skill) => acc + skill.proficiency_level, 0) / skills.length * 10) / 10}
                  </span>
                  <span className="skills__summary-label">Average Level</span>
                </div>
                
                <div className="skills__summary-item">
                  <span className="skills__summary-number">
                    {Math.round(skills.reduce((acc, skill) => acc + skill.years_experience, 0) * 10) / 10}
                  </span>
                  <span className="skills__summary-label">Total Experience</span>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
