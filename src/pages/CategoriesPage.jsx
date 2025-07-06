/**
 * Updated CategoriesPage with Real NTEE Categories
 * Browse organizations by official IRS category classifications
 */

import React, { useState } from 'react';
import { ChevronRight, Users, Search, ArrowLeft } from 'lucide-react';
import { useCategories, useOrganizationsByCategory } from '../hooks/useOrganizations';
import { OrganizationGrid } from '../components/OrganizationCard';
import organizationService from '../services/organizationService';

const CategoriesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all categories
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();

  // Fetch organizations for selected category
  const {
    organizations: categoryOrganizations,
    loading: organizationsLoading,
    error: organizationsError,
    categoryInfo
  } = useOrganizationsByCategory(selectedCategory?.code, 24);

  // Filter categories based on search
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  const handleOrganizationClick = (organization) => {
    // Navigate to organization detail page
    console.log('Navigate to organization:', organization.ein);
    // Example: navigate(`/organizations/${organization.ein}`);
  };

  // Category icons mapping
  const getCategoryIcon = (code) => {
    const icons = {
      'A': '🎨', 'B': '📚', 'C': '🌱', 'D': '🐾', 'E': '🏥',
      'F': '🧠', 'G': '🔬', 'H': '⚕️', 'I': '🚔', 'J': '💼',
      'K': '🌾', 'L': '🏠', 'M': '🚨', 'N': '⚽', 'O': '⛪',
      'P': '🤝', 'Q': '🌍', 'R': '⚖️', 'S': '🏘️', 'T': '💝',
      'U': '🔬', 'V': '📊', 'W': '🏛️', 'X': '✝️', 'Y': '👥', 'Z': '❓'
    };
    return icons[code] || '📋';
  };

  if (categoriesLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading categories...</p>
          </div>
        </div>
      </div>
    );
  }

  if (categoriesError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <h3 className="text-red-800 font-semibold mb-2">Error Loading Categories</h3>
              <p className="text-red-600">{categoriesError}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show category organizations view
  if (selectedCategory) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={handleBackToCategories}
                  className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <ArrowLeft size={20} className="text-gray-600" />
                </button>
                <div>
                  <div className="flex items-center mb-2">
                    <span className="text-3xl mr-3">{getCategoryIcon(selectedCategory.code)}</span>
                    <h1 className="text-2xl font-bold text-gray-900">{selectedCategory.name}</h1>
                  </div>
                  <p className="text-gray-600">{selectedCategory.description}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Category Code</div>
                <div className="text-lg font-semibold text-gray-900">{selectedCategory.code}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Organizations */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {organizationsError && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="text-red-800">
                <strong>Error:</strong> {organizationsError}
              </div>
            </div>
          )}

          {categoryInfo.count > 0 && (
            <div className="mb-6 text-center">
              <p className="text-gray-600">
                Showing <span className="font-semibold text-gray-900">{categoryOrganizations.length}</span> organizations
                in <span className="font-semibold">{selectedCategory.name}</span>
              </p>
            </div>
          )}

          <OrganizationGrid
            organizations={categoryOrganizations}
            loading={organizationsLoading}
            onOrganizationClick={handleOrganizationClick}
            emptyMessage={`No organizations found in ${selectedCategory.name} category`}
          />
        </div>
      </div>
    );
  }

  // Show categories grid view
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              Browse by Category
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Explore charitable organizations by their official IRS classification. 
              Find the perfect cause that matches your giving interests.
            </p>

            {/* Search Categories */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <CategoryCard
              key={category.code}
              category={category}
              onClick={() => handleCategoryClick(category)}
              icon={getCategoryIcon(category.code)}
            />
          ))}
        </div>

        {filteredCategories.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-2">No categories found</div>
            <div className="text-gray-400 text-sm">
              Try searching with different keywords
            </div>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              About NTEE Categories
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              The National Taxonomy of Exempt Entities (NTEE) is used by the IRS to classify 
              nonprofit organizations. Each category represents a specific area of charitable work, 
              helping donors find organizations that align with their giving goals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Category Card Component
const CategoryCard = ({ category, onClick, icon }) => {
  const categoryColor = organizationService.getCategoryColor(category.code);

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-200 group"
    >
      {/* Color bar */}
      <div 
        className="h-2 rounded-t-lg"
        style={{ backgroundColor: categoryColor }}
      />
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <span className="text-3xl mr-3">{icon}</span>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {category.name}
              </h3>
              <div className="text-sm text-gray-500">Code: {category.code}</div>
            </div>
          </div>
          <ChevronRight 
            size={20} 
            className="text-gray-400 group-hover:text-blue-600 transition-colors" 
          />
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {category.description}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center text-gray-500 text-sm">
            <Users size={16} className="mr-1" />
            <span>Browse Organizations</span>
          </div>
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: categoryColor }}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;

