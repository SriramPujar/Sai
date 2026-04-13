import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

window.onerror = (msg, src, line, col, error) => {
  console.error('Global error:', msg, line, col, error);
};

window.onunhandledrejection = (e) => {
  console.error('Unhandled promise rejection:', e.reason);
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
