import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const DS_CORE = path.resolve(__dirname, 'packages/design-system');
const LOCAL_NODE_MODULES = path.join(__dirname, 'node_modules');

export default defineConfig({
  base: process.env.VITE_BASE ?? '/',

  plugins: [react()],
  resolve: {
    alias: [
      // Design system aliases
      { find: '@uniphore/ut-design-system/styles.css', replacement: path.join(DS_CORE, 'src/styles/uni-ant.scss') },
      { find: '@uniphore/ut-design-system/tokens.css', replacement: path.join(DS_CORE, 'src/styles/base.scss') },
      { find: '@uniphore/ut-design-system', replacement: path.join(DS_CORE, 'src/index.ts') },
      { find: '@ds/SidePanelHeader', replacement: path.join(DS_CORE, 'src/components/side-panel/SidePanelHeader') },
      { find: '@ds/UniNavButton', replacement: path.join(DS_CORE, 'src/components/navigation/UniNavButton') },
      // Force single React copy to prevent "invalid hook call" errors
      { find: 'react/jsx-runtime', replacement: path.join(LOCAL_NODE_MODULES, 'react/jsx-runtime') },
      { find: 'react/jsx-dev-runtime', replacement: path.join(LOCAL_NODE_MODULES, 'react/jsx-dev-runtime') },
      { find: 'react', replacement: path.join(LOCAL_NODE_MODULES, 'react') },
      { find: 'react-dom', replacement: path.join(LOCAL_NODE_MODULES, 'react-dom') },
      { find: 'react-router-dom', replacement: path.join(LOCAL_NODE_MODULES, 'react-router-dom') },
    ],
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        loadPaths: [
          path.join(DS_CORE, 'src/styles'),
          LOCAL_NODE_MODULES,
        ],
      },
    },
  },
});
