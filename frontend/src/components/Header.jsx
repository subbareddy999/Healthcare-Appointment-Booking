import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Logo = () => (
  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

function Header() {
  const navLinkBaseClasses = "px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300";

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-3xl border-b border-gray-200/50">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">

        <Link to="/" className="flex items-center gap-2">
          <Logo />
          <span className="text-xl font-bold text-gray-800">HealthBooker</span>
        </Link>

        <div className="flex items-center gap-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${navLinkBaseClasses} ${isActive
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-blue-100 hover:text-blue-700'}`
            }
          >
            Doctors
          </NavLink>
          <NavLink
            to="/my-appointments"
            className={({ isActive }) =>
              `${navLinkBaseClasses} ${isActive
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-blue-100 hover:text-blue-700'}`
            }
          >
            My Appointments
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Header;
