import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, Globe, Home, GraduationCap, Stethoscope, TreePine, Utensils, Shield, Handshake } from 'lucide-react';

export default function CategoriesPage() {
  const categories = [
    {
      id: 1,
      name: "Healthcare",
      description: "Supporting medical research, hospitals, and health initiatives worldwide.",
      icon: Stethoscope,
      color: "bg-red-100 text-red-600",
      organizations: 1247,
      totalRaised: "$12.5M",
      image: "🏥"
    },
    {
      id: 2,
      name: "Education",
      description: "Empowering communities through education, scholarships, and learning programs.",
      icon: GraduationCap,
      color: "bg-blue-100 text-blue-600",
      organizations: 892,
      totalRaised: "$8.3M",
      image: "📚"
    },
    {
      id: 3,
      name: "Environment",
      description: "Protecting our planet through conservation, sustainability, and climate action.",
      icon: TreePine,
      color: "bg-green-100 text-green-600",
      organizations: 634,
      totalRaised: "$15.2M",
      image: "🌍"
    },
    {
      id: 4,
      name: "Hunger Relief",
      description: "Fighting hunger and food insecurity in communities around the world.",
      icon: Utensils,
      color: "bg-orange-100 text-orange-600",
      organizations: 756,
      totalRaised: "$9.8M",
      image: "🍽️"
    },
    {
      id: 5,
      name: "Housing",
      description: "Providing shelter and housing solutions for those in need.",
      icon: Home,
      color: "bg-purple-100 text-purple-600",
      organizations: 423,
      totalRaised: "$6.7M",
      image: "🏠"
    },
    {
      id: 6,
      name: "Emergency Relief",
      description: "Rapid response to disasters, conflicts, and humanitarian crises.",
      icon: Shield,
      color: "bg-red-100 text-red-600",
      organizations: 312,
      totalRaised: "$18.9M",
      image: "🚨"
    },
    {
      id: 7,
      name: "Human Rights",
      description: "Defending human rights, equality, and social justice worldwide.",
      icon: Users,
      color: "bg-indigo-100 text-indigo-600",
      organizations: 567,
      totalRaised: "$7.4M",
      image: "⚖️"
    },
    {
      id: 8,
      name: "Community Development",
      description: "Building stronger communities through local initiatives and programs.",
      icon: Handshake,
      color: "bg-pink-100 text-pink-600",
      organizations: 934,
      totalRaised: "$11.1M",
      image: "🤝"
    },
    {
      id: 9,
      name: "International Aid",
      description: "Supporting global development and humanitarian efforts worldwide.",
      icon: Globe,
      color: "bg-teal-100 text-teal-600",
      organizations: 445,
      totalRaised: "$13.6M",
      image: "🌐"
    }
  ];

  const featuredOrganizations = [
    {
      name: "American Red Cross",
      category: "Emergency Relief",
      raised: "$2.5M",
      image: "🏥"
    },
    {
      name: "World Wildlife Fund",
      category: "Environment",
      raised: "$3.2M",
      image: "🌍"
    },
    {
      name: "Feeding America",
      category: "Hunger Relief",
      raised: "$4.1M",
      image: "🍽️"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-indigo-50 to-purple-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Explore <span className="gradient-text">Categories</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find causes that matter to you and discover organizations making a difference in each area.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">9</h3>
              <p className="text-gray-600">Major Categories</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">5,710</h3>
              <p className="text-gray-600">Total Organizations</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">$107.5M</h3>
              <p className="text-gray-600">Total Raised</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Link
                  key={category.id}
                  to={`/organizations?category=${encodeURIComponent(category.name)}`}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover-lift group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{category.image}</div>
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${category.color}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-gray-500">
                      <span className="font-medium text-gray-900">{category.organizations}</span> organizations
                    </div>
                    <div className="text-gray-500">
                      <span className="font-medium text-gray-900">{category.totalRaised}</span> raised
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Organizations */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Organizations
            </h2>
            <p className="text-xl text-gray-600">
              Top-performing organizations across different categories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredOrganizations.map((org, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center hover-lift">
                <div className="text-4xl mb-4">{org.image}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{org.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{org.category}</p>
                <p className="text-sm font-medium text-indigo-600">{org.raised} raised</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Make an Impact?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Choose a category that resonates with you and start supporting organizations that are making a real difference.
          </p>
          <Link
            to="/organizations"
            className="bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors hover-lift inline-block"
          >
            Browse All Organizations
          </Link>
        </div>
      </section>
    </div>
  );
}
