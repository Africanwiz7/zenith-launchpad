import React, { useEffect, useState, Suspense } from 'react';
import ZenithLaunchpad from './zenithlaunchpad';
import './App.css';

// optional third-party visuals used by FuturisticDashboard
import { motion } from "framer-motion";
import Particles from "react-tsparticles";

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo);
    }

    // In production, you might want to send this to an error reporting service
    // Example: logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary" style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(-45deg, #0a0a0c, #1a1a2e, #2d1b4e, #16213e)',
          color: '#ffffff',
          fontFamily: 'Inter, sans-serif',
          padding: '20px',
          textAlign: 'center'
        }}>
          <div style={{
            background: 'rgba(17, 24, 39, 0.8)',
            backdropFilter: 'blur(10px)',
            padding: '30px',
            borderRadius: '15px',
            border: '1px solid #b294ff',
            maxWidth: '500px',
            width: '100%'
          }}>
            <h1 style={{ color: '#b294ff', marginBottom: '20px' }}>🚀 Oops! Something went wrong</h1>
            <p style={{ color: '#9ca3af', marginBottom: '20px', lineHeight: '1.6' }}>
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: '#b294ff',
                color: '#000',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                marginRight: '10px'
              }}
            >
              Refresh Page
            </button>
            <button
              onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
              style={{
                background: 'transparent',
                color: '#b294ff',
                border: '1px solid #b294ff',
                padding: '12px 24px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Try Again
            </button>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={{ marginTop: '20px', textAlign: 'left' }}>
                <summary style={{ cursor: 'pointer', color: '#b294ff', marginBottom: '10px' }}>
                  Error Details (Development Only)
                </summary>
                <pre style={{
                  background: '#0a0a0c',
                  padding: '15px',
                  borderRadius: '5px',
                  fontSize: '0.8rem',
                  overflow: 'auto',
                  color: '#ff6b6b'
                }}>
                  {this.state.error.toString()}
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Loading Component
const LoadingSpinner = () => (
  <div className="loading-spinner" style={{
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(-45deg, #0a0a0c, #1a1a2e, #2d1b4e, #16213e)',
    color: '#ffffff',
    fontFamily: 'Inter, sans-serif'
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '3px solid rgba(178, 148, 255, 0.3)',
      borderTop: '3px solid #b294ff',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginBottom: '20px'
    }} />
    <p style={{ color: '#b294ff', fontSize: '1.1rem' }}>Launching Zenith...</p>
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

// Main App Component

// new futuristic dashboard layout with video background + particles
function FuturisticDashboard() {
  // replace these with your real sidebar/main content when available
  const Sidebar = () => <div style={{width:"250px",background:'#111'}}>Sidebar</div>;
  const MainContent = () => <div style={{flex:1,background:'#222'}}>Main Content</div>;

  return (
    <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1
        }}
      >
        <source src="/futuristic-loop.mp4" type="video/mp4" />
      </video>

      {/* Particle Overlay */}
      <Particles
        options={{
          background: { color: "transparent" },
          particles: {
            color: { value: "#00f0ff" },
            links: { enable: true, color: "#00f0ff" },
            move: { enable: true, speed: 2 },
            number: { value: 60 }
          }
        }}
        style={{ position: "absolute", zIndex: 0 }}
      />

      {/* Content Layer */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", height: "100%" }}>
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading (remove this in production if not needed)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    // Add viewport meta tag for better mobile experience
    const viewport = document.querySelector('meta[name=viewport]');
    if (!viewport) {
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes';
      document.head.appendChild(meta);
    }

    // Add theme color for mobile browsers
    const themeColor = document.querySelector('meta[name=theme-color]');
    if (!themeColor) {
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = '#0a0a0c';
      document.head.appendChild(meta);
    }

    // Add title if not present
    if (!document.title) {
      document.title = 'Zenith Launchpad - Tech Career Guide';
    }

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ErrorBoundary>
      <div className="App" role="application" aria-label="Zenith Launchpad Tech Career Guide">
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="skip-link"
          style={{
            position: 'absolute',
            top: '-40px',
            left: '6px',
            background: '#b294ff',
            color: '#000',
            padding: '8px',
            textDecoration: 'none',
            borderRadius: '4px',
            zIndex: 1000,
            fontWeight: '600'
          }}
        >
          Skip to main content
        </a>

        <Suspense fallback={<LoadingSpinner />}>
          <main id="main-content">
            {/* you can switch between the original app and the new dashboard */}
            {/* <ZenithLaunchpad /> */}
            <FuturisticDashboard />
          </main>
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}

export default App;
