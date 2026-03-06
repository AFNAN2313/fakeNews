import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ROUTES } from '../config/routes.config';
import { analysisService } from '../services/analysisService';
import type { Analysis, ModelResult, Explanation } from '../types/analysis';
import './AnalysisDetail.css';

export const AnalysisDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [analysis, setAnalysis] = useState<Analysis | null>(null);
    const [modelResults, setModelResults] = useState<ModelResult[]>([]);
    const [explanation, setExplanation] = useState<Explanation | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!id) {
            setError(true);
            setLoading(false);
            return;
        }

        analysisService.getAnalysisById(id)
            .then((result) => {
                if (!result) {
                    setError(true);
                } else {
                    setAnalysis(result.analysis);
                    setModelResults(result.modelResults);
                    setExplanation(result.explanation);
                }
            })
            .catch(() => {
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="analysis-detail-page loading-state">
                <p className="mono-readout">DECRYPTING REPORT FILE {id}...</p>
            </div>
        );
    }

    if (error || !analysis) {
        return (
            <div className="analysis-detail-page error-state">
                <p>REPORT NOT FOUND OR CLASSIFICATION RESTRICTED.</p>
                <Link to={ROUTES.HISTORY}>RETURN TO ARCHIVE</Link>
            </div>
        );
    }

    const formatPercent = (val: number) => `${(val * 100).toFixed(1)}%`;
    const formatDate = (isoString: string) => {
        const date = new Date(isoString);
        return date.toLocaleString();
    };

    const engineLabel =
        analysis.scan_mode === 'all'
            ? 'FULL CONSENSUS (6 MODELS)'
            : analysis.selected_model?.toUpperCase();

    const sortedModelResults = [...modelResults].sort((a, b) => b.confidence - a.confidence);

    return (
        <div className="analysis-detail-page">
            <header className="report-header">
                <div className="header-top">
                    <Link to={ROUTES.DASHBOARD} className="back-link">{'<'} RETURN TO DASHBOARD</Link>
                    <span className="report-id mono-data">REPORT ID: {analysis.id}</span>
                </div>

                <div className="title-section">
                    <h1 className="report-title">{analysis.article_title || 'UNNAMED TRANSMISSION'}</h1>
                    <div className="report-meta mono-data">
                        TIMESTAMP: {formatDate(analysis.created_at)} | WORDS: {analysis.word_count} | ENGINE: {engineLabel}
                    </div>
                </div>
            </header>

            <div className="report-grid">
                <section className="verdict-section card">
                    <div className="card-header">
                        <h2>PRIMARY VERDICT</h2>
                    </div>
                    <div className="verdict-display">
                        <div className={`large-verdict ${analysis.primary_prediction.toLowerCase()}`}>
                            {analysis.primary_prediction}
                        </div>
                        <div className="confidence-meter">
                            <div className="meter-label">
                                <span>CONFIDENCE SCORE</span>
                                <span className="meter-value">{formatPercent(analysis.primary_confidence)}</span>
                            </div>
                            <div className="meter-bar-container">
                                <div
                                    className={`meter-bar fill-${analysis.primary_prediction.toLowerCase()}`}
                                    style={{ width: `${analysis.primary_confidence * 100}%` }}
                                ></div>
                            </div>
                            <p className="latency-label">PROCESS LATENCY: {analysis.response_ms}ms</p>
                        </div>

                        {analysis.scan_mode === 'all' && analysis.majority_vote && (
                            <div className="majority-vote mono-data">
                                MAJORITY VOTE: {analysis.majority_vote} ({analysis.votes_fake} FAKE / {analysis.votes_real} REAL)
                            </div>
                        )}
                    </div>
                </section>

                {analysis.scan_mode === 'all' && sortedModelResults.length > 0 && (
                    <section className="models-section card">
                        <div className="card-header">
                            <h2>ALL MODELS COMPARISON</h2>
                        </div>
                        <div className="models-table-wrapper">
                            <table className="models-table">
                                <thead>
                                    <tr>
                                        <th>MODEL</th>
                                        <th>VERDICT</th>
                                        <th>CONFIDENCE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedModelResults.map((result) => (
                                        <tr key={result.id}>
                                            <td className="mono-data">
                                                {result.model_name.toUpperCase().replace(/_/g, ' ')}
                                            </td>
                                            <td>
                                                <span className={`verdict-badge ${result.prediction.toLowerCase()}`}>
                                                    {result.prediction}
                                                </span>
                                            </td>
                                            <td className="mono-data">
                                                {formatPercent(result.confidence)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                )}

                {explanation && (
                    <section className="explanation-section card">
                        <div className="card-header">
                            <h2>LIME EXPLANATION [WEIGHT FACTORS]</h2>
                        </div>
                        <div className="explanation-content">
                            <p className="explanation-helper mono-data">
                                Words impacting the model's decision. Red push towards FAKE, Green push towards REAL.
                            </p>
                            <div className="weights-list">
                                {explanation.features.map((feature, idx) => (
                                    <div key={idx} className="weight-item">
                                        <span className="weight-word">{feature.word}</span>
                                        <div className="weight-bar-wrapper">
                                            <div className="weight-bar-track">
                                                {feature.direction === 'FAKE' ? (
                                                    <div
                                                        className="weight-bar fill-fake pull-left"
                                                        style={{ width: `${Math.min(Math.abs(feature.weight) * 200, 100)}%` }}
                                                    ></div>
                                                ) : (
                                                    <div
                                                        className="weight-bar fill-real pull-right"
                                                        style={{ width: `${Math.min(Math.abs(feature.weight) * 200, 100)}%` }}
                                                    ></div>
                                                )}
                                            </div>
                                        </div>
                                        <span className={`weight-score ${feature.direction.toLowerCase()}`}>
                                            {feature.weight > 0 ? '+' : ''}{feature.weight.toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                <section className="source-text-section card full-width">
                    <div className="card-header">
                        <h2>SOURCE TEXT ANALYSIS</h2>
                    </div>
                    <div className="source-text-content">
                        <p className="source-body">
                            {analysis.article_text}
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
};
