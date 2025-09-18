/**
 * TypeScript interfaces for portfolio data structures.
 * 
 * These interfaces define the shape of data received from the Django REST API
 * and provide type safety throughout the React application.
 */

// Base interface for all models with common fields
interface BaseModel {
  id: number;
  created_at: string;
  updated_at: string;
}

// Skill related interfaces
export interface Skill extends BaseModel {
  name: string;
  category: 'programming' | 'framework' | 'database' | 'tool' | 'cloud' | 'design' | 'other';
  category_display: string;
  proficiency_level: number; // 1-5 scale
  years_experience: number;
  is_featured: boolean;
}

// Project related interfaces
export interface Project extends BaseModel {
  title: string;
  description: string;
  short_description: string;
  technologies: string;
  technologies_list: string[];
  github_url?: string;
  live_url?: string;
  image?: string;
  is_featured: boolean;
  is_published: boolean;
  start_date: string;
  end_date?: string;
  duration: number; // in months
}

// Experience related interfaces
export interface Experience extends BaseModel {
  company: string;
  position: string;
  description: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  location: string;
  company_url?: string;
}

// Education related interfaces
export interface Education extends BaseModel {
  institution: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  gpa?: number;
  location: string;
}

// Contact related interfaces
export interface Contact extends BaseModel {
  email: string;
  phone?: string;
  location: string;
  linkedin_url?: string;
  github_url?: string;
  twitter_url?: string;
  website_url?: string;
  resume_url?: string;
}

// About related interfaces
export interface About extends BaseModel {
  name: string;
  title: string;
  bio: string;
  profile_image?: string;
  resume_file?: string;
}

// Portfolio summary interface
export interface PortfolioSummary {
  about: About;
  contact: Contact;
  featured_skills: Skill[];
  featured_projects: Project[];
  recent_experience: Experience[];
  education: Education[];
}

// Portfolio statistics interface
export interface PortfolioStats {
  total_projects: number;
  featured_projects: number;
  total_skills: number;
  featured_skills: number;
  total_experience: number;
  current_experience: number;
  total_education: number;
  current_education: number;
}

// API response interfaces
export interface ApiResponse<T> {
  count: number;
  next?: string;
  previous?: string;
  results: T[];
}

// Component prop interfaces
export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Navigation interfaces
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

// Form interfaces
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Filter interfaces
export interface ProjectFilters {
  featured?: boolean;
  published?: boolean;
  technology?: string;
}

export interface SkillFilters {
  category?: string;
  featured?: boolean;
}

// Animation interfaces
export interface AnimationVariants {
  hidden: object;
  visible: object;
  exit?: object;
}

// Theme interfaces
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
}
