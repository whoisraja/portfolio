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
      <div className="xp-boot-area">
        <div className="xp-boot-logo">Microsoft Windows XP</div>
        <div className="xp-boot-bar">
          <div className="xp-boot-dots">
            <div className="xp-dot"></div>
            <div className="xp-dot"></div>
            <div className="xp-dot"></div>
          </div>
        </div>
      </div>
      <div className="loading-content">
        <div className="loading-footer">
          <div className="footer-text">Professional</div>
          <div className="footer-build">Build 2600</div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
