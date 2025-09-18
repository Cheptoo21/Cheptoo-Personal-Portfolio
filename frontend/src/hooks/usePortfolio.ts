/**
 * Custom React hooks for portfolio data management.
 * 
 * These hooks provide a clean interface for fetching and managing
 * portfolio data with loading states and error handling.
 */

import { useState, useEffect, useCallback } from 'react';
import {
  Skill,
  Project,
  Experience,
  Education,
  Contact,
  About,
  PortfolioSummary,
  PortfolioStats,
  ProjectFilters,
  SkillFilters
} from '../types';
import {
  skillsApi,
  projectsApi,
  experienceApi,
  educationApi,
  contactApi,
  aboutApi,
  portfolioApi,
  handleApiError
} from '../services/api';

// Generic hook state interface
interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Hook for fetching skills
export const useSkills = (filters?: SkillFilters) => {
  const [state, setState] = useState<UseApiState<Skill[]>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchSkills = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const skills = await skillsApi.getAll(filters);
      setState({ data: skills, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: handleApiError(error),
      });
    }
  }, [filters]);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  return { ...state, refetch: fetchSkills };
};

// Hook for fetching projects
export const useProjects = (filters?: ProjectFilters) => {
  const [state, setState] = useState<UseApiState<Project[]>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchProjects = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const projects = await projectsApi.getAll(filters);
      setState({ data: projects, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: handleApiError(error),
      });
    }
  }, [filters]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return { ...state, refetch: fetchProjects };
};

// Hook for fetching experience
export const useExperience = (current?: boolean) => {
  const [state, setState] = useState<UseApiState<Experience[]>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchExperience = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const experience = await experienceApi.getAll(current);
      setState({ data: experience, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: handleApiError(error),
      });
    }
  }, [current]);

  useEffect(() => {
    fetchExperience();
  }, [fetchExperience]);

  return { ...state, refetch: fetchExperience };
};

// Hook for fetching education
export const useEducation = (current?: boolean) => {
  const [state, setState] = useState<UseApiState<Education[]>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchEducation = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const education = await educationApi.getAll(current);
      setState({ data: education, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: handleApiError(error),
      });
    }
  }, [current]);

  useEffect(() => {
    fetchEducation();
  }, [fetchEducation]);

  return { ...state, refetch: fetchEducation };
};

// Hook for fetching contact information
export const useContact = () => {
  const [state, setState] = useState<UseApiState<Contact>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchContact = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const contact = await contactApi.get();
      setState({ data: contact, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: handleApiError(error),
      });
    }
  }, []);

  useEffect(() => {
    fetchContact();
  }, [fetchContact]);

  return { ...state, refetch: fetchContact };
};

// Hook for fetching about information
export const useAbout = () => {
  const [state, setState] = useState<UseApiState<About>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchAbout = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const about = await aboutApi.get();
      setState({ data: about, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: handleApiError(error),
      });
    }
  }, []);

  useEffect(() => {
    fetchAbout();
  }, [fetchAbout]);

  return { ...state, refetch: fetchAbout };
};

// Hook for fetching complete portfolio summary
export const usePortfolioSummary = () => {
  const [state, setState] = useState<UseApiState<PortfolioSummary>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchSummary = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const summary = await portfolioApi.getSummary();
      setState({ data: summary, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: handleApiError(error),
      });
    }
  }, []);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  return { ...state, refetch: fetchSummary };
};

// Hook for fetching portfolio statistics
export const usePortfolioStats = () => {
  const [state, setState] = useState<UseApiState<PortfolioStats>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchStats = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const stats = await portfolioApi.getStats();
      setState({ data: stats, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: handleApiError(error),
      });
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { ...state, refetch: fetchStats };
};

// Hook for managing loading states across multiple API calls
export const useMultipleApiCalls = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const executeCalls = useCallback(async (calls: Promise<any>[]) => {
    try {
      setLoading(true);
      setError(null);
      await Promise.all(calls);
      setLoading(false);
    } catch (err) {
      setError(handleApiError(err));
      setLoading(false);
    }
  }, []);

  return { loading, error, executeCalls };
};
