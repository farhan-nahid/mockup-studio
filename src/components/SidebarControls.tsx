import React, { useState } from 'react';
import type { MockupConfig, BrowserType, WindowControlsStyle, AspectRatio, BackgroundType, ShadowStyle } from '../types';
import { GRADIENT_PRESETS } from '../constants/presets';
import { PRESET_TAB_COLORS } from '../utils/colorUtils';
import {
  Globe,
  Sliders,
  Palette,
  Type,
  Sun,
  Moon,
  Sparkles,
  Shield,
  Compass,
  Monitor,
  Box,
} from 'lucide-react';

interface SidebarProps {
  config: MockupConfig;
  onChangeConfig: (newConfig: Partial<MockupConfig>) => void;
}

export const SidebarControls: React.FC<SidebarProps> = ({ config, onChangeConfig }) => {
  const [activeTab, setActiveTab] = useState<'browser' | 'canvas' | 'window' | 'watermark'>('browser');

  const browserOptions: { id: BrowserType; name: string; icon: React.ReactNode }[] = [
    { id: 'safari', name: 'Safari', icon: <Compass className="w-4 h-4 text-blue-400" /> },
    { id: 'chrome', name: 'Chrome', icon: <Globe className="w-4 h-4 text-emerald-400" /> },
    { id: 'brave', name: 'Brave', icon: <Shield className="w-4 h-4 text-orange-400" /> },
    { id: 'arc', name: 'Arc', icon: <Sparkles className="w-4 h-4 text-indigo-400" /> },
    { id: 'glass', name: 'Glass', icon: <Box className="w-4 h-4 text-cyan-400" /> },
    { id: 'edge', name: 'Edge', icon: <Monitor className="w-4 h-4 text-sky-400" /> },
  ];

  const shadowOptions: { id: ShadowStyle; name: string }[] = [
    { id: 'none', name: 'None' },
    { id: 'soft', name: 'Soft' },
    { id: 'medium', name: 'Medium' },
    { id: 'heavy', name: 'Heavy' },
    { id: 'glow', name: 'Glow' },
    { id: 'floating', name: 'Floating' },
  ];

  const aspectRatios: { id: AspectRatio; name: string }[] = [
    { id: 'auto', name: 'Auto' },
    { id: '16:9', name: '16:9' },
    { id: '4:3', name: '4:3' },
    { id: '1:1', name: '1:1' },
    { id: '9:16', name: '9:16' },
    { id: '4:5', name: '4:5' },
    { id: '21:9', name: '21:9' },
  ];

  return (
    <aside className="w-full lg:w-96 bg-[#0d0e14] border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col h-auto lg:h-full select-none z-10">
      {/* Top Section Tabs */}
      <div className="flex border-b border-white/10 p-1 bg-black/20">
        <button
          type="button"
          onClick={() => setActiveTab('browser')}
          className={`flex-1 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'browser'
              ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 shadow-xs'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Frame</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('canvas')}
          className={`flex-1 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'canvas'
              ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 shadow-xs'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Canvas</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('window')}
          className={`flex-1 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'window'
              ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 shadow-xs'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Styling</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('watermark')}
          className={`flex-1 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'watermark'
              ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 shadow-xs'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Type className="w-3.5 h-3.5" />
          <span>Text</span>
        </button>
      </div>

      {/* Control Panels Scrollable Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
        {/* BROWSER TAB CONTROLS */}
        {activeTab === 'browser' && (
          <div className="space-y-5 animate-fadeIn">
            {/* Browser Style */}
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
                Browser Frame Style
              </label>
              <div className="grid grid-cols-3 gap-2">
                {browserOptions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onChangeConfig({ browserType: item.id })}
                    className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                      config.browserType === item.id
                        ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/10'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {item.icon}
                    <span className="text-xs font-medium">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Mode Toggle */}
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
                Frame Theme Mode / Tab Color
              </label>
              <div className="flex items-center rounded-xl bg-white/5 border border-white/10 p-1">
                <button
                  type="button"
                  onClick={() => onChangeConfig({ themeMode: 'dark' })}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition-all cursor-pointer ${
                    config.themeMode === 'dark'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>Dark</span>
                </button>
                <button
                  type="button"
                  onClick={() => onChangeConfig({ themeMode: 'light' })}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition-all cursor-pointer ${
                    config.themeMode === 'light'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>White</span>
                </button>
                <button
                  type="button"
                  onClick={() => onChangeConfig({ themeMode: 'custom' })}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition-all cursor-pointer ${
                    config.themeMode === 'custom'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Palette className="w-3.5 h-3.5" />
                  <span>Color</span>
                </button>
              </div>

              {/* Custom Tab Color Picker & Swatches */}
              {config.themeMode === 'custom' && (
                <div className="mt-3 p-3 rounded-xl bg-white/5 border border-white/10 space-y-3 animate-fadeIn">
                  <div className="flex items-center gap-2">
                    <div
                      className="relative w-9 h-9 rounded-lg overflow-hidden border border-white/20 shrink-0 cursor-pointer shadow-inner"
                      style={{ backgroundColor: config.customTabColor || '#2563eb' }}
                    >
                      <input
                        type="color"
                        value={config.customTabColor || '#2563eb'}
                        onChange={(e) => onChangeConfig({ customTabColor: e.target.value })}
                        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                      />
                    </div>
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={config.customTabColor || '#2563eb'}
                        onChange={(e) => onChangeConfig({ customTabColor: e.target.value })}
                        placeholder="#2563eb"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white font-mono outline-none focus:border-indigo-500 uppercase"
                      />
                    </div>
                  </div>

                  {/* Preset Swatches */}
                  <div>
                    <label className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block mb-1.5">
                      Preset Colors
                    </label>
                    <div className="grid grid-cols-6 gap-1.5">
                      {PRESET_TAB_COLORS.map((color) => (
                        <button
                          key={color.value}
                          type="button"
                          title={color.name}
                          onClick={() => onChangeConfig({ customTabColor: color.value })}
                          className={`w-full aspect-square rounded-md transition-all cursor-pointer flex items-center justify-center border ${
                            config.customTabColor?.toLowerCase() === color.value.toLowerCase()
                              ? 'border-white scale-110 shadow-md ring-2 ring-indigo-500/50'
                              : 'border-white/10 hover:scale-105'
                          }`}
                          style={{ backgroundColor: color.value }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Address Bar URL */}
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
                Address Bar URL
              </label>
              <input
                type="text"
                value={config.url}
                onChange={(e) => onChangeConfig({ url: e.target.value })}
                placeholder="https://example.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 font-mono outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Window Title */}
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
                Tab / Window Title
              </label>
              <input
                type="text"
                value={config.title}
                onChange={(e) => onChangeConfig({ title: e.target.value })}
                placeholder="Page Title"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Controls Style */}
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
                Window Buttons Style
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['mac', 'windows', 'minimal', 'hidden'] as WindowControlsStyle[]).map((style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => onChangeConfig({ controlsStyle: style })}
                    className={`py-2 px-3 rounded-xl border text-xs font-medium capitalize transition-all cursor-pointer ${
                      config.controlsStyle === style
                        ? 'bg-indigo-600/20 border-indigo-500 text-white'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    {style === 'mac' ? 'macOS Traffic' : style}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              <label className="flex items-center justify-between text-xs cursor-pointer">
                <span className="text-gray-300">Show URL Bar</span>
                <input
                  type="checkbox"
                  checked={config.showUrlBar}
                  onChange={(e) => onChangeConfig({ showUrlBar: e.target.checked })}
                  className="rounded border-white/10 bg-white/5 text-indigo-600 focus:ring-0 cursor-pointer w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between text-xs cursor-pointer">
                <span className="text-gray-300">Show SSL Lock Icon</span>
                <input
                  type="checkbox"
                  checked={config.showLockIcon}
                  onChange={(e) => onChangeConfig({ showLockIcon: e.target.checked })}
                  className="rounded border-white/10 bg-white/5 text-indigo-600 focus:ring-0 cursor-pointer w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between text-xs cursor-pointer">
                <span className="text-gray-300">Show Navigation Buttons</span>
                <input
                  type="checkbox"
                  checked={config.showNavButtons}
                  onChange={(e) => onChangeConfig({ showNavButtons: e.target.checked })}
                  className="rounded border-white/10 bg-white/5 text-indigo-600 focus:ring-0 cursor-pointer w-4 h-4"
                />
              </label>
            </div>
          </div>
        )}

        {/* ================= CANVAS TAB ================= */}
        {activeTab === 'canvas' && (
          <div className="space-y-5">
            {/* Background Type */}
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
                Background Mode
              </label>
              <div className="flex items-center rounded-xl bg-white/5 border border-white/10 p-1">
                {(['gradient', 'solid', 'transparent'] as BackgroundType[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => onChangeConfig({ backgroundType: type })}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-medium capitalize transition-all cursor-pointer ${
                      config.backgroundType === type
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Gradient Preset Grid */}
            {config.backgroundType === 'gradient' && (
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
                  Gradient Presets
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {GRADIENT_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => onChangeConfig({ gradientPreset: preset.id })}
                      className={`h-10 rounded-xl border transition-all cursor-pointer ${
                        config.gradientPreset === preset.id
                          ? 'border-white scale-105 shadow-lg'
                          : 'border-transparent opacity-80 hover:opacity-100'
                      }`}
                      style={{ background: preset.css }}
                      title={preset.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Solid Color Picker */}
            {config.backgroundType === 'solid' && (
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
                  Solid Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={config.solidColor}
                    onChange={(e) => onChangeConfig({ solidColor: e.target.value })}
                    className="w-10 h-10 rounded-xl bg-transparent border-0 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={config.solidColor}
                    onChange={(e) => onChangeConfig({ solidColor: e.target.value })}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono outline-none"
                  />
                </div>
              </div>
            )}

            {/* Aspect Ratio */}
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
                Canvas Aspect Ratio
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {aspectRatios.map((ratio) => (
                  <button
                    key={ratio.id}
                    type="button"
                    onClick={() => onChangeConfig({ aspectRatio: ratio.id })}
                    className={`py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                      config.aspectRatio === ratio.id
                        ? 'bg-indigo-600/20 border-indigo-500 text-white'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    {ratio.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Canvas Padding Sliders */}
            <div className="space-y-4 pt-2 border-t border-white/10">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300">Horizontal Padding</span>
                  <span className="text-indigo-400 font-mono">{config.paddingX}px</span>
                </div>
                <input
                  type="range"
                  min="16"
                  max="160"
                  value={config.paddingX}
                  onChange={(e) => onChangeConfig({ paddingX: Number(e.target.value) })}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300">Vertical Padding</span>
                  <span className="text-indigo-400 font-mono">{config.paddingY}px</span>
                </div>
                <input
                  type="range"
                  min="16"
                  max="160"
                  value={config.paddingY}
                  onChange={(e) => onChangeConfig({ paddingY: Number(e.target.value) })}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= WINDOW / FRAME TAB ================= */}
        {activeTab === 'window' && (
          <div className="space-y-5">
            {/* Corner Rounding Slider */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-300">Window Corner Radius</span>
                <span className="text-indigo-400 font-mono">{config.windowRadius}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="32"
                value={config.windowRadius}
                onChange={(e) => onChangeConfig({ windowRadius: Number(e.target.value) })}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            {/* Inner Image Corner Radius Slider */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-300">Inner Image Radius</span>
                <span className="text-indigo-400 font-mono">{config.imageRadius}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="24"
                value={config.imageRadius}
                onChange={(e) => onChangeConfig({ imageRadius: Number(e.target.value) })}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            {/* Drop Shadow Style */}
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
                Drop Shadow Effect
              </label>
              <div className="grid grid-cols-3 gap-2">
                {shadowOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onChangeConfig({ shadowStyle: opt.id })}
                    className={`py-2 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                      config.shadowStyle === opt.id
                        ? 'bg-indigo-600/20 border-indigo-500 text-white'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    {opt.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Image Fit & Scaling */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
                  Image Fit Mode
                </label>
                <div className="flex rounded-xl bg-white/5 border border-white/10 p-1">
                  <button
                    type="button"
                    onClick={() => onChangeConfig({ imageFit: 'cover' })}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      config.imageFit === 'cover' ? 'bg-indigo-600 text-white' : 'text-gray-400'
                    }`}
                  >
                    Cover (Crop)
                  </button>
                  <button
                    type="button"
                    onClick={() => onChangeConfig({ imageFit: 'contain' })}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      config.imageFit === 'contain' ? 'bg-indigo-600 text-white' : 'text-gray-400'
                    }`}
                  >
                    Contain (Full)
                  </button>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300">Image Scale / Zoom</span>
                  <span className="text-indigo-400 font-mono">{config.imageScale}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="150"
                  value={config.imageScale}
                  onChange={(e) => onChangeConfig({ imageScale: Number(e.target.value) })}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= WATERMARK TAB ================= */}
        {activeTab === 'watermark' && (
          <div className="space-y-5">
            <label className="flex items-center justify-between text-xs cursor-pointer p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-gray-200 font-medium">Enable Custom Watermark</span>
              <input
                type="checkbox"
                checked={config.showWatermark}
                onChange={(e) => onChangeConfig({ showWatermark: e.target.checked })}
                className="rounded border-white/10 bg-white/5 text-indigo-600 focus:ring-0 cursor-pointer w-4 h-4"
              />
            </label>

            {config.showWatermark && (
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
                  Watermark Branding Text
                </label>
                <input
                  type="text"
                  value={config.watermarkText}
                  onChange={(e) => onChangeConfig({ watermarkText: e.target.value })}
                  placeholder="e.g. Made with MyBrand"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};
