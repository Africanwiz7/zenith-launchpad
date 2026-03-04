import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Performance monitoring function
const sendToAnalytics = (metric) => {
  // Replace with your analytics service
  // Example: gtag('event', 'web_vitals', { ...metric });

  // For now, just log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vitals:', metric);
  }
};

// Create root and render app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Add error boundary for the entire app
const renderApp = () => {
  try {
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error('Failed to render app:', error);

    // Fallback render
    root.render(
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a0c',
        color: '#ffffff',
        fontFamily: 'Inter, sans-serif',
        padding: '20px',
        textAlign: 'center'
      }}>
        <div>
          <h1 style={{ color: '#b294ff' }}>🚀 Zenith Launchpad</h1>
          <p>Something went wrong loading the application.</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: '#b294ff',
              color: '#000',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }
};

// Initial render
renderApp();

// Hot Module Replacement for development
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./App', () => {
    renderApp();
  });
}

// Web Vitals reporting with error handling
reportWebVitals((metric) => {
  try {
    sendToAnalytics(metric);
  } catch (error) {
    console.warn('Failed to send analytics:', error);
  }
});
