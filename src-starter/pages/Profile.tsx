import React from 'react';
import { useAuth } from '../hooks/useAuth';
import './Profile.css';

export const Profile: React.FC = () => {
    const { user, logout } = useAuth();

    const d_clearance = 'LEVEL 4 (VERIFICATION)';
    const d_status = 'ACTIVE';
    const d_joined = user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString()
        : 'N/A';

    return (
        <div className="profile-page">
            <header className="profile-header">
                <div>
                    <h1 className="profile-title">OPERATIVE DOSSIER</h1>
                    <p className="profile-subtitle">PERSONNEL RECORD & SETTINGS</p>
                </div>
            </header>

            <div className="profile-grid">
                <section className="personnel-card card">
                    <div className="card-header">
                        <h2>PERSONNEL DATA</h2>
                    </div>
                    <div className="card-body">
                        <div className="data-row">
                            <span className="data-label">IDENTIFIER</span>
                            <span className="data-value mono-data">{user?.email || 'N/A'}</span>
                        </div>
                        <div className="data-row">
                            <span className="data-label">CODENAME</span>
                            <span className="data-value mono-data">{user?.username || 'N/A'}</span>
                        </div>
                        <div className="data-row">
                            <span className="data-label">CLEARANCE LEVEL</span>
                            <span className="data-value">{d_clearance}</span>
                        </div>
                        <div className="data-row">
                            <span className="data-label">OPERATIVE STATUS</span>
                            <span className="data-value">
                                <span className="status-indicator active"></span> {d_status}
                            </span>
                        </div>
                        <div className="data-row">
                            <span className="data-label">INDUCTION DATE</span>
                            <span className="data-value mono-data">{d_joined}</span>
                        </div>
                    </div>
                </section>

                <section className="settings-card card">
                    <div className="card-header">
                        <h2>SYSTEM PREFERENCES</h2>
                    </div>
                    <div className="card-body">
                        <div className="settings-group">
                            <label className="settings-label">
                                <input type="checkbox" defaultChecked className="brutalist-checkbox" />
                                <span className="checkbox-text">ENABLE HIGH-CONTRAST MODE (DEFAULT)</span>
                            </label>
                            <label className="settings-label">
                                <input type="checkbox" defaultChecked className="brutalist-checkbox" />
                                <span className="checkbox-text">RECEIVE TRANSMISSION ALERTS VIA EMAIL</span>
                            </label>
                            <label className="settings-label">
                                <input type="checkbox" className="brutalist-checkbox" />
                                <span className="checkbox-text">AUTO-PURGE HISTORY EVERY 30 DAYS</span>
                            </label>
                        </div>
                    </div>
                </section>

                <section className="danger-zone card full-width">
                    <div className="card-header danger">
                        <h2>RESTRICTED ACTIONS</h2>
                    </div>
                    <div className="card-body danger-body">
                        <p className="danger-text mono-data">
                            WARNING: THESE ACTIONS ARE IRREVERSIBLE AND LOGGED WITH COMMAND.
                        </p>
                        <div className="danger-actions">
                            <button className="brutalist-btn danger-btn">REQUEST CREDENTIAL ROTATION</button>
                            <button className="brutalist-btn danger-btn outline" onClick={logout}>DISCONNECT (LOGOUT)</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};
