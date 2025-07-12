import React, { memo } from 'react';
import '../styles/SkeletonLoader.css';

const SkeletonLoader = memo(({ type = 'card', count = 1, className = '' }) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <div className={`skeleton-card ${className}`}>
            <div className="skeleton-image"></div>
            <div className="skeleton-content">
              <div className="skeleton-title"></div>
              <div className="skeleton-text"></div>
            </div>
          </div>
        );
      
      case 'movie-poster':
        return (
          <div className={`skeleton-movie-poster ${className}`}>
            <div className="skeleton-poster"></div>
          </div>
        );
      
      case 'banner':
        return (
          <div className={`skeleton-banner ${className}`}>
            <div className="skeleton-banner-image"></div>
            <div className="skeleton-banner-content">
              <div className="skeleton-banner-title"></div>
              <div className="skeleton-banner-description"></div>
              <div className="skeleton-banner-buttons">
                <div className="skeleton-button"></div>
                <div className="skeleton-button"></div>
              </div>
            </div>
          </div>
        );
      
      case 'comment':
        return (
          <div className={`skeleton-comment ${className}`}>
            <div className="skeleton-comment-header">
              <div className="skeleton-avatar"></div>
              <div className="skeleton-user-info">
                <div className="skeleton-username"></div>
                <div className="skeleton-date"></div>
              </div>
            </div>
            <div className="skeleton-comment-text"></div>
          </div>
        );
      
      case 'navbar':
        return (
          <div className={`skeleton-navbar ${className}`}>
            <div className="skeleton-logo"></div>
            <div className="skeleton-nav-items">
              <div className="skeleton-nav-item"></div>
              <div className="skeleton-nav-item"></div>
              <div className="skeleton-nav-item"></div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className={`skeleton-default ${className}`}>
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
          </div>
        );
    }
  };

  if (count === 1) {
    return renderSkeleton();
  }

  return (
    <div className="skeleton-container">
      {Array.from({ length: count }, (_, index) => (
        <div key={index}>
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
});

export default SkeletonLoader; 