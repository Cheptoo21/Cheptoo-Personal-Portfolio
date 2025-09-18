/**
 * Header component for portfolio navigation.
 * 
 * This component provides the main navigation bar with responsive design,
 * mobile menu toggle, and smooth scrolling to sections.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ComponentProps, NavItem } from '../types';
import './Header.css';

// Navigation items configuration
const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

interface HeaderProps extends ComponentProps {
  isScrolled?: boolean;
}

/**
 * Header component with responsive navigation
 */
const Header: React.FC<HeaderProps> = ({ className = '', isScrolled = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Handle scroll events to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle smooth scrolling to sections
  const handleNavClick = (href: string) => {
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    
    setIsMobileMenuOpen(false);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.header
      className={`header ${isScrolled ? 'header--scrolled' : ''} ${className}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="header__container">
        {/* Logo/Brand */}
        <motion.div
          className="header__brand"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}>
            <span className="header__logo">Cheptoo</span>
          </a>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="header__nav header__nav--desktop">
          <ul className="header__nav-list">
            {navItems.map((item, index) => (
              <motion.li
                key={item.label}
                className="header__nav-item"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <a
                  href={item.href}
                  className={`header__nav-link ${
                    activeSection === item.href.substring(1) ? 'header__nav-link--active' : ''
                  }`}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                >
                  {item.label}
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          className="header__mobile-toggle"
          onClick={toggleMobileMenu}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle mobile menu"
        >
          <span className={`header__hamburger ${isMobileMenuOpen ? 'header__hamburger--open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            className="header__nav header__nav--mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="header__nav-list header__nav-list--mobile">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.label}
                  className="header__nav-item header__nav-item--mobile"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <a
                    href={item.href}
                    className={`header__nav-link header__nav-link--mobile ${
                      activeSection === item.href.substring(1) ? 'header__nav-link--active' : ''
                    }`}
                    onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
