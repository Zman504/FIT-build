import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Minimal Vite config for the landing-page sandbox.
// No production chunking, minification, or backend env wiring — this repo is
// for visual UI/UX work only.
export default defineConfig({
  plugins: [react()],
});
