import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/shared/Button/Button';
import { ROUTES } from '../config/routes.config';
import './NotFound.css';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <h1 className="not-found-code">404</h1>
        <h2 className="not-found-title">Page Not Found</h2>
        <p className="not-found-message">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button onClick={() => navigate(ROUTES.HOME)} size="lg">
          Go Back Home
        </Button>
      </div>
    </div>
  );
};
