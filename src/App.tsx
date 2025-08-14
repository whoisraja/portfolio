import React, { useState, useEffect } from 'react';
import './App.css';
import LoadingScreen from './components/LoadingScreen';
import Desktop from './components/Desktop';
import { SettingsProvider, useSettings } from './components/SettingsContext';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ensure the desktop wallpaper is fully loaded before leaving the boot screen
    let bootDelayDone = false;
    let wallpaperLoaded = false;

    const maybeFinish = () => {
      if (bootDelayDone && wallpaperLoaded) {
        setIsLoading(false);
      }
    };

    // Simulated boot delay
    const timer = setTimeout(() => {
      bootDelayDone = true;
      maybeFinish();
    }, 4000);

    // Preload wallpaper from public folder
    const wallpaper = new Image();
    wallpaper.src = (process.env.PUBLIC_URL || '') + '/wallpaper.jpg';
    wallpaper.onload = () => { wallpaperLoaded = true; maybeFinish(); };
    wallpaper.onerror = () => { wallpaperLoaded = true; maybeFinish(); };

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const ThemedApp: React.FC = () => {
    const { theme } = useSettings();
    return (
      <div className={`App ${theme === 'dark' ? 'theme-dark' : ''}`}>
        {isLoading ? <LoadingScreen /> : <Desktop />}
      </div>
    );
  };

  return (
    <SettingsProvider>
      <ThemedApp />
    </SettingsProvider>
  );
};

export default App;
