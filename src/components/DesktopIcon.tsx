import React from 'react';
import './DesktopIcon.css';

interface DesktopIconProps {
  id: string;
  name: string;
  icon: string;
  position: { x: number; y: number };
  onClick: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ id, name, icon, position, onClick }) => {
  return (
    <div 
      className="desktop-icon xp-icon"
      style={{ 
        position: 'absolute',
        left: position.x,
        top: position.y
      }}
      onClick={onClick}
      onDoubleClick={onClick}
    >
      <div className="icon-image">
        {icon === '📁' ? (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect x="2" y="6" width="28" height="24" rx="2" fill="#FFD700" stroke="#B8860B" strokeWidth="1"/>
            <rect x="2" y="2" width="12" height="6" rx="1" fill="#FFD700" stroke="#B8860B" strokeWidth="1"/>
            <path d="M2 8h12" stroke="#B8860B" strokeWidth="1"/>
          </svg>
        ) : (
          <span style={{ fontSize: '32px' }}>{icon}</span>
        )}
      </div>
      <span className="icon-label">{name}</span>
    </div>
  );
};

export default DesktopIcon;
