import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Header() {
  const linkStyles = "text-white hover:text-blue-200 transition-colors";
  const activeLinkStyles = {
    textDecoration: 'underline',
    textUnderlineOffset: '4px'
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
        Healthcare Appointment Booking
        </Link>
        <div className="flex gap-6">
          <NavLink
            to="/"
            className={linkStyles}
            style={({ isActive }) => isActive ? activeLinkStyles : undefined}
          >
            Doctors
          </NavLink>
          <NavLink
            to="/my-appointments"
            className={linkStyles}
            style={({ isActive }) => isActive ? activeLinkStyles : undefined}
          >
            My Appointments
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Header;
