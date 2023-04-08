import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  envDir: 'env',
  plugins: [vue(),
    VitePWA({ 
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      injectRegister: 'inline',
      manifest: {
        "name": "Sonos Web",
        "short_name": "Sonos",
        "theme_color": "#111729",
        "background_color": "#111729",
        "display": "standalone",
        "scope": "/",
        "start_url": "/",
        "icons": [
          {
            "src": "/SonosWeb192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "/SonosWeb512.png",
            "sizes": "512x512",
            "type": "image/png"
          },
          {
            "src": "/maskable_icon.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any maskable"
          }
        ]
      }
      
    })
  ],
  server: {
    port: 3000
  },
})
