import React from 'react';
import './About.css';

export const About: React.FC = () => {
  return (
    <div className="about-page">
      <main className="about-content">
        <div className="about-hero">
          <div className="hero-eyebrow">DECLASSIFIED DOCUMENT // FILE 849-B</div>
          <h1>ABOUT THE VERIFICATION SYSTEM</h1>
          <p>EMPOWERING THE PUBLIC TO EXPOSE MANIPULATED NARRATIVES</p>
        </div>

        <section className="about-section dossier-card">
          <h2>MISSION STATEMENT</h2>
          <p>
            The Truth Verification System is an advanced machine learning apparatus designed entirely to dismantle falsehoods and identify manipulated media. By utilizing sophisticated Natural Language Processing (NLP) models, we analyze structural linguistic patterns to verify credibility without political bias.
          </p>
        </section>

        <section className="about-section dossier-card">
          <h2>STANDARD OPERATING PROCEDURE</h2>
          <ol className="brutalist-list">
            <li>
              <strong>DATA SUBMISSION:</strong> Operatives input suspicious articles, URLs, or raw text fragments into the secure analyzer.
            </li>
            <li>
              <strong>NEURAL DISSECTION:</strong> The system rapidly deconstructs sentence structures, looking for emotive manipulation and factual variance.
            </li>
            <li>
              <strong>PATTERN MATCHING:</strong> Deployed models compare inputs against terabytes of verified investigative journalism databases.
            </li>
            <li>
              <strong>THREAT ASSESSMENT:</strong> A precise, algorithmic confidence score is generated, indicating the presence of disinformation.
            </li>
            <li>
              <strong>FINAL BRIEFING:</strong> The user receives an immutable, detailed report highlighting critical danger zones within the text.
            </li>
          </ol>
        </section>

        <section className="about-section dossier-card">
          <h2>SYSTEM ARCHITECTURE</h2>
          <div className="tech-stack">
            <div className="tech-item">
              <h3>[ CLIENT INTERFACE ]</h3>
              <ul className="brutalist-list">
                <li>React 18+ Architecture</li>
                <li>Vite Build System</li>
                <li>State Synchronization (Zustand)</li>
                <li>Encrypted Routing protocols</li>
              </ul>
            </div>
            <div className="tech-item">
              <h3>[ CORE ENGINE ]</h3>
              <ul className="brutalist-list">
                <li>Python NLP Heuristics</li>
                <li>Deep Learning Models</li>
                <li>RESTful API Bridges</li>
                <li>Millisecond Data Processing</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="about-section dossier-card">
          <h2>OPERATIONAL CAPABILITIES</h2>
          <ul className="features-list brutalist-list">
            <li>[X] Real-time narrative analysis</li>
            <li>[X] Immutable confidence scoring</li>
            <li>[X] Granular keyword flagging</li>
            <li>[X] Zero-friction user terminal</li>
            <li>[X] Cross-platform responsive deployment</li>
            <li>[X] Absolute privacy: Zero data retention</li>
          </ul>
        </section>

        <section className="about-section dossier-card danger-zone">
          <h2>SECURITY CLEARANCE</h2>
          <p>
            Your anonymity is guaranteed. The Verification System is designed with a strict zero-retention policy. Submitted texts are analyzed in volatile memory and instantly purged. No logs. No trackers. No compromise.
          </p>
        </section>
      </main>
    </div>
  );
};
