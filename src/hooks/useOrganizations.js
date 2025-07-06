/**
 * Custom React hooks for organization data management
 * Provides easy-to-use hooks for fetching and managing organization data
 */

import { useState, useEffect, useCallback } from 'react';
import organizationService from '../services/organizationService';

/**
 * Hook for searching organizations with debouncing and loading states
 * @param {Object} initialParams - Initial search parameters
 * @returns {Object} Search state and functions
 */
export const useOrganizationSearch = (initialParams = {}) => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState({
    query: '',
    state: '',
    city: '',
    category: '',
    limit: 20,
    ...initialParams
  });
  const [searchResults, setSearchResults] = useState({
    count: 0,
    query: '',
    filters: {}
  });

  // Debounced search function
  const searchOrganizations = useCallback(async (params = searchParams) => {
    if (!params.query || params.query.length < 2) {
      setOrganizations([]);
      setSearchResults({ count: 0, query: '', filters: {} });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const results = await organizationService.searchOrganizations(params);
      setOrganizations(results.organizations.map(org => 
        organizationService.formatOrganization(org)
      ));
      setSearchResults({
        count: results.count,
        query: results.query,
        filters: results.filters
      });
    } catch (err) {
      setError(err.message);
      setOrganizations([]);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  // Update search parameters
  const updateSearchParams = useCallback((newParams) => {
    setSearchParams(prev => ({ ...prev, ...newParams }));
  }, []);

  // Clear search
  const clearSearch = useCallback(() => {
    setSearchParams({
      query: '',
      state: '',
      city: '',
      category: '',
      limit: 20
    });
    setOrganizations([]);
    setSearchResults({ count: 0, query: '', filters: {} });
    setError(null);
  }, []);

  // Auto-search when params change (with debouncing)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchParams.query) {
        searchOrganizations(searchParams);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchParams, searchOrganizations]);

  return {
    organizations,
    loading,
    error,
    searchParams,
    searchResults,
    searchOrganizations,
    updateSearchParams,
    clearSearch
  };
};

/**
 * Hook for fetching a single organization by EIN
 * @param {string} ein - Organization EIN
 * @returns {Object} Organization data and loading state
 */
export const useOrganization = (ein) => {
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrganization = useCallback(async () => {
    if (!ein) return;

    setLoading(true);
    setError(null);

    try {
      const org = await organizationService.getOrganizationByEin(ein);
      setOrganization(organizationService.formatOrganization(org));
    } catch (err) {
      setError(err.message);
      setOrganization(null);
    } finally {
      setLoading(false);
    }
  }, [ein]);

  useEffect(() => {
    fetchOrganization();
  }, [fetchOrganization]);

  const refetch = useCallback(() => {
    fetchOrganization();
  }, [fetchOrganization]);

  return {
    organization,
    loading,
    error,
    refetch
  };
};

/**
 * Hook for fetching organization categories
 * @returns {Object} Categories data and loading state
 */
export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const cats = await organizationService.getCategories();
      setCategories(cats);
    } catch (err) {
      setError(err.message);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories
  };
};

/**
 * Hook for fetching organizations by category
 * @param {string} categoryCode - NTEE category code
 * @param {number} limit - Maximum number of results
 * @returns {Object} Category organizations and loading state
 */
export const useOrganizationsByCategory = (categoryCode, limit = 20) => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categoryInfo, setCategoryInfo] = useState({
    count: 0,
    category: categoryCode
  });

  const fetchOrganizations = useCallback(async () => {
    if (!categoryCode) return;

    setLoading(true);
    setError(null);

    try {
      const results = await organizationService.getOrganizationsByCategory(categoryCode, limit);
      setOrganizations(results.organizations.map(org => 
        organizationService.formatOrganization(org)
      ));
      setCategoryInfo({
        count: results.count,
        category: results.category
      });
    } catch (err) {
      setError(err.message);
      setOrganizations([]);
    } finally {
      setLoading(false);
    }
  }, [categoryCode, limit]);

  useEffect(() => {
    fetchOrganizations();
  }, [fetchOrganizations]);

  return {
    organizations,
    loading,
    error,
    categoryInfo,
    refetch: fetchOrganizations
  };
};

/**
 * Hook for fetching popular organizations
 * @param {number} limit - Maximum number of results
 * @returns {Object} Popular organizations and loading state
 */
export const usePopularOrganizations = (limit = 20) => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPopularOrganizations = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const orgs = await organizationService.getPopularOrganizations(limit);
      setOrganizations(orgs.map(org => 
        organizationService.formatOrganization(org)
      ));
    } catch (err) {
      setError(err.message);
      setOrganizations([]);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchPopularOrganizations();
  }, [fetchPopularOrganizations]);

  return {
    organizations,
    loading,
    error,
    refetch: fetchPopularOrganizations
  };
};

/**
 * Hook for organization verification
 * @param {string} ein - Organization EIN
 * @returns {Object} Verification data and loading state
 */
export const useOrganizationVerification = (ein) => {
  const [verification, setVerification] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const verifyOrganization = useCallback(async () => {
    if (!ein) return;

    setLoading(true);
    setError(null);

    try {
      const result = await organizationService.verifyOrganization(ein);
      setVerification(result);
    } catch (err) {
      setError(err.message);
      setVerification(null);
    } finally {
      setLoading(false);
    }
  }, [ein]);

  useEffect(() => {
    verifyOrganization();
  }, [verifyOrganization]);

  return {
    verification,
    loading,
    error,
    refetch: verifyOrganization
  };
};

/**
 * Hook for API connection testing
 * @returns {Object} Connection status and test function
 */
export const useApiConnection = () => {
  const [connected, setConnected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [connectionInfo, setConnectionInfo] = useState(null);

  const testConnection = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await organizationService.testConnection();
      setConnected(result.connected);
      setConnectionInfo(result);
    } catch (err) {
      setError(err.message);
      setConnected(false);
      setConnectionInfo(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    testConnection();
  }, [testConnection]);

  return {
    connected,
    loading,
    error,
    connectionInfo,
    testConnection
  };
};
