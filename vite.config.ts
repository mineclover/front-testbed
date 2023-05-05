import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import typescript from 'rollup-plugin-typescript2';

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: false,
  plugins: [react(), typescript()],
});
