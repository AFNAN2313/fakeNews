import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/shared/Button/Button';
import { ROUTES } from '../config/routes.config';
import './Landing.css';

export const Landing: React.FC = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    const handleScroll = () => {
      // scroll listener for future use
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="landing-page">
      <main className="landing-content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-background"></div>

          <div className="hero-wrapper">
            <div className="hero-text">
              <div className="hero-eyebrow">TOP SECRET // CLASSIFIED</div>
              <h1 className="hero-title">
                EXPOSE THE TRUTH, <br />
                <span className="redacted" data-text="FIGHT MISINFORMATION">FIGHT MISINFORMATION</span>
              </h1>
              <p className="hero-subtitle">
                RAW DATA. NO SPIN. We intercept and analyze news sources using machine models to detect falsehoods and verify credibility instantly.
              </p>
              <div className="hero-actions">
                <Button onClick={() => navigate(ROUTES.ANALYZE)} size="lg" className="btn-primary">
                  INITIATE ANALYSIS
                </Button>
                <button className="demo-btn" onClick={() => navigate(ROUTES.ABOUT)}>
                  [ VIEW PROTOCOL ]
                </button>
              </div>
              <p className="hero-note">SYSTEM: ONLINE // ENCRYPTION: ACTIVE // LOG: FALSE</p>
            </div>
            <div className="hero-visual">
              <div className="hero-card">
                <div className="card-header">INTERCEPT REPORT #4029</div>
                <div className="result-item">
                  <span className="label">SUBJECT SCORE</span>
                  <span className="score">87/100</span>
                </div>
                <div className="result-item">
                  <span className="label">STATUS</span>
                  <span className="badge credible">VERIFIED</span>
                </div>
                <div className="result-item">
                  <span className="label">THREAT LEVEL</span>
                  <span className="confidence">MINIMAL</span>
                </div>
                <div className="card-footer-stamp">APPROVED</div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="stat-item">
            <div className="stat-number">50K+</div>
            <div className="stat-label">DOCUMENTS ANALYZED</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">98%</div>
            <div className="stat-label">DETECTION PREDICTABILITY</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100K+</div>
            <div className="stat-label">INTELLIGENCE NETWORK</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">ACTIVE SURVEILLANCE</div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="how-it-works">
          <div className="section-header">
            <h2>VERIFICATION PROTOCOL</h2>
            <p>STANDARD OPERATING PROCEDURE FOR THREAT DETECTION</p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">01</div>
              <h3>DATA INGESTION</h3>
              <p>Submit suspicious URL, headline, or full text transcript. System accepts input from any non-classified source.</p>
              <div className="step-icon">▤</div>
            </div>
            <div className="step-card">
              <div className="step-number">02</div>
              <h3>NEURAL ANALYSIS</h3>
              <p>Our machine models dissect linguistic signatures and cross-reference factual nodes in milliseconds.</p>
              <div className="step-icon">⚙</div>
            </div>
            <div className="step-card">
              <div className="step-number">03</div>
              <h3>THREAT REPORT</h3>
              <p>Receive an immutable credibility score detailing manipulation tactics and factual variance.</p>
              <div className="step-icon">⚑</div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="section-header">
            <h2>SYSTEM CAPABILITIES</h2>
            <p>ADVANCED TOOLS FOR DETECTING MANIPULATED NARRATIVES</p>
          </div>

          <div className="features-container">
            <div className="feature">
              <div className="feature-icon-box">[X]</div>
              <h3>PRECISION ACCURACY</h3>
              <p>State-of-the-art NLP engines detect subtle manipulation markers with exceptional reliability.</p>
            </div>
            <div className="feature">
              <div className="feature-icon-box">[⚡]</div>
              <h3>RAPID DEPLOYMENT</h3>
              <p>Real-time processing ensures threats are identified before narratives can take root.</p>
            </div>
            <div className="feature">
              <div className="feature-icon-box">[∅]</div>
              <h3>ZERO TRACE</h3>
              <p>All queries are sandboxed. We do not store or track your investigation targets.</p>
            </div>
            <div className="feature">
              <div className="feature-icon-box">[▣]</div>
              <h3>GRANULAR INSIGHTS</h3>
              <p>Beyond binary true/false. See exactly which sentences trigger anomaly detection flags.</p>
            </div>
            <div className="feature">
              <div className="feature-icon-box">[∀]</div>
              <h3>GLOBAL SCOPE</h3>
              <p>Cross-language analysis bypasses regional propaganda containment zones.</p>
            </div>
            <div className="feature">
              <div className="feature-icon-box">[◷]</div>
              <h3>ARCHIVAL ACCESS</h3>
              <p>Maintain a secure, encrypted ledger of all your past verifications for future reference.</p>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="why-us-section">
          <h2>OUR METHODOLOGY</h2>
          <div className="trust-grid">
            <div className="trust-item relative-box">
              <div className="trust-number">I.</div>
              <h4>EMPIRICAL FOUNDATION</h4>
              <p>Architected on peer-reviewed forensic linguistics, avoiding superficial heuristics.</p>
            </div>
            <div className="trust-item relative-box">
              <div className="trust-number">II.</div>
              <h4>EXPERT CALIBRATION</h4>
              <p>Training data vetted by independent investigative journalists, not crowd-sourced noise.</p>
            </div>
            <div className="trust-item relative-box">
              <div className="trust-number">III.</div>
              <h4>ABSOLUTE NEUTRALITY</h4>
              <p>Algorithms are blinded to political affiliations, focusing solely on verifiable logic.</p>
            </div>
            <div className="trust-item relative-box">
              <div className="trust-number">IV.</div>
              <h4>CONTINUOUS ADAPTATION</h4>
              <p>Models self-update hourly to counter new disinformation methodologies.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="final-cta-section">
          <div className="cta-content">
            <h2>COMMENCE INVESTIGATION</h2>
            <p>THE TRUTH IS CLASSIFIED NO LONGER. DEPLOY THE ANALYZER.</p>
            <Button onClick={() => navigate(ROUTES.ANALYZE)} size="lg" className="cta-button btn-danger">
              [ EXAMINE SOURCE ]
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};
