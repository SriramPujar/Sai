import React from 'react';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import './index.css';

const rootEl = document.getElementById('root');
console.log('Root element:', rootEl);
console.log('React version:', React.version);

if (!rootEl) {
  document.body.innerHTML = 'NO ROOT ELEMENT FOUND';
  throw new Error('No root element');
}

createRoot(rootEl).render(
  <StrictMode>
    <div style={{ padding: 50, textAlign: 'center', background: '#fff8f6', minHeight: '100vh' }}>
      <h1 style={{ color: '#805600', fontSize: 48 }}>SAI SEVA AI</h1>
      <p>React loaded successfully!</p>
    </div>
  </StrictMode>
);
