import React from 'react';
import type { MockupConfig, ExportFormat, ExportSizePresetId } from '../types';
import { EXPORT_SIZE_PRESETS } from '../constants/presets';
import { Download, Copy, X, Check, Sparkles, Layers, Sliders, Monitor } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: MockupConfig;
  onChangeConfig: (newConfig: Partial<MockupConfig>) => void;
  onConfirmDownload: () => void;
  onCopyClipboard: () => void;
  isExporting: boolean;
  canvasRef: React.RefObject<HTMLDivElement | null>;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  config,
  onChangeConfig,
  onConfirmDownload,
  onCopyClipboard,
  isExporting,
  canvasRef,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  // Calculate estimated pixel dimensions
  const getEstimatedDimensions = (scale: 1 | 2 | 3 | 4) => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const w = Math.round(rect.width * scale);
      const h = Math.round(rect.height * scale);
      return `${w} × ${h} px`;
    }
    const defaultWidths: Record<number, string> = {
      1: '1280 × 720 px',
      2: '2560 × 1440 px',
      3: '3840 × 2160 px',
      4: '7680 × 4320 px',
    };
    return defaultWidths[scale] || '2560 × 1440 px';
  };

  const handleCopy = () => {
    onCopyClipboard();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-[#161822] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-5 px-6 border-b border-white/10 flex items-center justify-between bg-black/20">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Download Mockup Image</h2>
              <p className="text-xs text-gray-400">Select output resolution size and image format</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
          {/* 1. Size / Resolution Selection */}
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2.5 flex items-center justify-between">
              <span>Select Export Size & Resolution</span>
              <span className="text-[11px] text-indigo-400 font-mono font-normal">
                {getEstimatedDimensions(config.exportScale)}
              </span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {EXPORT_SIZE_PRESETS.map((preset) => {
                const isSelected = config.exportScale === preset.scale;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() =>
                      onChangeConfig({
                        exportScale: preset.scale,
                        exportSizePreset: preset.id as ExportSizePresetId,
                      })
                    }
                    className={`p-3.5 rounded-xl border text-left flex flex-col justify-between gap-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/10'
                        : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Monitor className={`w-4 h-4 ${isSelected ? 'text-indigo-400' : 'text-gray-400'}`} />
                        <span className="text-xs font-bold">{preset.name}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-indigo-400 shrink-0" />}
                    </div>

                    <div>
                      <span className="text-[11px] font-mono text-indigo-300 font-semibold block">
                        {preset.label}
                      </span>
                      <p className="text-[10px] text-gray-400 mt-0.5 leading-normal">
                        {preset.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Format Selector */}
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
              Image Format
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['png', 'jpeg', 'webp'] as ExportFormat[]).map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => onChangeConfig({ exportFormat: fmt })}
                  className={`py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    config.exportFormat === fmt
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>

          {/* Transparent BG Info Pill */}
          {config.backgroundType === 'transparent' && (
            <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong>Transparent Background Active:</strong> Exporting transparent PNG file with clean background alpha pixels.
              </span>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 border-t border-white/10 bg-black/30 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className={`px-4 py-2.5 rounded-xl text-xs font-medium border flex items-center gap-2 transition-all cursor-pointer ${
              copied
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-white/10 hover:bg-white/15 text-white border-white/15'
            }`}
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy PNG'}</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-xs font-medium transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={() => {
                onConfirmDownload();
                onClose();
              }}
              disabled={isExporting}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{isExporting ? 'Exporting...' : 'Download Image'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
