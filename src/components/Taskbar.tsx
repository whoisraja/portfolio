import React, { useState } from 'react';
import { WindowType } from '../types/WindowType';
import './Taskbar.css';
import { useSettings } from './SettingsContext';

interface TaskbarProps {
  openWindows: WindowType[];
  activeWindow: string | null;
  onWindowClick: (windowId: string) => void;
  onWindowMinimize: (windowId: string) => void;
  onStartItemClick?: (itemId: string) => void;
  onShowDesktop?: () => void;
}

const Taskbar: React.FC<TaskbarProps> = ({
  openWindows,
  activeWindow,
  onWindowClick,
  onWindowMinimize,
  onStartItemClick,
  onShowDesktop
}) => {
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { use24HourClock, pinnedIds, recentIds, togglePinned, accentColor, setAccentColor } = useSettings();

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
      hour12: !use24HourClock
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

      <button className="show-desktop" title="Show Desktop" onClick={() => onShowDesktop?.()}>
        ⊞
      </button>

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

          {/* Start menu body with three columns: Pinned, All Apps, Recents */}
          <div className="start-body">
            <div>
              <div className="start-section-title">Pinned</div>
              {pinnedIds.map(id => (
                <div key={id} className="menu-item" onClick={() => { openFromStart(id); togglePinned(id); }}>
                  <span className="menu-icon">📌</span>
                  <span className="menu-text" style={{ flex: 1, textTransform: 'capitalize' }}>{id.replace('-', ' ')}</span>
                  <span className="menu-pin">Unpin</span>
                </div>
              ))}
            </div>

            <div>
              <div className="start-section-title">All Apps</div>
              {['settings','my-computer','recycle-bin','projects','skills','certifications','about','contact','game','dont-open','terminal'].map(id => (
                <div key={id} className="menu-item" onClick={() => openFromStart(id)}>
                  <span className="menu-icon">📁</span>
                  <span className="menu-text" style={{ textTransform: 'capitalize' }}>{id.replace('-', ' ')}</span>
                  <button className="xp-button" style={{ fontSize: 9 }} onClick={(e) => { e.stopPropagation(); togglePinned(id); }}>Pin</button>
                </div>
              ))}
            </div>

            <div>
              <div className="start-section-title">Recent</div>
              {recentIds.length === 0 && <div className="menu-item" style={{ opacity: 0.7 }}>No recent items</div>}
              {recentIds.map(id => (
                <div key={id} className="menu-item" onClick={() => openFromStart(id)}>
                  <span className="menu-icon">🕓</span>
                  <span className="menu-text" style={{ textTransform: 'capitalize' }}>{id.replace('-', ' ')}</span>
                </div>
              ))}

              <div className="menu-separator" />
              <div className="start-section-title">Accent</div>
              <input type="color" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} />
            </div>
          </div>

          <div style={{ padding: 8 }}>
            <div className="menu-separator" />
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
