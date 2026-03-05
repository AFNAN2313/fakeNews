import React, { useEffect } from 'react';
import { AppRouter } from './Router';
import { useAuthStore } from './store/authStore';
import './styles/globals.css';

function App() {
  const initAuth = useAuthStore((state) => state.initAuth);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return <AppRouter />;
}

export default App;
