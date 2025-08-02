import React from 'react';
import { Link, NavLink } from 'react-router-dom';

// A simple SVG logo to reuse from the Header
const Logo = () => (
  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

          {/* Column 1: Brand & Disclaimer */}
          <div>
            <Link to="/" className="flex items-center justify-center md:justify-start gap-2">
              <Logo />
              <span className="text-xl font-bold text-gray-800">HealthBooker</span>
            </Link>
            <p className="mt-2 text-sm text-gray-600">
              Simplifying your healthcare journey, one appointment at a time.
            </p>
            <p className="mt-4 text-xs text-red-500 bg-red-50 p-2 rounded-md">
              <strong>Disclaimer:</strong> This is a demonstration project for portfolio purposes and is not intended for real medical use.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:mx-auto">
            <h3 className="font-semibold text-gray-800 uppercase tracking-wider">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><NavLink to="/" className="text-gray-600 hover:text-blue-600 transition-colors">Doctors</NavLink></li>
              <li><NavLink to="/my-appointments" className="text-gray-600 hover:text-blue-600 transition-colors">My Appointments</NavLink></li>
            </ul>
          </div>

          {/* Column 3: Legal (with placeholder links) */}
          <div className="md:mx-auto">
            <h3 className="font-semibold text-gray-800 uppercase tracking-wider">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#/" className="text-gray-600 hover:text-blue-600 transition-colors">Terms of Service</a></li>
              <li><a href="#/" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-10 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} HealthBooker. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
