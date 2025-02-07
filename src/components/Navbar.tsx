import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Stethoscope, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { user, profile, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Stethoscope className="h-8 w-8 text-teal-600" />
            <span className="text-xl font-bold text-gray-800">DermaClinic</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <a href="/#about" className="text-gray-600 hover:text-gray-900">
              About
            </a>
            <Link to="/book" className="text-gray-600 hover:text-gray-900">
              Book Appointment
            </Link>
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                {profile?.is_admin ? (
                  <Link
                    to="/admin"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Admin Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/dashboard"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    My Appointments
                  </Link>
                )}
                <button
                  onClick={signOut}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-600 hover:text-gray-900"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              to="/"
              className="block text-gray-600 hover:text-gray-900"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <a
              href="/#about"
              className="block text-gray-600 hover:text-gray-900"
              onClick={toggleMenu}
            >
              About
            </a>
            <Link
              to="/book"
              className="block text-gray-600 hover:text-gray-900"
              onClick={toggleMenu}
            >
              Book Appointment
            </Link>
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="block text-gray-600 hover:text-gray-900"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors"
                  onClick={toggleMenu}
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                {profile?.is_admin ? (
                  <Link
                    to="/admin"
                    className="block text-gray-600 hover:text-gray-900"
                    onClick={toggleMenu}
                  >
                    Admin Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/dashboard"
                    className="block text-gray-600 hover:text-gray-900"
                    onClick={toggleMenu}
                  >
                    My Appointments
                  </Link>
                )}
                <button
                  onClick={() => {
                    signOut();
                    toggleMenu();
                  }}
                  className="block text-gray-600 hover:text-gray-900 w-full text-left"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}