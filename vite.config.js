import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
            manifest: {
                name: 'Pahunn Luxury Fashion',
                short_name: 'Pahunn',
                description: 'Modern Luxury Fashion House',
                theme_color: '#000000',
                background_color: '#ffffff',
                display: 'standalone',
                icons: [
                    // Icons are currently placeholder paths; user should add pwa-192x192.png and pwa-512x512.png to public/
                ]
            }
        })
    ],
});
