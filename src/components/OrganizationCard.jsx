/**
 * OrganizationCard Component
 * Displays individual organization information in a card format
 */

import React from 'react';
import { MapPin, Shield, CheckCircle, ExternalLink, Heart } from 'lucide-react';
import organizationService from '../services/organizationService';

const OrganizationCard = ({ 
  organization, 
  onClick, 
  showFullDetails = false,
  className = '',
  onFavorite,
  isFavorite = false
}) => {
  if (!organization) return null;

  const handleCardClick = () => {
    if (onClick) {
      onClick(organization);
    }
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (onFavorite) {
      onFavorite(organization);
    }
  };

  const getCategoryColor = (categoryCode) => {
    return organizationService.getCategoryColor(categoryCode);
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 cursor-pointer ${className}`}
      onClick={handleCardClick}
    >
      {/* Header with category color bar */}
      <div 
        className="h-2 rounded-t-lg"
        style={{ backgroundColor: getCategoryColor(organization.ntee_code) }}
      />
      
      <div className="p-6">
        {/* Organization Name and Favorite Button */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1 mr-2">
            {organization.name}
          </h3>
          {onFavorite && (
            <button
              onClick={handleFavoriteClick}
              className={`p-1 rounded-full transition-colors ${
                isFavorite 
                  ? 'text-red-500 hover:text-red-600' 
                  : 'text-gray-400 hover:text-red-500'
              }`}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart 
                size={20} 
                fill={isFavorite ? 'currentColor' : 'none'}
              />
            </button>
          )}
        </div>

        {/* Location */}
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin size={16} className="mr-2 flex-shrink-0" />
          <span className="text-sm">
            {organization.city}, {organization.state}
          </span>
        </div>

        {/* Category */}
        {organization.category_name && (
          <div className="mb-3">
            <span 
              className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white"
              style={{ backgroundColor: getCategoryColor(organization.ntee_code) }}
            >
              {organization.category_name}
            </span>
          </div>
        )}

        {/* Verification Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {organization.badges?.verified && (
            <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
              <Shield size={12} className="mr-1" />
              Verified 501(c)(3)
            </div>
          )}
          {organization.badges?.taxDeductible && (
            <div className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
              <CheckCircle size={12} className="mr-1" />
              Tax Deductible
            </div>
          )}
        </div>

        {/* Revenue Information */}
        {showFullDetails && organization.formattedRevenue && organization.formattedRevenue !== 'Not Available' && (
          <div className="mb-3">
            <div className="text-sm text-gray-600">
              <span className="font-medium">Annual Revenue:</span> {organization.formattedRevenue}
            </div>
          </div>
        )}

        {/* EIN */}
        {showFullDetails && organization.formattedEin && (
          <div className="mb-3">
            <div className="text-sm text-gray-600">
              <span className="font-medium">EIN:</span> {organization.formattedEin}
            </div>
          </div>
        )}

        {/* Full Address */}
        {showFullDetails && organization.fullAddress && (
          <div className="mb-4">
            <div className="text-sm text-gray-600">
              <span className="font-medium">Address:</span>
              <div className="mt-1">{organization.fullAddress}</div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <button
            onClick={handleCardClick}
            className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
          >
            View Details
            <ExternalLink size={14} className="ml-1" />
          </button>
          
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                // Handle donate action
                window.open(`https://www.guidestar.org/profile/${organization.ein}`, '_blank');
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Donate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Skeleton loading component
export const OrganizationCardSkeleton = ({ className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md border border-gray-200 animate-pulse ${className}`}>
      <div className="h-2 bg-gray-300 rounded-t-lg" />
      <div className="p-6">
        <div className="h-6 bg-gray-300 rounded mb-3" />
        <div className="flex items-center mb-3">
          <div className="w-4 h-4 bg-gray-300 rounded mr-2" />
          <div className="h-4 bg-gray-300 rounded w-32" />
        </div>
        <div className="h-6 bg-gray-300 rounded w-24 mb-3" />
        <div className="flex gap-2 mb-4">
          <div className="h-6 bg-gray-300 rounded w-20" />
          <div className="h-6 bg-gray-300 rounded w-24" />
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="h-4 bg-gray-300 rounded w-20" />
          <div className="h-8 bg-gray-300 rounded w-16" />
        </div>
      </div>
    </div>
  );
};

// Grid component for displaying multiple organization cards
export const OrganizationGrid = ({ 
  organizations, 
  loading, 
  onOrganizationClick,
  onFavorite,
  favoriteEins = [],
  showFullDetails = false,
  emptyMessage = "No organizations found",
  className = ""
}) => {
  if (loading) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {[...Array(6)].map((_, index) => (
          <OrganizationCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!organizations || organizations.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-2">{emptyMessage}</div>
        <div className="text-gray-400 text-sm">Try adjusting your search criteria</div>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {organizations.map((org) => (
        <OrganizationCard
          key={org.ein}
          organization={org}
          onClick={onOrganizationClick}
          onFavorite={onFavorite}
          isFavorite={favoriteEins.includes(org.ein)}
          showFullDetails={showFullDetails}
        />
      ))}
    </div>
  );
};

export default OrganizationCard;

