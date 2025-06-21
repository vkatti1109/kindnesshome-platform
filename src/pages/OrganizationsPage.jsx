import React, { useState } from 'react';
import { Search, Filter, MapPin, Users, Heart, Star, CheckCircle } from 'lucide-react';

export default function OrganizationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const organizations = [
    {
      id: 1,
      name: "American Red Cross",
      category: "Emergency Relief",
      location: "Washington, DC",
      description: "Providing emergency assistance, disaster relief, and disaster preparedness education.",
      rating: 4.8,
      verified: true,
      totalDonations: "$2.5M",
      campaigns: 12,
      image: "🏥"
    },
    {
      id: 2,
      name: "Doctors Without Borders",
      category: "Healthcare",
      location: "New York, NY",
      description: "Delivering emergency medical aid to people affected by conflict, epidemics, disasters, or exclusion from healthcare.",
      rating: 4.9,
      verified: true,
      totalDonations: "$1.8M",
      campaigns: 8,
      image: "🏥"
    },
    {
      id: 3,
      name: "World Wildlife Fund",
      category: "Environment",
      location: "Washington, DC",
      description: "Working to conserve nature and reduce the most pressing threats to the diversity of life on Earth.",
      rating: 4.7,
      verified: true,
      totalDonations: "$3.2M",
      campaigns: 15,
      image: "🌍"
    },
    {
      id: 4,
      name: "Feeding America",
      category: "Hunger Relief",
      location: "Chicago, IL",
      description: "Fighting hunger in the United States by connecting people with food and ending food waste.",
      rating: 4.8,
      verified: true,
      totalDonations: "$4.1M",
      campaigns: 20,
      image: "🍽️"
    },
    {
      id: 5,
      name: "Habitat for Humanity",
      category: "Housing",
      location: "Atlanta, GA",
      description: "Building homes, communities and hope by bringing people together to build affordable housing.",
      rating: 4.6,
      verified: true,
      totalDonations: "$2.9M",
      campaigns: 18,
      image: "🏠"
    },
    {
      id: 6,
      name: "United Way",
      category: "Community Development",
      location: "Alexandria, VA",
      description: "Improving lives by mobilizing the caring power of communities around the world.",
      rating: 4.5,
      verified: true,
      totalDonations: "$5.3M",
      campaigns: 25,
      image: "🤝"
    }
  ];

  const categories = ['all', 'Emergency Relief', 'Healthcare', 'Environment', 'Hunger Relief', 'Housing', 'Community Development'];

  const filteredOrganizations = organizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         org.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || org.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedOrganizations = filteredOrganizations.sort((a, b) => b.rating - a.rating);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-indigo-50 to-purple-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Verified <span className="gradient-text">Organizations</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover and support trusted charitable organizations making a real difference in the world.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search organizations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none bg-white"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Organizations Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-gray-600">
              Showing {sortedOrganizations.length} of {organizations.length} organizations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedOrganizations.map((org) => (
              <div key={org.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover-lift">
                {/* Card Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{org.image}</div>
                    <div className="flex items-center space-x-2">
                      {org.verified && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </span>
                      )}
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {org.category}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{org.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{org.description}</p>

                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    {org.location}
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="font-medium">{org.rating}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Users className="w-4 h-4 mr-1" />
                      {org.campaigns} campaigns
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-gray-500">Total raised:</span>
                      <span className="font-semibold text-gray-900 ml-1">{org.totalDonations}</span>
                    </div>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                      Donate Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {sortedOrganizations.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No organizations found</h3>
              <p className="text-gray-600">Try adjusting your search terms or filters.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}


