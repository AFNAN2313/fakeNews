import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { ROUTES } from '../../../config/routes.config';

/** Redirects authenticated users to the dashboard. Renders children for guests. */
export const GuestRoute: React.FC = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--background)' }}>
                <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>VERIFYING CLEARANCE...</p>
            </div>
        );
    }

    if (user) {
        return <Navigate to={ROUTES.DASHBOARD} replace />;
    }

    return <Outlet />;
};
