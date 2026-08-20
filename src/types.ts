export type BrowserType = 'safari' | 'chrome' | 'brave' | 'arc' | 'glass' | 'edge';

export type ThemeMode = 'dark' | 'light';

export type WindowControlsStyle = 'mac' | 'windows' | 'minimal' | 'hidden';

export type AspectRatio = 'auto' | '16:9' | '4:3' | '1:1' | '9:16' | '4:5' | '21:9';

export type BackgroundType = 'gradient' | 'solid' | 'transparent';

export type ExportFormat = 'png' | 'jpeg' | 'webp';

export type ShadowStyle = 'none' | 'soft' | 'medium' | 'heavy' | 'glow' | 'floating';

export interface GradientPreset {
  id: string;
  name: string;
  css: string;
}

export interface SampleImage {
  id: string;
  title: string;
  category: string;
  url: string;
}

export type ExportSizePresetId = '1080p' | '2k' | '4k' | '8k' | '1x' | '2x' | '3x' | '4x';

export interface ExportSizePreset {
  id: ExportSizePresetId;
  name: string;
  label: string;
  scale: 1 | 2 | 3 | 4;
  recommendedWidth?: number;
  description: string;
}

export interface MockupConfig {
  // Image
  imageSrc: string | null;
  imageFit: 'cover' | 'contain';
  imageScale: number; // 50 to 150
  imagePosition: 'center' | 'top';

  // Browser Frame
  browserType: BrowserType;
  themeMode: ThemeMode;
  url: string;
  title: string;
  showUrlBar: boolean;
  showControls: boolean;
  controlsStyle: WindowControlsStyle;
  showLockIcon: boolean;
  showNavButtons: boolean;

  // Window Styling
  windowRadius: number; // 0 to 32
  imageRadius: number; // 0 to 24
  shadowStyle: ShadowStyle;
  borderWidth: number; // 0 to 4
  borderColor: string;

  // Canvas / Background
  backgroundType: BackgroundType;
  gradientPreset: string;
  solidColor: string;
  paddingX: number; // 16 to 160
  paddingY: number; // 16 to 160
  aspectRatio: AspectRatio;

  // Watermark
  showWatermark: boolean;
  watermarkText: string;

  // Export
  exportScale: 1 | 2 | 3 | 4;
  exportFormat: ExportFormat;
  exportSizePreset: ExportSizePresetId;
}
