import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Globe, 
  Mail, 
  CheckCircle, 
  AlertCircle, 
  DollarSign, 
  Building, 
  Calendar,
  ExternalLink,
  Heart,
  Share2,
  Copy,
  Check
} from 'lucide-react';
import { useOrganization } from '../hooks/useOrganizations';

const OrganizationDetailPage = () => {
  const { ein } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const { organization, loading, error } = useOrganization(ein);

  useEffect(() => {
    // Check if organization is in favorites
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(ein));
  }, [ein]);

  const handleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let newFavorites;
    
    if (isFavorite) {
      newFavorites = favorites.filter(id => id !== ein);
    } else {
      newFavorites = [...favorites, ein];
    }
    
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: organization?.name,
          text: `Check out ${organization?.name} on KindnessHome`,
          url: url
        });
      } catch (err) {
        // Fallback to copy
        copyToClipboard(url);
      }
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const formatRevenue = (amount) => {
    if (!amount) return 'Not reported';
    if (amount >= 1000000000) return `$${(amount / 1000000000).toFixed(1)}B`;
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
    return `$${amount.toLocaleString()}`;
  };

  const getCategoryColor = (code) => {
    const colorMap = {
      'A': 'bg-purple-100 text-purple-800 border-purple-200',
      'B': 'bg-blue-100 text-blue-800 border-blue-200',
      'C': 'bg-green-100 text-green-800 border-green-200',
      'D': 'bg-orange-100 text-orange-800 border-orange-200',
      'E': 'bg-red-100 text-red-800 border-red-200',
      'F': 'bg-pink-100 text-pink-800 border-pink-200',
      'G': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'H': 'bg-teal-100 text-teal-800 border-teal-200',
      'I': 'bg-gray-100 text-gray-800 border-gray-200',
      'J': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'K': 'bg-lime-100 text-lime-800 border-lime-200',
      'L': 'bg-cyan-100 text-cyan-800 border-cyan-200',
      'M': 'bg-rose-100 text-rose-800 border-rose-200',
      'N': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'O': 'bg-violet-100 text-violet-800 border-violet-200',
      'P': 'bg-amber-100 text-amber-800 border-amber-200',
      'Q': 'bg-sky-100 text-sky-800 border-sky-200',
      'R': 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200',
      'S': 'bg-slate-100 text-slate-800 border-slate-200',
      'T': 'bg-stone-100 text-stone-800 border-stone-200',
      'U': 'bg-zinc-100 text-zinc-800 border-zinc-200',
      'V': 'bg-neutral-100 text-neutral-800 border-neutral-200',
      'W': 'bg-blue-100 text-blue-800 border-blue-200',
      'X': 'bg-purple-100 text-purple-800 border-purple-200',
      'Y': 'bg-green-100 text-green-800 border-green-200',
      'Z': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colorMap[code] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="bg-white rounded-lg shadow-sm border p-8">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </button>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
              <div>
                <h3 className="text-sm font-medium text-red-800">Error loading organization</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </button>
          
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Organization not found</h3>
            <p className="text-gray-600">The organization you're looking for could not be found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </button>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {/* Header */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {organization.name}
                </h1>
                
                <div className="flex items-center space-x-4 mb-4">
                  {organization.is_tax_deductible && (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">Tax Deductible</span>
                    </div>
                  )}
                  
                  {organization.category_code && (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getCategoryColor(organization.category_code)}`}>
                      {organization.category_name || `Category ${organization.category_code}`}
                    </span>
                  )}
                </div>

                {organization.city && organization.state && (
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{organization.city}, {organization.state}</span>
                    {organization.zip && <span className="ml-1">{organization.zip}</span>}
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={handleFavorite}
                  className={`p-2 rounded-lg border transition-colors ${
                    isFavorite 
                      ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100' 
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
                
                <button
                  onClick={handleShare}
                  className="p-2 rounded-lg border bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  {copied ? <Check className="h-5 w-5" /> : <Share2 className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Organization Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 text-gray-400 mr-3" />
                      <div>
                        <span className="text-sm text-gray-600">EIN:</span>
                        <span className="ml-2 font-mono text-sm">{organization.ein}</span>
                      </div>
                    </div>
                    
                    {organization.classification && (
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-gray-400 mr-3" />
                        <div>
                          <span className="text-sm text-gray-600">Classification:</span>
                          <span className="ml-2 text-sm">501(c)(3) Public Charity</span>
                        </div>
                      </div>
                    )}
                    
                    {organization.deductibility && (
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-gray-400 mr-3" />
                        <div>
                          <span className="text-sm text-gray-600">Deductibility:</span>
                          <span className="ml-2 text-sm">
                            {organization.deductibility === 1 ? 'Tax Deductible' : 'Not Tax Deductible'}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Financial Information */}
                {(organization.revenue_amount || organization.asset_amount) && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Financial Information</h3>
                    <div className="space-y-3">
                      {organization.revenue_amount && (
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm text-gray-600">Annual Revenue</span>
                          <span className="font-semibold text-gray-900">
                            {formatRevenue(organization.revenue_amount)}
                          </span>
                        </div>
                      )}
                      
                      {organization.asset_amount && (
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm text-gray-600">Total Assets</span>
                          <span className="font-semibold text-gray-900">
                            {formatRevenue(organization.asset_amount)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
                  <div className="space-y-3">
                    {organization.address && (
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 text-gray-400 mr-3 mt-0.5" />
                        <div className="text-sm text-gray-600">
                          <div>{organization.address}</div>
                          <div>
                            {organization.city}, {organization.state} {organization.zip}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {organization.phone && (
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-gray-400 mr-3" />
                        <a 
                          href={`tel:${organization.phone}`}
                          className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          {organization.phone}
                        </a>
                      </div>
                    )}
                    
                    {organization.website && (
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 text-gray-400 mr-3" />
                        <a 
                          href={organization.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800 transition-colors flex items-center"
                        >
                          Visit Website
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                    )}
                    
                    {organization.email && (
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-gray-400 mr-3" />
                        <a 
                          href={`mailto:${organization.email}`}
                          className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          {organization.email}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Additional Information</h3>
                  <div className="space-y-3">
                    {organization.ntee_code && (
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">NTEE Code</span>
                        <span className="font-mono text-sm text-gray-900">{organization.ntee_code}</span>
                      </div>
                    )}
                    
                    {organization.status && (
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">Status</span>
                        <span className="text-sm text-gray-900">
                          {organization.status === 1 ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500">
                Data sourced from the IRS Business Master File
              </p>
              <div className="flex items-center text-xs text-gray-500">
                <Calendar className="h-3 w-3 mr-1" />
                Last updated: {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationDetailPage;

