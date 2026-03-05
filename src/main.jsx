import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App.jsx';
import './index.css';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { registerSW } from 'virtual:pwa-register';

// Register PWA service worker
if (import.meta.env.PROD) {
  registerSW({ onNeedRefresh() { }, onOfflineReady() { } });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Provider>
  </React.StrictMode>,
);
