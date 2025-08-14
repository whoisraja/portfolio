import React, { useRef, useState } from 'react';
import { useSettings } from '../SettingsContext';

const SettingsPanel: React.FC = () => {
  const { wallpaperUrl, setWallpaperUrl, use24HourClock, setUse24HourClock, theme, setTheme } = useSettings();
  const [inputUrl, setInputUrl] = useState<string>(wallpaperUrl ?? '');
  const fileRef = useRef<HTMLInputElement>(null);

  const applyUrl = () => {
    setWallpaperUrl(inputUrl.trim() || null);
  };

  const clearWallpaper = () => {
    setInputUrl('');
    setWallpaperUrl(null);
  };

  const onFileSelected: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      setInputUrl(result);
      setWallpaperUrl(result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="content-section">
      <h3>Settings</h3>
      <div style={{ display: 'grid', gap: 12 }}>
        <div>
          <h4>Theme</h4>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              className="xp-button"
              onClick={() => setTheme('light')}
              disabled={theme === 'light'}
            >
              Light
            </button>
            <button
              className="xp-button"
              onClick={() => setTheme('dark')}
              disabled={theme === 'dark'}
            >
              Dark
            </button>
          </div>
        </div>
        <div>
          <h4>Wallpaper</h4>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              type="text"
              placeholder="Paste image URL or data URI"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              style={{ flex: 1 }}
            />
            <button className="xp-button" onClick={applyUrl}>Apply</button>
            <button className="xp-button" onClick={() => fileRef.current?.click()}>Upload</button>
            <button className="xp-button" onClick={clearWallpaper}>Reset</button>
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={onFileSelected} />
          </div>
        </div>
        <div>
          <h4>Clock</h4>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="checkbox"
              checked={use24HourClock}
              onChange={(e) => setUse24HourClock(e.target.checked)}
            />
            Use 24‑hour time format
          </label>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;


