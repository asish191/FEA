import React from 'react';
import usePWA from '../hooks/usePWA';
import '../styles/PWAInstallPrompt.css';

const PWAInstallPrompt = () => {
  const { canInstall, installApp, isInstalled } = usePWA();

  const handleInstallClick = async () => {
    const success = await installApp();
    if (success) {
      console.log('App installed successfully');
    }
  };

  const handleDismiss = () => {
    // This will be handled by the hook when the prompt is dismissed
  };

  if (!canInstall || isInstalled) {
    return null;
  }

  return (
    <div className="pwa-install-prompt">
      <div className="pwa-install-content">
        <div className="pwa-install-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#667eea"/>
          </svg>
        </div>
        <div className="pwa-install-text">
          <h3>Install Movie App</h3>
          <p>Add this app to your home screen for quick access</p>
        </div>
        <div className="pwa-install-actions">
          <button className="pwa-install-btn" onClick={handleInstallClick}>
            Install
          </button>
          <button className="pwa-dismiss-btn" onClick={handleDismiss}>
            Not now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallPrompt; 