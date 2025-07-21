import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import tailwindcss from 'tailwindcss'; // 이 줄은 제거하거나 주석 처리
import tailwindcss from '@tailwindcss/postcss'; // <-- 이 줄로 변경!
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        tailwindcss(), 
        autoprefixer(),
      ],
    },
  },
});