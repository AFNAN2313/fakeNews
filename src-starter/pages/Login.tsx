import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/shared/Button/Button';
import { ROUTES } from '../config/routes.config';
import './Auth.css';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate(ROUTES.HOME);
    } catch (err) {
      setError('AUTHORIZATION FAILED. INVALID CREDENTIALS.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-split">
        <div className="auth-sidebar">
          <div className="hero-eyebrow">CLEARANCE LEVEL: RESTRICTED</div>
          <h1>SYSTEM LOGIN</h1>
          <p className="auth-subtitle">ENTER CREDENTIALS TO ACCESS VERIFICATION NETWORK</p>

        </div>

        <div className="auth-form-wrapper">
          <div className="auth-container dossier-card">
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="email">[ OPERATIVE EMAIL ]</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">[ PASSCODE ]</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" loading={isLoading} size="lg" className="submit-btn brutalist-btn">
                AUTHENTICATE
              </Button>
            </form>

            <p className="auth-link">
              NO CLEARANCE? <Link to={ROUTES.SIGNUP}>REQUEST ACCESS</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
