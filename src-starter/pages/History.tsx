import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../config/routes.config';
import { useAuth } from '../hooks/useAuth';
import { analysisService } from '../services/analysisService';
import type { Analysis } from '../types/analysis';
import './History.css';

export const History: React.FC = () => {
    const { user } = useAuth();
    const [filter, setFilter] = useState<'ALL' | 'REAL' | 'FAKE'>('ALL');
    const [searchTerm, setSearchTerm] = useState('');
    const [analyses, setAnalyses] = useState<Analysis[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!user?.id) return;

        const fetchAnalyses = async () => {
            setIsLoading(true);
            setError('');
            try {
                const data = await analysisService.getUserAnalyses(
                    user.id,
                    filter === 'ALL' ? undefined : filter
                );
                setAnalyses(data);
            } catch (err) {
                console.error('Failed to load history:', err);
                setError('FAILED TO RETRIEVE ARCHIVE DATA. PLEASE TRY AGAIN.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchAnalyses();
    }, [user?.id, filter]);

    const formatDate = (isoString: string) => {
        const date = new Date(isoString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const formatPercent = (val: number) => `${(val * 100).toFixed(1)}%`;

    const filteredHistory = analyses.filter(item => {
        const title = item.article_title || 'UNTITLED TRANSMISSION';
        return title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className="history-page">
            <header className="history-header">
                <div>
                    <h1 className="history-title">ARCHIVE</h1>
                    <p className="history-subtitle">FULL LOG OF PRIOR VERIFICATION REQUESTS</p>
                </div>
            </header>

            <div className="history-controls">
                <div className="search-box">
                    <input
                        type="text"
                        className="clean-input search-input"
                        placeholder="SEARCH BY SUBJECT OR TITLE..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="filter-group">
                    <button
                        className={`filter-btn ${filter === 'ALL' ? 'active' : ''}`}
                        onClick={() => setFilter('ALL')}
                    >
                        ALL
                    </button>
                    <button
                        className={`filter-btn ${filter === 'FAKE' ? 'active' : ''}`}
                        onClick={() => setFilter('FAKE')}
                    >
                        FAKE ONLY
                    </button>
                    <button
                        className={`filter-btn ${filter === 'REAL' ? 'active' : ''}`}
                        onClick={() => setFilter('REAL')}
                    >
                        REAL ONLY
                    </button>
                </div>
            </div>

            <div className="history-table-container">
                <table className="dossier-table">
                    <thead>
                        <tr>
                            <th>TIMESTAMP</th>
                            <th>SUBJECT / TITLE</th>
                            <th>MODEL ENGINE</th>
                            <th>VERDICT</th>
                            <th>CONFIDENCE</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={6} className="empty-state mono-data">
                                    RETRIEVING ARCHIVE DATA...
                                </td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan={6} className="empty-state mono-data">
                                    {error}
                                </td>
                            </tr>
                        ) : filteredHistory.length > 0 ? (
                            filteredHistory.map(item => (
                                <tr key={item.id}>
                                    <td className="mono-data">{formatDate(item.created_at)}</td>
                                    <td className="subject-data">
                                        <Link to={ROUTES.ANALYSIS_DETAIL.replace(':id', item.id)}>
                                            {item.article_title || 'UNTITLED TRANSMISSION'}
                                        </Link>
                                    </td>
                                    <td className="mono-data">
                                        {item.scan_mode === 'all'
                                            ? 'FULL CONSENSUS'
                                            : item.selected_model?.toUpperCase()}
                                    </td>
                                    <td>
                                        <span className={`verdict-badge ${item.primary_prediction.toLowerCase()}`}>
                                            [{item.primary_prediction}]
                                        </span>
                                    </td>
                                    <td className="mono-data">
                                        {formatPercent(item.primary_confidence)}
                                    </td>
                                    <td>
                                        <Link to={ROUTES.ANALYSIS_DETAIL.replace(':id', item.id)} className="action-link">
                                            VIEW REPORT
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="empty-state">
                                    NO RECORDS FOUND MATCHING CURRENT FILTERS.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
