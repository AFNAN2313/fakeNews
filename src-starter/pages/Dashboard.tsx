import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../config/routes.config';
import { useAuth } from '../hooks/useAuth';
import { analysisService } from '../services/analysisService';
import type { Analysis, UserStats } from '../types/analysis';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState<UserStats | null>(null);
    const [recentAnalyses, setRecentAnalyses] = useState<Analysis[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!user?.id) return;

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [userStats, recent] = await Promise.all([
                    analysisService.getUserStats(user.id),
                    analysisService.getRecentAnalyses(user.id, 5),
                ]);
                setStats(userStats);
                setRecentAnalyses(recent);
            } catch (err) {
                console.error('Failed to load dashboard data:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [user?.id]);

    const formatPercent = (val: number) => `${(val * 100).toFixed(1)}%`;
    const formatDate = (isoString: string) => {
        const date = new Date(isoString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    if (isLoading) {
        return (
            <div className="dashboard-page">
                <div className="loading-state mono-data">LOADING OPERATIVE DATA...</div>
            </div>
        );
    }

    return (
        <div className="dashboard-page">
            <header className="dashboard-header">
                <div>
                    <h1 className="dashboard-title">DASHBOARD</h1>
                    <p className="dashboard-subtitle">OPERATIVE STATUS OVERVIEW</p>
                </div>
                <div className="operative-badge">
                    OPERATIVE: {user?.email || 'OFFLINE'}
                </div>
            </header>

            <section className="stats-grid">
                <div className="stat-card">
                    <div className="stat-label">TOTAL SCANS</div>
                    <div className="stat-value">{stats?.total_analyses ?? 0}</div>
                </div>

                <div className="stat-card split">
                    <div className="stat-split-half fake">
                        <div className="stat-label">IDENTIFIED FAKE</div>
                        <div className="stat-value text-accent">{stats?.fake_count ?? 0}</div>
                    </div>
                    <div className="stat-split-half real">
                        <div className="stat-label">VERIFIED REAL</div>
                        <div className="stat-value">{stats?.real_count ?? 0}</div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-label">AVG CONFIDENCE SCORE</div>
                    <div className="stat-value">{formatPercent(stats?.avg_confidence ?? 0)}</div>
                </div>

                <div className="stat-card action-card">
                    <div className="stat-label">READY FOR NEW INPUT</div>
                    <Link to={ROUTES.ANALYZE} className="action-button brutalist-btn" style={{
                        display: 'block', textAlign: 'center', marginTop: '1rem', textDecoration: 'none'
                    }}>
                        INITIATE ANALYSIS {'>'}
                    </Link>
                </div>
            </section>

            <section className="recent-analyses-section">
                <div className="section-header">
                    <h2>RECENT TRANSMISSIONS</h2>
                    <Link to={ROUTES.HISTORY} className="view-all-link">VIEW ARCHIVE [FULL LOG]</Link>
                </div>

                <div className="recent-table-container">
                    <table className="dossier-table">
                        <thead>
                            <tr>
                                <th>TIMESTAMP</th>
                                <th>SUBJECT / TITLE</th>
                                <th>MODEL ENGINE</th>
                                <th>VERDICT</th>
                                <th>CONFIDENCE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentAnalyses.map(analysis => (
                                <tr key={analysis.id}>
                                    <td className="mono-data">{formatDate(analysis.created_at)}</td>
                                    <td className="subject-data">
                                        <Link to={ROUTES.ANALYSIS_DETAIL.replace(':id', analysis.id)}>
                                            {analysis.article_title || 'UNTITLED TRANSMISSION'}
                                        </Link>
                                    </td>
                                    <td className="mono-data">
                                        {analysis.scan_mode === 'all'
                                            ? 'FULL CONSENSUS (6 MODELS)'
                                            : analysis.selected_model?.toUpperCase()}
                                    </td>
                                    <td>
                                        <span className={`verdict-badge ${analysis.primary_prediction.toLowerCase()}`}>
                                            [{analysis.primary_prediction}]
                                        </span>
                                    </td>
                                    <td className="mono-data">
                                        {formatPercent(analysis.primary_confidence)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};
