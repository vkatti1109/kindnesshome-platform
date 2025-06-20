import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Facebook, Twitter, Instagram, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/kindnesshome-logo.png" alt="KindnessHome" className="w-8 h-8" />
              <span className="text-xl font-bold text-foreground">KindnessHome</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Empowering charitable giving by connecting donors with verified organizations 
              and meaningful causes worldwide.
            </p>
            <div className="flex space-x-4">
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook className="h-4 w-4" />
              </button>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-4 w-4" />
              </button>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="h-4 w-4" />
              </button>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Discover</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/organizations" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Browse Organizations
                </Link>
              </li>
              <li>
                <Link to="/campaigns" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Active Campaigns
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/impact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Impact Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/safety" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Safety & Security
                </Link>
              </li>
              <li>
                <Link to="/tax-receipts" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Tax Receipts
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Stay Updated</h3>
            <p className="text-sm text-muted-foreground">
              Get the latest updates on new campaigns and impact stories.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 text-sm border border-input rounded-md bg-background"
              />
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground px-3 py-2 text-sm rounded-md hover:bg-primary/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-sm text-muted-foreground">
                © 2025 KindnessHome. All rights reserved.
              </p>
              <div className="flex space-x-4">
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
                <Link to="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Cookie Policy
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Secured by</span>
              <span className="font-semibold">SSL</span>
              <span>•</span>
              <span>PCI Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
