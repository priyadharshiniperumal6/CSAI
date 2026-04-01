import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Design-system source is bundled inside the repo under packages/design-system/
// so the project is fully self-contained and works in CI / GitHub Pages.
const DS_CORE = path.resolve(__dirname, 'packages/design-system');

const LOCAL_NODE_MODULES = path.join(__dirname, 'node_modules');

export default defineConfig({
  // GitHub Pages serves the site at /CSAI/ — set base accordingly.
  // Falls back to '/' for local dev (VITE_BASE env var not set).
  base: process.env.VITE_BASE ?? '/',

  plugins: [react()],
  resolve: {
    alias: {
      '@uniphore/ut-design-system/styles.css': path.join(DS_CORE, 'src/styles/uni-ant.scss'),
      '@uniphore/ut-design-system/tokens.css': path.join(DS_CORE, 'src/styles/base.scss'),
      '@uniphore/ut-design-system': path.join(DS_CORE, 'src/index.ts'),
      '@ds/SidePanelHeader': path.join(DS_CORE, 'src/components/side-panel/SidePanelHeader'),
      '@ds/UniNavButton': path.join(DS_CORE, 'src/components/navigation/UniNavButton'),
      // Force single copies of React to prevent "invalid hook call" errors
      'react': path.join(LOCAL_NODE_MODULES, 'react'),
      'react-dom': path.join(LOCAL_NODE_MODULES, 'react-dom'),
      'react/jsx-runtime': path.join(LOCAL_NODE_MODULES, 'react/jsx-runtime'),
      'react/jsx-dev-runtime': path.join(LOCAL_NODE_MODULES, 'react/jsx-dev-runtime'),
      'react-router-dom': path.join(LOCAL_NODE_MODULES, 'react-router-dom'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        loadPaths: [path.join(DS_CORE, 'src/styles')],
      },
    },
  },
});
