import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { ROUTES } from '../../../config/routes.config';
import { useAuth } from '../../../hooks/useAuth';
import './DashboardLayout.css';

export const DashboardLayout: React.FC = () => {
    const { logout } = useAuth();

    return (
        <div className="dashboard-layout">
            <aside className="dashboard-sidebar">
                <div className="sidebar-header">
                    <h2>
                        <span style={{ color: 'var(--accent)' }}>DOSS</span>IER
                    </h2>
                    <p className="sidebar-subtitle">CLASSIFIED NETWORK</p>
                </div>

                <nav className="sidebar-nav">
                    <NavLink to={ROUTES.DASHBOARD} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`} end>
                        DASHBOARD
                    </NavLink>
                    <NavLink to={ROUTES.ANALYZE} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                        ANALYZE
                    </NavLink>
                    <NavLink to={ROUTES.HISTORY} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                        HISTORY
                    </NavLink>
                    <NavLink to={ROUTES.PROFILE} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                        PROFILE
                    </NavLink>
                </nav>

                <div className="sidebar-footer">
                    <button onClick={logout} className="logout-button">
                        [LOGOUT]
                    </button>
                </div>
            </aside>

            <main className="dashboard-main">
                <Outlet />
            </main>
        </div>
    );
};
