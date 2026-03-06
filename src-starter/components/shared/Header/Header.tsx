import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';
import { ROUTES } from '../../../config/routes.config';
import './Header.css';

export const Header: React.FC = () => {
  const { user, logout } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const isAuthenticated = !!user;

  const handleLogout = async () => {
    try {
      logout();
      setMenuOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to={ROUTES.HOME} className="logo" onClick={() => setMenuOpen(false)}>
          <span className="logo-icon">🔍</span>
          <span className="logo-text">NewsVerify</span>
        </Link>

        <button className="menu-toggle" onClick={toggleMenu}>
          <span className={`hamburger ${menuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        <nav className={`nav ${menuOpen ? 'active' : ''}`}>
          <Link to={ROUTES.HOME} className="nav-link" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to={ROUTES.ABOUT} className="nav-link" onClick={() => setMenuOpen(false)}>
            About
          </Link>

          {isAuthenticated ? (
            <>
              <Link to={ROUTES.DASHBOARD} className="nav-link" onClick={() => setMenuOpen(false)}>
                Dashboard
              </Link>
              <Link to={ROUTES.ANALYZE} className="nav-link" onClick={() => setMenuOpen(false)}>
                Analyze
              </Link>
              <button onClick={handleLogout} className="nav-button logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to={ROUTES.LOGIN} className="nav-link" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link to={ROUTES.SIGNUP} className="nav-link nav-button signup-btn" onClick={() => setMenuOpen(false)}>
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
