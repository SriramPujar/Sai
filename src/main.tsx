import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

const root = document.getElementById('root');
if (root) {
  root.innerHTML = '<h1 style="color:red;font-size:48px;padding:50px;text-align:center;">SAI SEVA AI - TEST</h1>';
} else {
  document.body.innerHTML = '<h1 style="color:red;font-size:48px;">NO ROOT</h1>';
}
