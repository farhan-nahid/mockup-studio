import React from 'react';
import type { MockupConfig } from '../../types';
import { WindowControls } from './WindowControls';
import { Lock, Sparkles } from 'lucide-react';
import { getContrastColor } from '../../utils/colorUtils';

interface FrameProps {
  config: MockupConfig;
  children: React.ReactNode;
}

export const GlassFrame: React.FC<FrameProps> = ({ config, children }) => {
  const isCustom = config.themeMode === 'custom';
  const customBg = config.customTabColor || '#2563eb';
  const isDark = config.themeMode === 'dark' || (isCustom && getContrastColor(customBg) === 'light');

  return (
    <div
      className={`w-full overflow-hidden flex flex-col backdrop-blur-xl transition-all duration-200 border ${
        isCustom
          ? isDark
            ? 'text-gray-100 border-white/20 shadow-2xl'
            : 'text-gray-900 border-black/20 shadow-xl'
          : isDark
          ? 'bg-black/40 text-gray-100 border-white/15 shadow-2xl'
          : 'bg-white/60 text-gray-900 border-white/40 shadow-xl'
      }`}
      style={isCustom ? { backgroundColor: customBg } : undefined}
    >
      {/* Glass Header */}
      <div
        className={`px-4 py-3 flex items-center justify-between gap-3 border-b select-none ${
          isCustom
            ? isDark ? 'border-white/15' : 'border-black/10'
            : isDark ? 'bg-white/5 border-white/10' : 'bg-white/40 border-black/5'
        }`}
      >
        <div className="flex items-center space-x-3 shrink-0">
          {config.showControls && (
            <WindowControls style={config.controlsStyle} isDark={isDark} />
          )}
        </div>

        {/* URL Pill */}
        {config.showUrlBar ? (
          <div
            className={`flex-1 max-w-lg mx-auto h-7 rounded-full px-3 flex items-center justify-between text-xs backdrop-blur-md border ${
              isCustom
                ? isDark
                  ? 'bg-black/30 text-gray-100 border-white/15'
                  : 'bg-white/80 text-gray-900 border-black/10'
                : isDark
                ? 'bg-white/10 text-gray-200 border-white/10'
                : 'bg-black/5 text-gray-800 border-black/5'
            }`}
          >
            <div className="flex items-center space-x-2 truncate min-w-0">
              {config.showLockIcon && (
                <Lock className="w-3 h-3 text-cyan-400 shrink-0" />
              )}
              <span className="truncate font-mono text-[11px]">{config.url}</span>
            </div>
            <Sparkles className="w-3 h-3 text-cyan-400 opacity-70 shrink-0" />
          </div>
        ) : (
          <div className="text-xs font-medium tracking-wide opacity-80">{config.title}</div>
        )}

        <div className="w-8 shrink-0"></div>
      </div>

      {/* Content */}
      <div className="relative w-full overflow-hidden flex-1 p-0 m-0 leading-none">{children}</div>
    </div>
  );
};
