import type { GradientPreset, MockupConfig, SampleImage } from "../types";

export const GRADIENT_PRESETS: GradientPreset[] = [
  {
    id: "aurora",
    name: "Aurora Night",
    css: "linear-gradient(135deg, #130CB7 0%, #52E5E7 100%)",
  },
  {
    id: "cosmic",
    name: "Cosmic Violet",
    css: "linear-gradient(135deg, #7F00FF 0%, #E100FF 100%)",
  },
  {
    id: "sunset",
    name: "Sunset Glow",
    css: "linear-gradient(135deg, #FF512F 0%, #DD2476 100%)",
  },
  {
    id: "cyber",
    name: "Cyberpunk Neon",
    css: "linear-gradient(135deg, #050515 0%, #1a0836 50%, #4a00e0 100%)",
  },
  {
    id: "mesh-sunset",
    name: "Peach Dusk",
    css: "radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%), radial-gradient(at 0% 100%, hsla(339,49%,30%,1) 0, transparent 50%), radial-gradient(at 100% 100%, hsla(253,16%,7%,1) 0, transparent 50%)",
  },
  {
    id: "emerald",
    name: "Emerald Mist",
    css: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
  },
  {
    id: "slate",
    name: "Deep Slate",
    css: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
  },
  {
    id: "pastel-pink",
    name: "Cotton Candy",
    css: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
  },
  {
    id: "hyper-blue",
    name: "Hyper Blue",
    css: "linear-gradient(135deg, #0061ff 0%, #60efff 100%)",
  },
  {
    id: "warm-amber",
    name: "Warm Amber",
    css: "linear-gradient(135deg, #f2994a 0%, #f2c94c 100%)",
  },
  {
    id: "glass-dark",
    name: "Obsidian Minimal",
    css: "linear-gradient(135deg, #121319 0%, #1c1d27 100%)",
  },
  {
    id: "nordic-sky",
    name: "Nordic Sky",
    css: "linear-gradient(135deg, #2b5876 0%, #4e4376 100%)",
  },
];

export const SAMPLE_IMAGES: SampleImage[] = [
  {
    id: "analytics-dashboard",
    title: "Dark Analytics Dashboard",
    category: "SaaS App",
    url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "code-editor",
    title: "Modern Code Interface",
    category: "Developer Tool",
    url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "landing-page",
    title: "Creative Agency Site",
    category: "Website",
    url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "mobile-app",
    title: "Fintech UI Interface",
    category: "Finance",
    url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1600&q=80",
  },
];

export const EXPORT_SIZE_PRESETS: import("../types").ExportSizePreset[] = [
  {
    id: "1x",
    name: "Standard (1x)",
    label: "Original Scale (100%)",
    scale: 1,
    description: "Fast export at native preview resolution.",
  },
  {
    id: "2k",
    name: "2K Retina (2x)",
    label: "2560 × 1440 HD",
    scale: 2,
    description:
      "Crisp HD resolution. Ideal for presentations, portfolios & social media.",
  },
  {
    id: "4k",
    name: "4K Ultra HD (3x)",
    label: "3840 × 2160 Ultra",
    scale: 3,
    description: "Ultra high-definition 4K output with pixel-perfect crispness.",
  },
  {
    id: "8k",
    name: "8K Master (4x)",
    label: "7680 × 4320 Master",
    scale: 4,
    description: "Maximum studio printing & 8K high-resolution master export.",
  },
];

export const DEFAULT_MOCKUP_CONFIG: MockupConfig = {
  imageSrc: SAMPLE_IMAGES[0].url,
  imageFit: "cover",
  imageScale: 100,
  imagePosition: "center",

  browserType: "safari",
  themeMode: "dark",
  customTabColor: "#2563eb",
  url: "https://app.evident.ai/dashboard",
  title: "Evident — Next-Gen AI Platform",
  showUrlBar: true,
  showControls: true,
  controlsStyle: "mac",
  showLockIcon: true,
  showNavButtons: true,

  windowRadius: 16,
  imageRadius: 0,
  shadowStyle: "heavy",
  borderWidth: 1,
  borderColor: "rgba(255, 255, 255, 0.12)",

  backgroundType: 'transparent',
  gradientPreset: 'cosmic',
  solidColor: '#0f172a',
  paddingX: 48,
  paddingY: 48,
  aspectRatio: 'auto',

  showWatermark: false,
  watermarkText: "Made with MockupStudio",

  exportScale: 2,
  exportFormat: "png",
  exportSizePreset: "2k",
};

export const QUICK_PRESETS: {
  name: string;
  iconName: string;
  config: Partial<MockupConfig>;
}[] = [
  {
    name: "macOS Safari Dark",
    iconName: "Compass",
    config: {
      browserType: "safari",
      themeMode: "dark",
      controlsStyle: "mac",
      gradientPreset: "cosmic",
      shadowStyle: "heavy",
      windowRadius: 16,
      paddingX: 64,
      paddingY: 64,
    },
  },
  {
    name: "Chrome Clean Light",
    iconName: "Globe",
    config: {
      browserType: "chrome",
      themeMode: "light",
      controlsStyle: "mac",
      gradientPreset: "aurora",
      shadowStyle: "medium",
      windowRadius: 12,
      paddingX: 48,
      paddingY: 48,
    },
  },
  {
    name: "Brave Cyber Dark",
    iconName: "Shield",
    config: {
      browserType: "brave",
      themeMode: "dark",
      controlsStyle: "mac",
      gradientPreset: "cyber",
      shadowStyle: "glow",
      windowRadius: 16,
      paddingX: 64,
      paddingY: 64,
    },
  },
  {
    name: "Arc Sleek Modern",
    iconName: "Sparkles",
    config: {
      browserType: "arc",
      themeMode: "dark",
      controlsStyle: "mac",
      gradientPreset: "mesh-sunset",
      shadowStyle: "floating",
      windowRadius: 20,
      paddingX: 72,
      paddingY: 72,
    },
  },
  {
    name: "Glass Translucent",
    iconName: "Box",
    config: {
      browserType: "glass",
      themeMode: "dark",
      controlsStyle: "minimal",
      gradientPreset: "sunset",
      shadowStyle: "glow",
      windowRadius: 24,
      paddingX: 64,
      paddingY: 64,
    },
  },
  {
    name: "Windows Edge Fluent",
    iconName: "Monitor",
    config: {
      browserType: "edge",
      themeMode: "dark",
      controlsStyle: "windows",
      gradientPreset: "slate",
      shadowStyle: "soft",
      windowRadius: 8,
      paddingX: 56,
      paddingY: 56,
    },
  },
  {
    name: "Custom Vibrant Color",
    iconName: "Palette",
    config: {
      browserType: "safari",
      themeMode: "custom",
      customTabColor: "#4f46e5",
      controlsStyle: "mac",
      gradientPreset: "neon",
      shadowStyle: "heavy",
      windowRadius: 16,
      paddingX: 64,
      paddingY: 64,
    },
  },
];
