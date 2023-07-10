import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build:{
    esbuild: {
      loader: {
        '.js': 'jsx'
      }
    },
  },
  // server: {
  //   proxy: {
  //     '/socket.io': {
  //       target: 'https://si1libreria-production-6536.up.railway.app', // Reemplaza con la URL de tu servidor de sockets
  //       changeOrigin: true,
  //       ws: true,
  //     },
  //   },
  // },
})
