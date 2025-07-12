import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/OfflinePage.css';

const OfflinePage = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    if (navigator.onLine) {
      navigate('/home');
    } else {
      // Still offline, show message
      alert('You are still offline. Please check your internet connection.');
    }
  };

  return (
    <div className="offline-page">
      <div className="offline-content">
        <div className="offline-icon">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#ff6b6b"/>
          </svg>
        </div>
        <h1>You're Offline</h1>
        <p>It looks like you've lost your internet connection. Don't worry, you can still access some features of the app.</p>
        
        <div className="offline-actions">
          <button className="retry-button" onClick={handleRetry}>
            Try Again
          </button>
          <button className="home-button" onClick={() => navigate('/home')}>
            Go Home
          </button>
        </div>
        
        <div className="offline-tips">
          <h3>What you can do offline:</h3>
          <ul>
            <li>View cached movie information</li>
            <li>Browse previously loaded content</li>
            <li>Access the app's basic features</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OfflinePage; 