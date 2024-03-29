// vite.config.js
import {resolve} from 'path';
import {defineConfig} from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        // List your html files here, e.g:
        main: resolve(__dirname, 'index.html'),
        home: resolve(__dirname, 'home.html'),
        diary: resolve(__dirname, 'diary.html'),
        exerciselog: resolve(__dirname, 'exerciselog.html'),
        users: resolve(__dirname, 'users.html')
      },
    },
  },
  // Public base path could be set here too:
  // base: '/~username/my-app/',
});