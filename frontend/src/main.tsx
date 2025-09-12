import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Configurar variables de entorno para desarrollo
if (import.meta.env.DEV) {
  console.log('API URL:', import.meta.env.VITE_API_URL || 'http://localhost:3000/api');
}

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element not found');
}

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);