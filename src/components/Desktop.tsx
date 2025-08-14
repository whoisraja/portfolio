import React, { useState } from 'react';
import './Desktop.css';
import DesktopIcon from './DesktopIcon';
import Window from './Window';
import Taskbar from './Taskbar';
import { WindowType } from '../types/WindowType';
import { useSettings } from './SettingsContext';

const Desktop: React.FC = () => {
  const { wallpaperUrl, addRecent } = useSettings();
  const [openWindows, setOpenWindows] = useState<WindowType[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);

  const desktopIcons = [
    {
      id: 'my-computer',
      name: 'My Computer',
      icon: '🖥️',
      position: { x: 20, y: 20 }
    },
    {
      id: 'recycle-bin',
      name: 'Recycle Bin',
      icon: '♻️',
      position: { x: 20, y: 120 }
    },
    {
      id: 'projects',
      name: 'Projects',
      icon: '📁',
      position: { x: 20, y: 220 }
    },
    {
      id: 'skills',
      name: 'Skills',
      icon: '📁',
      position: { x: 20, y: 320 }
    },
    {
      id: 'certifications',
      name: 'Certifications',
      icon: '📁',
      position: { x: 20, y: 420 }
    },
    {
      id: 'about',
      name: 'About',
      icon: 'ℹ️',
      position: { x: 120, y: 20 }
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: '⚙️',
      position: { x: 120, y: 320 }
    },
    {
      id: 'dont-open',
      name: "Don't Open !!",
      icon: '💀',
      position: { x: 220, y: 20 }
    },
    {
      id: 'terminal',
      name: 'Terminal',
      icon: '🖳',
      position: { x: 220, y: 120 }
    },
    {
      id: 'contact',
      name: 'Contact',
      icon: '✉️',
      position: { x: 120, y: 120 }
    },
    {
      id: 'game',
      name: 'Tic‑Tac‑Toe',
      icon: '🎮',
      position: { x: 120, y: 220 }
    }
  ];

  const handleIconClick = (iconId: string) => {
    // Check if window is already open
    const existingWindow = openWindows.find(window => window.id === iconId);
    if (existingWindow) {
      // Bring to front
      setActiveWindow(iconId);
      return;
    }

    // Open new window
    const newWindow: WindowType = {
      id: iconId,
      title: iconId.charAt(0).toUpperCase() + iconId.slice(1),
      content: iconId,
      position: { x: 100 + openWindows.length * 30, y: 50 + openWindows.length * 30 },
      size: { width: 600, height: 400 },
      isMinimized: false,
      isMaximized: false
    };

    setOpenWindows(prev => [...prev, newWindow]);
    addRecent(iconId);
    setActiveWindow(iconId);
  };

  const handleWindowClose = (windowId: string) => {
    setOpenWindows(prev => prev.filter(window => window.id !== windowId));
    if (activeWindow === windowId) {
      setActiveWindow(null);
    }
  };

  const handleWindowMinimize = (windowId: string) => {
    setOpenWindows(prev => prev.map(window => 
      window.id === windowId ? { ...window, isMinimized: true } : window
    ));
    if (activeWindow === windowId) {
      setActiveWindow(null);
    }
  };

  const handleWindowMaximize = (windowId: string) => {
    setOpenWindows(prev => prev.map(window => 
      window.id === windowId ? { ...window, isMaximized: !window.isMaximized } : window
    ));
  };

  const handleStartItemClick = (itemId: string) => {
    handleIconClick(itemId);
  };

  const handleTaskbarWindowClick = (windowId: string) => {
    const clicked = openWindows.find(w => w.id === windowId);
    if (!clicked) return;

    // If window is minimized, restore it and focus
    if (clicked.isMinimized) {
      setOpenWindows(prev => {
        const restored = prev.map(w => w.id === windowId ? { ...w, isMinimized: false } : w);
        // Move restored window to front
        const target = restored.find(w => w.id === windowId)!;
        return [...restored.filter(w => w.id !== windowId), target];
      });
      setActiveWindow(windowId);
      return;
    }

    // If already active, toggle minimize
    if (activeWindow === windowId) {
      setOpenWindows(prev => prev.map(w => w.id === windowId ? { ...w, isMinimized: true } : w));
      setActiveWindow(null);
      return;
    }

    // Otherwise, bring to front and focus
    handleWindowFocus(windowId);
  };

  const handleShowDesktop = () => {
    setOpenWindows(prev => prev.map(w => ({ ...w, isMinimized: true })));
    setActiveWindow(null);
  };

  const handleWindowFocus = (windowId: string) => {
    setActiveWindow(windowId);
    // Bring window to front
    setOpenWindows(prev => [
      ...prev.filter(window => window.id !== windowId),
      prev.find(window => window.id === windowId)!
    ]);
  };

  const handleWindowMove = (windowId: string, newPosition: { x: number; y: number }) => {
    setOpenWindows(prev => prev.map(window => 
      window.id === windowId ? { ...window, position: newPosition } : window
    ));
  };

  const handleWindowResize = (windowId: string, newSize: { width: number; height: number }) => {
    setOpenWindows(prev => prev.map(window => 
      window.id === windowId ? { ...window, size: newSize } : window
    ));
  };

  return (
    <div
      className="desktop"
      style={{
        backgroundImage: `url(${(wallpaperUrl ?? (process.env.PUBLIC_URL + '/wallpaper.jpg'))})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Desktop Icons */}
      <div className="desktop-icons">
        {desktopIcons.map(icon => (
          <DesktopIcon
            key={icon.id}
            id={icon.id}
            name={icon.name}
            icon={icon.icon}
            position={icon.position}
            onClick={() => handleIconClick(icon.id)}
          />
        ))}
      </div>

      {/* Open Windows */}
      {openWindows.map(window => (
        <Window
          key={window.id}
          window={window}
          isActive={activeWindow === window.id}
          onClose={() => handleWindowClose(window.id)}
          onMinimize={() => handleWindowMinimize(window.id)}
          onMaximize={() => handleWindowMaximize(window.id)}
          onFocus={() => handleWindowFocus(window.id)}
          onMove={handleWindowMove}
          onResize={handleWindowResize}
        />
      ))}

      {/* Taskbar */}
      <Taskbar
        openWindows={openWindows}
        activeWindow={activeWindow}
        onWindowClick={handleTaskbarWindowClick}
        onWindowMinimize={handleWindowMinimize}
        onStartItemClick={handleStartItemClick}
        onShowDesktop={handleShowDesktop}
      />
    </div>
  );
};

export default Desktop;
