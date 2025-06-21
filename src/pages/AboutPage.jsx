import React from 'react';
import { Heart, Shield, Users, Globe, Award, TrendingUp } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-50 to-purple-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              About <span className="gradient-text">KindnessHome</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              We believe that every act of kindness, no matter how small, has the power to create 
              meaningful change in the world. KindnessHome connects generous hearts with verified 
              charitable organizations to amplify the impact of giving.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                To democratize charitable giving by creating a transparent, secure, and user-friendly 
                platform that connects donors with verified organizations making a real difference in 
                communities worldwide.
              </p>
              <p className="text-lg text-gray-600">
                We envision a world where giving is accessible to everyone, where donors can easily 
                discover causes they care about, and where every donation creates measurable impact.
              </p>
            </div>
            <div className="text-center">
              <div className="text-8xl mb-6">🏠</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Building a Home for Kindness
              </h3>
              <p className="text-gray-600">
                A place where compassion meets action, and where every donation finds its perfect home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core principles guide everything we do at KindnessHome
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Trust & Transparency</h3>
              <p className="text-gray-600">
                Every organization on our platform is thoroughly vetted and verified. We provide 
                complete transparency about where donations go and their impact.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Compassion First</h3>
              <p className="text-gray-600">
                We put empathy and compassion at the center of everything we do, ensuring that 
                both donors and recipients feel valued and supported.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Community Impact</h3>
              <p className="text-gray-600">
                We believe in the power of community and work to amplify collective impact 
                through collaborative giving and shared purpose.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Global Reach</h3>
              <p className="text-gray-600">
                We connect local generosity with global needs, making it easy to support 
                causes both in your community and around the world.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in our platform, our partnerships, and our service 
                to ensure the best possible experience for all users.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Measurable Impact</h3>
              <p className="text-gray-600">
                We believe in accountability and provide clear metrics and reporting so 
                donors can see the real-world impact of their generosity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Commitment
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to building a platform that serves both donors and organizations 
              with integrity, innovation, and unwavering dedication to positive change.
            </p>
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Join Our Mission
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Whether you're a donor looking to make a difference or an organization seeking 
              support, KindnessHome is here to help you create positive change in the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
                Start Giving Today
              </button>
              <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition-colors">
                Partner With Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

