/**
 * Updated OrganizationsPage with Real IRS Data Integration
 * Features search, filtering, and real organization data
 */

import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Users, TrendingUp, X } from 'lucide-react';
import { useOrganizationSearch, usePopularOrganizations } from '../hooks/useOrganizations';
import { OrganizationGrid } from '../components/OrganizationCard';

const OrganizationsPage = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('search'); // 'search' or 'popular'
  
  // Search functionality
  const {
    organizations: searchResults,
    loading: searchLoading,
    error: searchError,
    searchParams,
    searchResults: searchInfo,
    updateSearchParams,
    clearSearch
  } = useOrganizationSearch();

  // Popular organizations
  const {
    organizations: popularOrgs,
    loading: popularLoading,
    error: popularError
  } = usePopularOrganizations(12);

  // US States for filter dropdown
  const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  // Organization categories (simplified for filter)
  const categories = [
    { code: 'A', name: 'Arts & Culture' },
    { code: 'B', name: 'Education' },
    { code: 'C', name: 'Environment' },
    { code: 'D', name: 'Animals' },
    { code: 'E', name: 'Health' },
    { code: 'F', name: 'Mental Health' },
    { code: 'G', name: 'Diseases' },
    { code: 'H', name: 'Medical Research' },
    { code: 'P', name: 'Human Services' },
    { code: 'Q', name: 'International' },
    { code: 'R', name: 'Civil Rights' },
    { code: 'S', name: 'Community' },
    { code: 'T', name: 'Philanthropy' },
    { code: 'X', name: 'Religion' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setActiveTab('search');
  };

  const handleFilterChange = (filterType, value) => {
    updateSearchParams({ [filterType]: value });
    setActiveTab('search');
  };

  const clearAllFilters = () => {
    clearSearch();
    setShowFilters(false);
  };

  const handleOrganizationClick = (organization) => {
    // Navigate to organization detail page
    // You can implement this with React Router
    console.log('Navigate to organization:', organization.ein);
    // Example: navigate(`/organizations/${organization.ein}`);
  };

  const currentOrganizations = activeTab === 'search' ? searchResults : popularOrgs;
  const currentLoading = activeTab === 'search' ? searchLoading : popularLoading;
  const currentError = activeTab === 'search' ? searchError : popularError;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              Discover Charitable Organizations
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Search through 1.7 million verified 501(c)(3) organizations and find the perfect charity for your giving goals
            </p>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search organizations by name (e.g., 'American Red Cross', 'local food bank')"
                    value={searchParams.query}
                    onChange={(e) => updateSearchParams({ query: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 px-6 py-3 rounded-lg transition-colors flex items-center justify-center"
                >
                  <Filter size={20} className="mr-2" />
                  Filters
                </button>
              </div>
            </form>

            {/* Filter Panel */}
            {showFilters && (
              <div className="mt-6 bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* State Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-2">State</label>
                    <select
                      value={searchParams.state}
                      onChange={(e) => handleFilterChange('state', e.target.value)}
                      className="w-full px-3 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      <option value="">All States</option>
                      {states.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>

                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select
                      value={searchParams.category}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                      className="w-full px-3 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      <option value="">All Categories</option>
                      {categories.map(cat => (
                        <option key={cat.code} value={cat.code}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* City Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-2">City</label>
                    <input
                      type="text"
                      placeholder="Enter city name"
                      value={searchParams.city}
                      onChange={(e) => handleFilterChange('city', e.target.value)}
                      className="w-full px-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                    />
                  </div>
                </div>

                {/* Clear Filters */}
                {(searchParams.state || searchParams.category || searchParams.city || searchParams.query) && (
                  <div className="mt-4 text-center">
                    <button
                      onClick={clearAllFilters}
                      className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-md transition-colors flex items-center mx-auto"
                    >
                      <X size={16} className="mr-2" />
                      Clear All Filters
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm border">
            <button
              onClick={() => setActiveTab('search')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'search'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Search size={16} className="inline mr-2" />
              Search Results
            </button>
            <button
              onClick={() => setActiveTab('popular')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'popular'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <TrendingUp size={16} className="inline mr-2" />
              Popular Organizations
            </button>
          </div>
        </div>

        {/* Results Info */}
        {activeTab === 'search' && searchInfo.count > 0 && (
          <div className="mb-6 text-center">
            <p className="text-gray-600">
              Found <span className="font-semibold text-gray-900">{searchInfo.count}</span> organizations
              {searchInfo.query && (
                <span> matching "<span className="font-semibold">{searchInfo.query}</span>"</span>
              )}
            </p>
          </div>
        )}

        {/* Error Display */}
        {currentError && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="text-red-800">
              <strong>Error:</strong> {currentError}
            </div>
          </div>
        )}

        {/* Organizations Grid */}
        <OrganizationGrid
          organizations={currentOrganizations}
          loading={currentLoading}
          onOrganizationClick={handleOrganizationClick}
          emptyMessage={
            activeTab === 'search' 
              ? searchParams.query 
                ? "No organizations found matching your search criteria"
                : "Enter a search term to find organizations"
              : "Unable to load popular organizations"
          }
        />

        {/* Load More Button (for search results) */}
        {activeTab === 'search' && searchResults.length > 0 && searchResults.length >= searchParams.limit && (
          <div className="text-center mt-8">
            <button
              onClick={() => updateSearchParams({ limit: searchParams.limit + 20 })}
              disabled={searchLoading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              {searchLoading ? 'Loading...' : 'Load More Organizations'}
            </button>
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex justify-center mb-4">
                <Users className="text-blue-600" size={48} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">1.7M+</h3>
              <p className="text-gray-600">Verified 501(c)(3) Organizations</p>
            </div>
            <div>
              <div className="flex justify-center mb-4">
                <MapPin className="text-green-600" size={48} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">50 States</h3>
              <p className="text-gray-600">Nationwide Coverage</p>
            </div>
            <div>
              <div className="flex justify-center mb-4">
                <TrendingUp className="text-purple-600" size={48} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Real-time</h3>
              <p className="text-gray-600">IRS Database Updates</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationsPage;

