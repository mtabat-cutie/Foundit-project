import React, { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Simple Error Boundary to prevent white screen
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
          <h1 style={{ color: '#800000' }}>Something went wrong.</h1>
          <p>The application crashed during runtime. This is often due to missing configuration.</p>
          <pre style={{ background: '#f4f4f4', padding: '20px', borderRadius: '8px', display: 'inline-block', textAlign: 'left', marginTop: '20px' }}>
            {this.state.error?.toString()}
          </pre>
          <div style={{ marginTop: '30px' }}>
            <button 
              onClick={() => window.location.reload()}
              style={{ backgroundColor: '#800000', color: 'white', padding: '12px 24px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
