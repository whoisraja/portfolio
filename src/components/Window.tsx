import React, { useState, useRef, useEffect } from 'react';
import { WindowType } from '../types/WindowType';
import './Window.css';
import WindowContent from './WindowContent';

interface WindowProps {
  window: WindowType;
  isActive: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onMove: (windowId: string, position: { x: number; y: number }) => void;
  onResize: (windowId: string, size: { width: number; height: number }) => void;
}

const Window: React.FC<WindowProps> = ({
  window,
  isActive,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onMove,
  onResize
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains('window-titlebar')) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - window.position.x,
        y: e.clientY - window.position.y
      });
      onFocus();
    }
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: window.size.width,
      height: window.size.height
    });
    onFocus();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;
        onMove(window.id, { x: newX, y: newY });
      }
      
      if (isResizing) {
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;
        const newWidth = Math.max(300, resizeStart.width + deltaX);
        const newHeight = Math.max(200, resizeStart.height + deltaY);
        onResize(window.id, { width: newWidth, height: newHeight });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragOffset, resizeStart, window.id, onMove, onResize]);

  if (window.isMinimized) {
    return null;
  }

  const windowClass = `window-container ${isActive ? 'active' : ''} ${window.isMaximized ? 'maximized' : ''}`;

  return (
    <div
      ref={windowRef}
      className={windowClass}
      style={{
        left: window.isMaximized ? 0 : window.position.x,
        top: window.isMaximized ? 0 : window.position.y,
        width: window.isMaximized ? '100vw' : window.size.width,
        height: window.isMaximized ? 'calc(100vh - 30px)' : window.size.height,
        zIndex: isActive ? 1000 : 100
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="xp-window">
        <div className="xp-window-titlebar" onMouseDown={handleMouseDown}>
          <div className="window-title">{window.title}</div>
          <div className="window-controls">
            <button className="window-control minimize" onClick={onMinimize}>
              <span>_</span>
            </button>
            <button className="window-control maximize" onClick={onMaximize}>
              <span>□</span>
            </button>
            <button className="window-control close" onClick={onClose}>
              <span>×</span>
            </button>
          </div>
        </div>
        <div className="xp-window-content">
          <WindowContent content={window.content} />
        </div>
        {!window.isMaximized && (
          <div className="window-resize-handle" onMouseDown={handleResizeMouseDown}></div>
        )}
      </div>
    </div>
  );
};

export default Window;
