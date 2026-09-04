import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Keep the frontend port predictable for the FastAPI CORS configuration.
export default defineConfig({
  plugins: [react()],
  server: { port: 2999 },
});
