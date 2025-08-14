import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type ThemeMode = 'light' | 'dark';

interface SettingsState {
  wallpaperUrl: string | null;
  use24HourClock: boolean;
  theme: ThemeMode;
  pinnedIds: string[];
  recentIds: string[];
  accentColor: string;
  setWallpaperUrl: (url: string | null) => void;
  setUse24HourClock: (v: boolean) => void;
  setTheme: (t: ThemeMode) => void;
  togglePinned: (id: string) => void;
  addRecent: (id: string) => void;
  setAccentColor: (hex: string) => void;
}

const SettingsContext = createContext<SettingsState | undefined>(undefined);

const SETTINGS_KEY = 'xp_settings_v1';

function loadSettings(): Pick<SettingsState, 'wallpaperUrl' | 'use24HourClock' | 'theme' | 'pinnedIds' | 'recentIds' | 'accentColor'> {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return { wallpaperUrl: null, use24HourClock: false, theme: 'light', pinnedIds: ['my-computer','projects','skills'], recentIds: [], accentColor: '#0054E3' };
    const parsed = JSON.parse(raw);
    return {
      wallpaperUrl: typeof parsed.wallpaperUrl === 'string' ? parsed.wallpaperUrl : null,
      use24HourClock: Boolean(parsed.use24HourClock),
      theme: parsed.theme === 'dark' ? 'dark' : 'light',
      pinnedIds: Array.isArray(parsed.pinnedIds) ? parsed.pinnedIds : ['my-computer','projects','skills'],
      recentIds: Array.isArray(parsed.recentIds) ? parsed.recentIds : [],
      accentColor: typeof parsed.accentColor === 'string' ? parsed.accentColor : '#0054E3'
    };
  } catch {
    return { wallpaperUrl: null, use24HourClock: false, theme: 'light', pinnedIds: ['my-computer','projects','skills'], recentIds: [], accentColor: '#0054E3' };
  }
}

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initial = useMemo(loadSettings, []);
  const [wallpaperUrl, setWallpaperUrl] = useState<string | null>(initial.wallpaperUrl);
  const [use24HourClock, setUse24HourClock] = useState<boolean>(initial.use24HourClock);
  const [theme, setTheme] = useState<ThemeMode>(initial.theme);
  const [pinnedIds, setPinnedIds] = useState<string[]>(initial.pinnedIds);
  const [recentIds, setRecentIds] = useState<string[]>(initial.recentIds);
  const [accentColor, setAccentColor] = useState<string>(initial.accentColor);

  useEffect(() => {
    localStorage.setItem(
      SETTINGS_KEY,
      JSON.stringify({ wallpaperUrl, use24HourClock, theme, pinnedIds, recentIds, accentColor })
    );
  }, [wallpaperUrl, use24HourClock, theme, pinnedIds, recentIds, accentColor]);

  const togglePinned = (id: string) => {
    setPinnedIds((prev) => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  };

  const addRecent = (id: string) => {
    setRecentIds((prev) => {
      const next = [id, ...prev.filter(x => x !== id)];
      return next.slice(0, 6);
    });
  };

  const value: SettingsState = {
    wallpaperUrl,
    use24HourClock,
    theme,
    pinnedIds,
    recentIds,
    accentColor,
    setWallpaperUrl,
    setUse24HourClock,
    setTheme,
    togglePinned,
    addRecent,
    setAccentColor
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export function useSettings(): SettingsState {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}


