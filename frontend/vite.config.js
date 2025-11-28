import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss(),],
<<<<<<< HEAD
});
=======
  server: {
    host: true,   // or "0.0.0.0"
  }
});


>>>>>>> b1303d1fe1895168c6ba5aeb1db09de4cc8c41d0
