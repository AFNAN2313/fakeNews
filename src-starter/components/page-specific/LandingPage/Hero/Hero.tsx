import React from 'react';
import './Hero.tsx.css';

export const Hero: React.FC = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Welcome to Fake News Detector</h1>
        <p>Verify the credibility of news articles using AI-powered analysis</p>
      </div>
    </section>
  );
};
