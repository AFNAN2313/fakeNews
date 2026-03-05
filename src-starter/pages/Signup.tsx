import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/shared/Button/Button';
import { ROUTES } from '../config/routes.config';
import './Auth.css';

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { signup, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signup(email, username, password);
      navigate(ROUTES.HOME);
    } catch (err) {
      setError('ACCESS DENIED. REGISTRATION FAILED.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-split">
        <div className="auth-sidebar">
          <div className="hero-eyebrow">NEW OPERATIVE REGISTRATION</div>
          <h1>AUTHORIZATION REQUEST</h1>
          <p className="auth-subtitle">JOIN THE VERIFICATION NETWORK</p>
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
                <label htmlFor="username">[ CODENAME / USERNAME ]</label>
                <input
                  id="username"
                  type="text"
                  placeholder="Choose a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">[ ENCRYPTED PASSCODE ]</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" loading={isLoading} size="lg" className="submit-btn brutalist-btn">
                SUBMIT CREDENTIALS
              </Button>
            </form>

            <p className="auth-link">
              ALREADY AUTHORIZED? <Link to={ROUTES.LOGIN}>PROCEED TO LOGIN</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
