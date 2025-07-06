/**
 * Organization API Service for KindnessHome Frontend
 * Handles all API calls to the backend for organization data
 */

const API_BASE_URL = 'https://kindnesshome-backend.onrender.com/api';

class OrganizationService {
  /**
   * Search for organizations by query, location, and category
   * @param {Object} params - Search parameters
   * @param {string} params.query - Search term for organization name
   * @param {string} params.state - State filter (e.g., 'CA', 'NY')
   * @param {string} params.city - City filter
   * @param {string} params.category - NTEE category code (A-Z)
   * @param {number} params.limit - Maximum number of results (default 20)
   * @returns {Promise<Object>} Search results with organizations array
   */
  async searchOrganizations({ query, state, city, category, limit = 20 }) {
    try {
      const params = new URLSearchParams();
      
      if (query) params.append('q', query);
      if (state) params.append('state', state.toUpperCase());
      if (city) params.append('city', city);
      if (category) params.append('category', category.toUpperCase());
      if (limit) params.append('limit', limit.toString());

      const response = await fetch(`${API_BASE_URL}/organizations/search?${params}`);
      
      if (!response.ok) {
        throw new Error(`Search failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return {
        organizations: data.data || [],
        count: data.count || 0,
        query: data.query || '',
        filters: data.filters || {}
      };
    } catch (error) {
      console.error('Error searching organizations:', error);
      throw new Error('Failed to search organizations. Please try again.');
    }
  }

  /**
   * Get organization details by EIN (Tax ID)
   * @param {string} ein - Employer Identification Number
   * @returns {Promise<Object>} Organization details
   */
  async getOrganizationByEin(ein) {
    try {
      const cleanEin = ein.replace(/[-\s]/g, '');
      const response = await fetch(`${API_BASE_URL}/organizations/${cleanEin}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Organization not found');
        }
        throw new Error(`Failed to get organization: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error getting organization:', error);
      throw error;
    }
  }

  /**
   * Verify organization's charitable status and tax-deductible eligibility
   * @param {string} ein - Employer Identification Number
   * @returns {Promise<Object>} Verification results
   */
  async verifyOrganization(ein) {
    try {
      const cleanEin = ein.replace(/[-\s]/g, '');
      const response = await fetch(`${API_BASE_URL}/organizations/verify/${cleanEin}`);
      
      if (!response.ok) {
        throw new Error(`Verification failed: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error verifying organization:', error);
      throw new Error('Failed to verify organization status.');
    }
  }

  /**
   * Get popular/most searched organizations
   * @param {number} limit - Maximum number of results (default 20)
   * @returns {Promise<Array>} Array of popular organizations
   */
  async getPopularOrganizations(limit = 20) {
    try {
      const response = await fetch(`${API_BASE_URL}/organizations/popular?limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`Failed to get popular organizations: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error getting popular organizations:', error);
      throw new Error('Failed to load popular organizations.');
    }
  }

  /**
   * Get all available organization categories (NTEE codes)
   * @returns {Promise<Array>} Array of category objects
   */
  async getCategories() {
    try {
      const response = await fetch(`${API_BASE_URL}/organizations/categories`);
      
      if (!response.ok) {
        throw new Error(`Failed to get categories: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error getting categories:', error);
      throw new Error('Failed to load categories.');
    }
  }

  /**
   * Get organizations by specific category
   * @param {string} categoryCode - NTEE category code (A-Z)
   * @param {number} limit - Maximum number of results (default 20)
   * @returns {Promise<Array>} Array of organizations in the category
   */
  async getOrganizationsByCategory(categoryCode, limit = 20) {
    try {
      const response = await fetch(`${API_BASE_URL}/organizations/categories/${categoryCode.toUpperCase()}?limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`Failed to get organizations by category: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return {
        organizations: data.data || [],
        count: data.count || 0,
        category: data.category || categoryCode
      };
    } catch (error) {
      console.error('Error getting organizations by category:', error);
      throw new Error('Failed to load organizations for this category.');
    }
  }

  /**
   * Test API connection and get status
   * @returns {Promise<Object>} Connection test results
   */
  async testConnection() {
    try {
      const response = await fetch(`${API_BASE_URL}/organizations/test`);
      
      if (!response.ok) {
        throw new Error(`Connection test failed: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error testing API connection:', error);
      throw new Error('Failed to connect to organization database.');
    }
  }

  /**
   * Format organization data for display
   * @param {Object} org - Raw organization data from API
   * @returns {Object} Formatted organization data
   */
  formatOrganization(org) {
    return {
      ...org,
      // Format EIN with dashes for display
      formattedEin: org.ein ? `${org.ein.slice(0, 2)}-${org.ein.slice(2)}` : '',
      
      // Create full address string
      fullAddress: [org.street, org.city, org.state, org.zip_code]
        .filter(Boolean)
        .join(', '),
      
      // Format revenue amount
      formattedRevenue: this.formatCurrency(org.revenue_amount),
      
      // Format asset amount
      formattedAssets: this.formatCurrency(org.asset_amount),
      
      // Create verification badges
      badges: {
        verified: org.is_public_charity && org.is_tax_deductible,
        taxDeductible: org.is_tax_deductible,
        publicCharity: org.is_public_charity
      }
    };
  }

  /**
   * Format currency amounts for display
   * @param {number} amount - Amount in dollars
   * @returns {string} Formatted currency string
   */
  formatCurrency(amount) {
    if (!amount || amount === 0) return 'Not Available';
    
    if (amount >= 1000000000) {
      return `$${(amount / 1000000000).toFixed(1)}B`;
    } else if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(1)}K`;
    } else {
      return `$${amount.toLocaleString()}`;
    }
  }

  /**
   * Get organization category color for UI
   * @param {string} categoryCode - NTEE category code
   * @returns {string} CSS color class or hex color
   */
  getCategoryColor(categoryCode) {
    const colors = {
      'A': '#FF6B6B', // Arts - Red
      'B': '#4ECDC4', // Education - Teal
      'C': '#45B7D1', // Environment - Blue
      'D': '#96CEB4', // Animals - Green
      'E': '#FFEAA7', // Health - Yellow
      'F': '#DDA0DD', // Mental Health - Purple
      'G': '#FFB347', // Diseases - Orange
      'H': '#98D8C8', // Medical Research - Mint
      'I': '#F7DC6F', // Crime Prevention - Light Yellow
      'J': '#BB8FCE', // Employment - Light Purple
      'K': '#85C1E9', // Food/Agriculture - Light Blue
      'L': '#F8C471', // Housing - Peach
      'M': '#82E0AA', // Public Safety - Light Green
      'N': '#F1948A', // Recreation - Pink
      'O': '#D7BDE2', // Religion - Lavender
      'P': '#AED6F1', // Human Services - Sky Blue
      'Q': '#A9DFBF', // International - Sage
      'R': '#F9E79F', // Civil Rights - Cream
      'S': '#FADBD8', // Community Improvement - Rose
      'T': '#D5DBDB', // Philanthropy - Gray
      'U': '#FCF3CF', // Science - Light Cream
      'V': '#EBDEF0', // Social Science - Light Lavender
      'W': '#E8F8F5', // Public Benefit - Mint Cream
      'X': '#FEF9E7', // Religion Related - Ivory
      'Y': '#EAEDED', // Mutual Benefit - Light Gray
      'Z': '#F4F6F6'  // Unknown - Very Light Gray
    };
    
    return colors[categoryCode?.toUpperCase()] || colors['Z'];
  }
}

// Create and export a singleton instance
const organizationService = new OrganizationService();
export default organizationService;

// Also export the class for testing
export { OrganizationService };
