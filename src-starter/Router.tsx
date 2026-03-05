import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from './config/routes.config';

// Pages
import { Landing } from './pages/Landing';
import { About } from './pages/About';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { NotFound } from './pages/NotFound';
import { Layout } from './components/shared/Layout';

export const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path={ROUTES.HOME} element={<Landing />} />
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.SIGNUP} element={<Signup />} />
        </Route>
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
        <Route path="*" element={<Navigate to={ROUTES.NOT_FOUND} replace />} />
      </Routes>
    </Router>
  );
};
