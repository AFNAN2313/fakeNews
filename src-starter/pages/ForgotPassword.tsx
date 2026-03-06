import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../config/supabase';
import { Button } from '../components/shared/Button/Button';
import { ROUTES } from '../config/routes.config';
import './Auth.css';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw new Error(error.message);
      setSent(true);
    } catch (err: any) {
      setError(err.message || 'FAILED TO SEND RESET LINK.');
    } finally {
      setIsLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="auth-page">
        <div className="auth-split">
          <div className="auth-sidebar">
            <div className="hero-eyebrow">TRANSMISSION SENT</div>
            <h1>CHECK YOUR INBOX</h1>
            <p className="auth-subtitle">RECOVERY PROTOCOL INITIATED</p>
          </div>
          <div className="auth-form-wrapper">
            <div className="auth-container dossier-card">
              <p style={{ fontFamily: "'Space Mono', monospace", marginBottom: '1rem', textTransform: 'uppercase', fontWeight: 700 }}>
                A password reset link has been dispatched to <strong>{email}</strong>.
              </p>
              <p style={{ fontFamily: "'Space Mono', monospace", textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-secondary)' }}>
                Check your inbox and click the link to reset your passcode.
              </p>
              <p className="auth-link" style={{ marginTop: '2rem' }}>
                <Link to={ROUTES.LOGIN}>RETURN TO LOGIN</Link>
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
          <div className="hero-eyebrow">CLEARANCE RECOVERY</div>
          <h1>FORGOT PASSCODE</h1>
          <p className="auth-subtitle">ENTER YOUR EMAIL TO RECEIVE A RESET LINK</p>
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
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" loading={isLoading} size="lg" className="submit-btn brutalist-btn">
                SEND RESET LINK
              </Button>
            </form>

            <p className="auth-link">
              REMEMBER YOUR PASSCODE? <Link to={ROUTES.LOGIN}>PROCEED TO LOGIN</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
