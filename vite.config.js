import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0', // This is good for Gitpod, allows external access
    port: 5173, // Default Vite port
    strictPort: true, // Ensures it uses this port
    hmr: {
      clientPort: 443, // For HMR (Hot Module Replacement) over HTTPS in Gitpod
    },
    // --- ADD THIS SECTION ---
    allowedHosts: ['5173-madhuramhat-resumematch-yo28d3b9e0r.ws-us120.gitpod.io', // <--- PASTE YOUR EXACT URL HERE
      // You might also want to add 'localhost' for local testing if you ever do that
    ],
    // --- END ADDED SECTION ---
  },
})
