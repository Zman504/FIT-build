import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Minimal sandbox bootstrap. The production app additionally wires Capacitor,
// an error boundary, and Vercel analytics — none of which are needed for
// landing-page UI work, so they are intentionally omitted here.
const el = document.getElementById('root');
if (!el) throw new Error('Root element #root not found');

createRoot(el).render(
  <StrictMode>
    <App />
  </StrictMode>
);
