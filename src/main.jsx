import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App.jsx';
import './index.css';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { registerSW } from 'virtual:pwa-register';
import { ClerkProvider } from '@clerk/clerk-react';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

// Register PWA service worker
if (import.meta.env.PROD) {
  registerSW({ onNeedRefresh() { }, onOfflineReady() { } });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </ClerkProvider>
    </Provider>
  </React.StrictMode>,
);
