import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from './config/routes.config';

// Public Pages
import { Landing } from './pages/Landing';
import { About } from './pages/About';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';
import { NotFound } from './pages/NotFound';

// Protected Pages
import { Dashboard } from './pages/Dashboard';
import { Analyze } from './pages/Analyze';
import { History } from './pages/History';
import { AnalysisDetail } from './pages/AnalysisDetail';
import { Profile } from './pages/Profile';

// Layouts & Guards
import { Layout } from './components/shared/Layout';
import { DashboardLayout } from './components/shared/DashboardLayout';
import { ProtectedRoute } from './components/shared/ProtectedRoute';
import { GuestRoute } from './components/shared/GuestRoute';

export const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes (accessible by everyone) with Header/Footer */}
        <Route element={<Layout />}>
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
        </Route>

        {/* Guest-only Routes — redirect to dashboard if already logged in */}
        <Route element={<GuestRoute />}>
          <Route element={<Layout />}>
            <Route path={ROUTES.HOME} element={<Landing />} />
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.SIGNUP} element={<Signup />} />
            <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
          </Route>
        </Route>

        {/* Protected Routes — redirect to login if not authenticated */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route path={ROUTES.ANALYZE} element={<Analyze />} />
            <Route path={ROUTES.HISTORY} element={<History />} />
            <Route path={ROUTES.ANALYSIS_DETAIL} element={<AnalysisDetail />} />
            <Route path={ROUTES.PROFILE} element={<Profile />} />
          </Route>
        </Route>

        {/* 404 Catch-all */}
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
        <Route path="*" element={<Navigate to={ROUTES.NOT_FOUND} replace />} />
      </Routes>
    </Router>
  );
};
