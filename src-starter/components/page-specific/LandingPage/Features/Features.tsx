import React from 'react';
import './Features.tsx.css';

export const Features: React.FC = () => {
  const features = [
    {
      icon: '🔍',
      title: 'Submit Text',
      description: 'Paste or type news content for analysis',
    },
    {
      icon: '⚙️',
      title: 'AI Analysis',
      description: 'Machine learning models analyze the content',
    },
    {
      icon: '📊',
      title: 'Get Results',
      description: 'Receive credibility score and insights',
    },
  ];

  return (
    <section className="features-section">
      <h2>How It Works</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
