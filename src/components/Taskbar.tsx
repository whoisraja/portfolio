import React, { useState } from 'react';
import { WindowType } from '../types/WindowType';
import './Taskbar.css';

interface TaskbarProps {
  openWindows: WindowType[];
  activeWindow: string | null;
  onWindowClick: (windowId: string) => void;
  onWindowMinimize: (windowId: string) => void;
  onStartItemClick?: (itemId: string) => void;
}

const Taskbar: React.FC<TaskbarProps> = ({
  openWindows,
  activeWindow,
  onWindowClick,
  onWindowMinimize,
  onStartItemClick
}) => {
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleStartClick = () => {
    setShowStartMenu(!showStartMenu);
  };

  const openFromStart = (id: string) => {
    onStartItemClick?.(id);
    setShowStartMenu(false);
  };

  const handleWindowTaskbarClick = (windowId: string) => {
    const window = openWindows.find(w => w.id === windowId);
    if (window && window.isMinimized) {
      // Restore window
      onWindowClick(windowId);
    } else {
      // Toggle window
      onWindowClick(windowId);
    }
  };

  return (
    <div className="taskbar">
      <button className="start-button" onClick={handleStartClick}>
        <span className="start-icon">⊞</span>
        Start
      </button>

      <div className="taskbar-windows">
        {openWindows.map(window => (
          <button
            key={window.id}
            className={`taskbar-window ${activeWindow === window.id ? 'active' : ''} ${window.isMinimized ? 'minimized' : ''}`}
            onClick={() => handleWindowTaskbarClick(window.id)}
            onContextMenu={(e) => {
              e.preventDefault();
              onWindowMinimize(window.id);
            }}
          >
            <span className="window-icon">📁</span>
            <span className="window-title">{window.title}</span>
          </button>
        ))}
      </div>

      <div className="taskbar-tray">
        <div className="tray-item">
          <span className="tray-icon">🔊</span>
        </div>
        <div className="tray-item">
          <span className="tray-icon">🌐</span>
        </div>
        <div className="tray-time">
          <div className="time">{formatTime(currentTime)}</div>
          <div className="date">{formatDate(currentTime)}</div>
        </div>
      </div>

      {showStartMenu && (
        <div className="start-menu">
          <div className="start-menu-header">
            <div className="user-info">
              <div className="user-avatar">👤</div>
              <div className="user-name">Portfolio User</div>
            </div>
          </div>
          <div className="start-menu-items">
            <button className="menu-item" onClick={() => openFromStart('my-computer')}>
              <span className="menu-icon">🖥️</span>
              <span className="menu-text">My Computer</span>
            </button>
            <button className="menu-item" onClick={() => openFromStart('recycle-bin')}>
              <span className="menu-icon">♻️</span>
              <span className="menu-text">Recycle Bin</span>
            </button>
            <button className="menu-item" onClick={() => openFromStart('projects')}>
              <span className="menu-icon">📁</span>
              <span className="menu-text">Projects</span>
            </button>
            <button className="menu-item" onClick={() => openFromStart('skills')}>
              <span className="menu-icon">📁</span>
              <span className="menu-text">Skills</span>
            </button>
            <button className="menu-item" onClick={() => openFromStart('certifications')}>
              <span className="menu-icon">📁</span>
              <span className="menu-text">Certifications</span>
            </button>
            <button className="menu-item" onClick={() => openFromStart('about')}>
              <span className="menu-icon">ℹ️</span>
              <span className="menu-text">About</span>
            </button>
            <button className="menu-item" onClick={() => openFromStart('contact')}>
              <span className="menu-icon">✉️</span>
              <span className="menu-text">Contact</span>
            </button>
            <button className="menu-item" onClick={() => openFromStart('game')}>
              <span className="menu-icon">🎮</span>
              <span className="menu-text">Tic‑Tac‑Toe</span>
            </button>
            <div className="menu-separator"></div>
            <div className="menu-item">
              <span className="menu-icon">🚪</span>
              <span className="menu-text">Log Off</span>
            </div>
            <div className="menu-item">
              <span className="menu-icon">⏹️</span>
              <span className="menu-text">Turn Off Computer</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Taskbar;
