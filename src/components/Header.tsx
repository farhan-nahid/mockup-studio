import React, { useState } from 'react';
import type { MockupConfig, ExportFormat } from '../types';
import { QUICK_PRESETS } from '../constants/presets';
import {
  Upload,
  Download,
  Copy,
  RotateCcw,
  Sparkles,
  Check,
  Globe,
  Sliders,
  ChevronDown,
} from 'lucide-react';

interface HeaderProps {
  config: MockupConfig;
  onChangeConfig: (newConfig: Partial<MockupConfig>) => void;
  onUploadClick: () => void;
  onResetClick: () => void;
  onSampleClick: () => void;
  onExport: () => void;
  onCopyClipboard: () => void;
  isExporting: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  config,
  onChangeConfig,
  onUploadClick,
  onResetClick,
  onSampleClick,
  onExport,
  onCopyClipboard,
  isExporting,
}) => {
  const [copied, setCopied] = useState(false);
  const [showPresetsMenu, setShowPresetsMenu] = useState(false);

  const handleCopy = async () => {
    onCopyClipboard();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="h-16 px-4 lg:px-6 bg-[#0f1117]/90 backdrop-blur-xl border-b border-white/10 flex items-center justify-between z-40 select-none">
      {/* Brand Logo */}
      <div className="flex items-center space-x-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 border border-white/20">
          <Globe className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-base font-bold text-white tracking-tight">MockupStudio</h1>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              PRO
            </span>
          </div>
          <p className="text-[10px] text-gray-400 hidden sm:block">
            High-Resolution Browser Mockup Generator
          </p>
        </div>
      </div>

      {/* Middle Action: Quick Preset Selector & Samples */}
      <div className="hidden md:flex items-center space-x-2">
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowPresetsMenu(!showPresetsMenu)}
            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-indigo-400" />
            <span>Presets</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-60" />
          </button>

          {showPresetsMenu && (
            <div className="absolute top-full mt-2 left-0 w-56 rounded-xl bg-[#181a24] border border-white/10 shadow-2xl p-1.5 z-50">
              <div className="px-2 py-1 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                Quick Mockup Presets
              </div>
              {QUICK_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => {
                    onChangeConfig(preset.config);
                    setShowPresetsMenu(false);
                  }}
                  className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-white/10 text-xs text-gray-200 hover:text-white flex items-center justify-between transition-colors"
                >
                  <span>{preset.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onSampleClick}
          className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Samples</span>
        </button>

        <button
          type="button"
          onClick={onResetClick}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
          title="Reset to default settings"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Right Actions: Upload, Scale Selector, Copy & Download */}
      <div className="flex items-center space-x-2">
        <button
          type="button"
          onClick={onUploadClick}
          className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white border border-white/15 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer hidden sm:flex"
        >
          <Upload className="w-3.5 h-3.5 text-indigo-400" />
          <span>Upload Image</span>
        </button>

        {/* Resolution Scale selector */}
        <div className="flex items-center rounded-lg bg-white/5 border border-white/10 p-0.5 text-xs">
          {([1, 2, 3, 4] as const).map((scale) => (
            <button
              key={scale}
              type="button"
              onClick={() => onChangeConfig({ exportScale: scale })}
              className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                config.exportScale === scale
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {scale}x
            </button>
          ))}
        </div>

        {/* Export Format Selector */}
        <select
          value={config.exportFormat}
          onChange={(e) => onChangeConfig({ exportFormat: e.target.value as ExportFormat })}
          className="bg-white/5 border border-white/10 text-gray-300 text-xs rounded-lg px-2 py-1.5 font-medium outline-none cursor-pointer hover:bg-white/10 transition-colors hidden sm:block"
        >
          <option value="png" className="bg-[#181a24] text-white">PNG</option>
          <option value="jpeg" className="bg-[#181a24] text-white">JPEG</option>
          <option value="webp" className="bg-[#181a24] text-white">WebP</option>
        </select>

        {/* Copy to Clipboard Button */}
        <button
          type="button"
          onClick={handleCopy}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-all cursor-pointer ${
            copied
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
              : 'bg-white/10 hover:bg-white/15 text-white border-white/15'
          }`}
          title="Copy mockup directly to clipboard"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span className="hidden md:inline">{copied ? 'Copied!' : 'Copy'}</span>
        </button>

        {/* Download Button */}
        <button
          type="button"
          onClick={onExport}
          disabled={isExporting}
          className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-medium text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer disabled:opacity-50"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{isExporting ? 'Exporting...' : 'Download'}</span>
        </button>
      </div>
    </header>
  );
};
