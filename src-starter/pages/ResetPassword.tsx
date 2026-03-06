import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../config/supabase';
import { Button } from '../components/shared/Button/Button';
import { ROUTES } from '../config/routes.config';
import './Auth.css';

export const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('PASSCODE MUST BE AT LEAST 6 CHARACTERS.');
      return;
    }

    if (password !== confirmPassword) {
      setError('PASSCODES DO NOT MATCH.');
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw new Error(error.message);
      setSuccess(true);
      setTimeout(() => navigate(ROUTES.LOGIN, { replace: true }), 3000);
    } catch (err: any) {
      setError(err.message || 'FAILED TO UPDATE PASSCODE.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="auth-page">
        <div className="auth-split">
          <div className="auth-sidebar">
            <div className="hero-eyebrow">OPERATION COMPLETE</div>
            <h1>PASSCODE UPDATED</h1>
            <p className="auth-subtitle">REDIRECTING TO LOGIN...</p>
          </div>
          <div className="auth-form-wrapper">
            <div className="auth-container dossier-card">
              <p style={{ fontFamily: "'Space Mono', monospace", textTransform: 'uppercase', fontWeight: 700 }}>
                Your passcode has been successfully updated. Redirecting to login...
              </p>
              <p className="auth-link" style={{ marginTop: '2rem' }}>
                <Link to={ROUTES.LOGIN}>PROCEED TO LOGIN NOW</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-split">
        <div className="auth-sidebar">
          <div className="hero-eyebrow">SECURITY PROTOCOL</div>
          <h1>RESET PASSCODE</h1>
          <p className="auth-subtitle">ENTER YOUR NEW PASSCODE BELOW</p>
        </div>

        <div className="auth-form-wrapper">
          <div className="auth-container dossier-card">
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="password">[ NEW PASSCODE ]</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirm-password">[ CONFIRM PASSCODE ]</label>
                <input
                  id="confirm-password"
                  type="password"
                  placeholder="Re-enter new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>

              <Button type="submit" loading={isLoading} size="lg" className="submit-btn brutalist-btn">
                UPDATE PASSCODE
              </Button>
            </form>

            <p className="auth-link">
              <Link to={ROUTES.LOGIN}>RETURN TO LOGIN</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
