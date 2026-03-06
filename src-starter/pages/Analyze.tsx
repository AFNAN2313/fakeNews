import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../config/routes.config';
import { detectorService } from '../services/detectorService';
import type { ModelName } from '../services/detectorService';
import { analysisService } from '../services/analysisService';
import { useAuth } from '../hooks/useAuth';
import './Analyze.css';

export const Analyze: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [scanMode, setScanMode] = useState<'single' | 'all'>('all');
    const [selectedModel, setSelectedModel] = useState<ModelName>('bilstm');
    const [requestLime, setRequestLime] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [scanStatus, setScanStatus] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;

        setIsScanning(true);
        setError('');

        // DIAGNOSTIC — open browser DevTools (F12) → Console tab to read these
        console.log('[Analyze] submit — user from store:', user);

        if (!user) {
            setError('USER SESSION NOT FOUND. PLEASE LOG OUT AND LOG IN AGAIN.');
            setIsScanning(false);
            return;
        }

        let savedId: string | null = null;

        try {
            if (scanMode === 'all') {
                setScanStatus('RUNNING ALL 6 MODELS...');
                const allResult = await detectorService.predictAll(text);

                setScanStatus('SAVING RESULTS...');
                const saved = await analysisService.saveAnalysis({
                    user_id: user!.id,
                    article_text: text,
                    article_title: title || undefined,
                    word_count: allResult.word_count,
                    scan_mode: 'all',
                    selected_model: 'bilstm',
                    primary_prediction: allResult.majority_vote,
                    primary_confidence: allResult.results.bilstm.confidence,
                    majority_vote: allResult.majority_vote,
                    votes_real: allResult.votes.REAL,
                    votes_fake: allResult.votes.FAKE,
                    bilstm_verdict: allResult.bilstm_verdict,
                    response_ms: allResult.response_ms,
                });

                await analysisService.saveModelResults(
                    Object.entries(allResult.results).map(([modelName, r]) => ({
                        analysis_id: saved.id,
                        model_name: modelName,
                        prediction: r.prediction,
                        confidence: r.confidence,
                    }))
                );

                savedId = saved.id;

                if (requestLime) {
                    setScanStatus('RUNNING LIME EXPLANATION...');
                    try {
                        const explainResult = await detectorService.explain(text);
                        await analysisService.saveExplanation({
                            analysis_id: saved.id,
                            model_used: explainResult.model_used,
                            features: explainResult.features,
                            num_features: explainResult.features.length,
                            response_ms: explainResult.response_ms,
                        });
                    } catch (_) {
                        // non-fatal, continue
                    }
                }
            } else {
                setScanStatus(`RUNNING ${selectedModel.toUpperCase()} ENGINE...`);
                const singleResult = await detectorService.predict(text, selectedModel);

                setScanStatus('SAVING RESULTS...');
                const saved = await analysisService.saveAnalysis({
                    user_id: user!.id,
                    article_text: text,
                    article_title: title || undefined,
                    word_count: singleResult.word_count,
                    scan_mode: 'single',
                    selected_model: selectedModel,
                    primary_prediction: singleResult.prediction,
                    primary_confidence: singleResult.confidence,
                    response_ms: singleResult.response_ms,
                });

                await analysisService.saveModelResults([{
                    analysis_id: saved.id,
                    model_name: singleResult.model_used,
                    prediction: singleResult.prediction,
                    confidence: singleResult.confidence,
                }]);

                savedId = saved.id;

                if (requestLime) {
                    setScanStatus('RUNNING LIME EXPLANATION...');
                    try {
                        const explainResult = await detectorService.explain(text);
                        await analysisService.saveExplanation({
                            analysis_id: saved.id,
                            model_used: explainResult.model_used,
                            features: explainResult.features,
                            num_features: explainResult.features.length,
                            response_ms: explainResult.response_ms,
                        });
                    } catch (_) {
                        // non-fatal, continue
                    }
                }
            }

            navigate(ROUTES.ANALYSIS_DETAIL.replace(':id', savedId!));
        } catch (err: any) {
            setError(err.message || 'SCAN FAILED. CHECK NETWORK OR API STATUS.');
        } finally {
            setIsScanning(false);
        }
    };

    return (
        <div className="analyze-page">
            <header className="analyze-header">
                <div>
                    <h1 className="analyze-title">INITIATE ANALYSIS</h1>
                    <p className="analyze-subtitle">SUBMIT TEXT FOR VERIFICATION PROTCOL</p>
                </div>
            </header>

            <form className="analyze-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="analyze-title" className="form-label">SUBJECT / TITLE (OPTIONAL)</label>
                    <input
                        id="analyze-title"
                        type="text"
                        className="clean-input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g., Breaking News: Unprecedented Events..."
                        disabled={isScanning}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="analyze-text" className="form-label">SOURCE TEXT (REQUIRED)</label>
                    <textarea
                        id="analyze-text"
                        className="clean-input texture-textarea"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Paste the full article text or snippet here. Minimum 50 words recommended for accurate analysis."
                        required
                        disabled={isScanning}
                        rows={10}
                    />
                    <div className="textarea-footer">
                        <span className="word-count">{text.trim() ? text.trim().split(/\s+/).length : 0} WORDS</span>
                    </div>
                </div>

                <div className="config-grid">
                    <div className="form-group">
                        <label className="form-label">SCAN MODE</label>
                        <div className="radio-group">
                            <label className={`radio-label ${scanMode === 'all' ? 'active' : ''}`}>
                                <input
                                    type="radio"
                                    checked={scanMode === 'all'}
                                    onChange={() => setScanMode('all')}
                                    disabled={isScanning}
                                />
                                <span className="radio-text">FULL CONSENSUS (ALL MODELS)</span>
                            </label>
                            <label className={`radio-label ${scanMode === 'single' ? 'active' : ''}`}>
                                <input
                                    type="radio"
                                    checked={scanMode === 'single'}
                                    onChange={() => setScanMode('single')}
                                    disabled={isScanning}
                                />
                                <span className="radio-text">SINGLE ENGINE</span>
                            </label>
                        </div>
                    </div>

                    {scanMode === 'single' && (
                        <div className="form-group">
                            <label htmlFor="model-select" className="form-label">SELECT ENGINE</label>
                            <select
                                id="model-select"
                                className="clean-input select-input"
                                value={selectedModel}
                                onChange={(e) => setSelectedModel(e.target.value as ModelName)}
                                disabled={isScanning}
                            >
                                <option value="bilstm">BiLSTM — Deep Learning (99.90% accuracy)</option>
                                <option value="lstm">LSTM — Deep Learning (99.75% accuracy)</option>
                                <option value="svm">SVM — Classical ML (99.40% accuracy)</option>
                                <option value="random_forest">Random Forest — Classical ML (99.16% accuracy)</option>
                                <option value="logistic">Logistic Regression — Classical ML (98.76% accuracy)</option>
                                <option value="naive_bayes">Naive Bayes — Classical ML (94.34% accuracy)</option>
                            </select>
                        </div>
                    )}
                </div>

                <div className="form-group">
                    <label className={`radio-label ${requestLime ? 'active' : ''}`}>
                        <input
                            type="checkbox"
                            checked={requestLime}
                            onChange={(e) => setRequestLime(e.target.checked)}
                            disabled={isScanning}
                        />
                        <span className="radio-text">REQUEST LIME EXPLANATION (ADDS 3-8s)</span>
                    </label>
                </div>

                <button
                    type="submit"
                    className={`submit-scan-btn ${isScanning ? 'scanning' : ''}`}
                    disabled={!text.trim() || isScanning}
                >
                    {isScanning ? (
                        <span className="scanning-text">{scanStatus || 'INITIALIZING SCAN... PLEASE STANDBY'}</span>
                    ) : (
                        <span>COMMENCE SCAN {'>'}</span>
                    )}
                </button>

                {error && (
                    <p className="form-error mono-data">{error}</p>
                )}
            </form>
        </div>
    );
};
