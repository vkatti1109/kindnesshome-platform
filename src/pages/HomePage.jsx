import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Shield, Users, TrendingUp, Search, Star } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome to{' '}
              <span className="gradient-text">KindnessHome</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Connect with verified charitable organizations and make meaningful donations 
              to causes you care about. Every act of kindness creates a ripple of hope.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/organizations"
                className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors hover-lift"
              >
                Explore Organizations
              </Link>
              <Link
                to="/categories"
                className="bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition-colors hover-lift"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">10,000+</h3>
              <p className="text-gray-600">Verified Organizations</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">$50M+</h3>
              <p className="text-gray-600">Donations Facilitated</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">500K+</h3>
              <p className="text-gray-600">Lives Impacted</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose KindnessHome?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We make charitable giving simple, secure, and impactful by connecting you 
              with verified organizations that align with your values.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover-lift">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Verified Organizations</h3>
              <p className="text-gray-600">
                All organizations are thoroughly vetted and verified as legitimate 501(c)(3) 
                tax-exempt entities for your peace of mind.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover-lift">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Search className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Easy Discovery</h3>
              <p className="text-gray-600">
                Find organizations by cause, location, or impact area using our intuitive 
                search and filtering system.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover-lift">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Secure Donations</h3>
              <p className="text-gray-600">
                Your donations are processed securely with automatic tax receipt generation 
                and transparent tracking.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover-lift">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Impact Tracking</h3>
              <p className="text-gray-600">
                See the real impact of your donations with detailed reports and updates 
                from the organizations you support.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover-lift">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Community Driven</h3>
              <p className="text-gray-600">
                Join a community of like-minded donors and discover new causes through 
                recommendations and shared experiences.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover-lift">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Trusted Platform</h3>
              <p className="text-gray-600">
                Built with transparency and trust in mind, featuring organization ratings, 
                reviews, and detailed financial information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of donors who are creating positive change in the world. 
            Start your journey of giving today.
          </p>
          <Link
            to="/register"
            className="bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors hover-lift inline-block"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
