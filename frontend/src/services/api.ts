/**
 * API service for portfolio data management.
 * 
 * This service handles all HTTP requests to the Django REST API backend,
 * providing type-safe methods for fetching portfolio data.
 */

import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
  Skill,
  Project,
  Experience,
  Education,
  Contact,
  About,
  PortfolioSummary,
  PortfolioStats,
  ApiResponse,
  ProjectFilters,
  SkillFilters
} from '../types';

// API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Create axios instance with default configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

/**
 * Skills API service
 */
export const skillsApi = {
  /**
   * Get all skills with optional filtering
   */
  getAll: async (filters?: SkillFilters): Promise<Skill[]> => {
    const params = new URLSearchParams();
    
    if (filters?.category) {
      params.append('category', filters.category);
    }
    
    if (filters?.featured !== undefined) {
      params.append('featured', filters.featured.toString());
    }
    
    const response = await apiClient.get<Skill[]>(`/skills/?${params.toString()}`);
    return response.data;
  },

  /**
   * Get skill by ID
   */
  getById: async (id: number): Promise<Skill> => {
    const response = await apiClient.get<Skill>(`/skills/${id}/`);
    return response.data;
  },

  /**
   * Get skill categories
   */
  getCategories: async (): Promise<Array<{ value: string; label: string }>> => {
    const response = await apiClient.get<Array<{ value: string; label: string }>>('/skills/categories/');
    return response.data;
  },
};

/**
 * Projects API service
 */
export const projectsApi = {
  /**
   * Get all projects with optional filtering
   */
  getAll: async (filters?: ProjectFilters): Promise<Project[]> => {
    const params = new URLSearchParams();
    
    if (filters?.featured !== undefined) {
      params.append('featured', filters.featured.toString());
    }
    
    if (filters?.published !== undefined) {
      params.append('published', filters.published.toString());
    }
    
    if (filters?.technology) {
      params.append('technology', filters.technology);
    }
    
    const response = await apiClient.get<Project[]>(`/projects/?${params.toString()}`);
    return response.data;
  },

  /**
   * Get project by ID
   */
  getById: async (id: number): Promise<Project> => {
    const response = await apiClient.get<Project>(`/projects/${id}/`);
    return response.data;
  },

  /**
   * Get all technologies used in projects
   */
  getTechnologies: async (): Promise<string[]> => {
    const response = await apiClient.get<string[]>('/projects/technologies/');
    return response.data;
  },
};

/**
 * Experience API service
 */
export const experienceApi = {
  /**
   * Get all work experience
   */
  getAll: async (current?: boolean): Promise<Experience[]> => {
    const params = new URLSearchParams();
    
    if (current !== undefined) {
      params.append('current', current.toString());
    }
    
    const response = await apiClient.get<Experience[]>(`/experience/?${params.toString()}`);
    return response.data;
  },

  /**
   * Get experience by ID
   */
  getById: async (id: number): Promise<Experience> => {
    const response = await apiClient.get<Experience>(`/experience/${id}/`);
    return response.data;
  },
};

/**
 * Education API service
 */
export const educationApi = {
  /**
   * Get all education records
   */
  getAll: async (current?: boolean): Promise<Education[]> => {
    const params = new URLSearchParams();
    
    if (current !== undefined) {
      params.append('current', current.toString());
    }
    
    const response = await apiClient.get<Education[]>(`/education/?${params.toString()}`);
    return response.data;
  },

  /**
   * Get education by ID
   */
  getById: async (id: number): Promise<Education> => {
    const response = await apiClient.get<Education>(`/education/${id}/`);
    return response.data;
  },
};

/**
 * Contact API service
 */
export const contactApi = {
  /**
   * Get contact information
   */
  get: async (): Promise<Contact> => {
    const response = await apiClient.get<Contact>('/contact/');
    return response.data;
  },
};

/**
 * About API service
 */
export const aboutApi = {
  /**
   * Get about information
   */
  get: async (): Promise<About> => {
    const response = await apiClient.get<About>('/about/');
    return response.data;
  },
};

/**
 * Portfolio summary API service
 */
export const portfolioApi = {
  /**
   * Get complete portfolio summary
   */
  getSummary: async (): Promise<PortfolioSummary> => {
    const response = await apiClient.get<PortfolioSummary>('/summary/');
    return response.data;
  },

  /**
   * Get portfolio statistics
   */
  getStats: async (): Promise<PortfolioStats> => {
    const response = await apiClient.get<PortfolioStats>('/summary/stats/');
    return response.data;
  },
};

/**
 * Generic API error handler
 */
export const handleApiError = (error: any): string => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  
  if (error.response?.data?.detail) {
    return error.response.data.detail;
  }
  
  if (error.message) {
    return error.message;
  }
  
  return 'An unexpected error occurred';
};

/**
 * Export the configured API client for custom requests
 */
export { apiClient };
export default apiClient;
