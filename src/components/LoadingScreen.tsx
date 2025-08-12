import React, { useState, useEffect } from 'react';
import './LoadingScreen.css';

const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [showText, setShowText] = useState(false);

  const loadingSteps = [
    "Starting Windows XP...",
    "Loading system files...",
    "Initializing desktop...",
    "Loading portfolio data...",
    "Welcome to Windows XP Portfolio!"
  ];

  useEffect(() => {
    // Show text after a brief delay
    const textTimer = setTimeout(() => setShowText(true), 500);
    
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Step progression
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= loadingSteps.length - 1) {
          clearInterval(stepInterval);
          return loadingSteps.length - 1;
        }
        return prev + 1;
      });
    }, 800);

    return () => {
      clearTimeout(textTimer);
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, [loadingSteps.length]);

  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="windows-logo">
          <div className="logo-window">
            <div className="window-pane"></div>
            <div className="window-pane"></div>
            <div className="window-pane"></div>
            <div className="window-pane"></div>
          </div>
          <div className="logo-text">Microsoft Windows XP</div>
        </div>
        
        {showText && (
          <div className="loading-text">
            <div className="step-text">{loadingSteps[currentStep]}</div>
            <div className="progress-container">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${Math.min(progress, 100)}%` }}
                ></div>
              </div>
              <div className="progress-text">{Math.round(Math.min(progress, 100))}%</div>
            </div>
          </div>
        )}
        
        <div className="loading-footer">
          <div className="footer-text">Professional</div>
          <div className="footer-build">Build 2600</div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
