export interface WindowType {
  id: string;
  title: string;
  content: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMinimized: boolean;
  isMaximized: boolean;
}

export interface DesktopIconType {
  id: string;
  name: string;
  icon: string;
  position: { x: number; y: number };
}
