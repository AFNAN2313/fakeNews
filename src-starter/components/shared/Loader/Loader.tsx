import React from 'react';
import './Loader.css';

interface LoaderProps {
  message?: string;
  fullScreen?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ message = 'Loading...', fullScreen = false }) => {
  return (
    <div className={`loader-container ${fullScreen ? 'fullscreen' : ''}`}>
      <div className="loader">
        <div className="spinner"></div>
        <p>{message}</p>
      </div>
    </div>
  );
};
