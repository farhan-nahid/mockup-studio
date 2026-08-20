import React from 'react';
import type { MockupConfig } from '../../types';
import { WindowControls } from './WindowControls';
import { Lock, Sparkles, Command } from 'lucide-react';
import { getContrastColor } from '../../utils/colorUtils';

interface FrameProps {
  config: MockupConfig;
  children: React.ReactNode;
}

export const ArcFrame: React.FC<FrameProps> = ({ config, children }) => {
  const isCustom = config.themeMode === 'custom';
  const customBg = config.customTabColor || '#2563eb';
  const isDark = config.themeMode === 'dark' || (isCustom && getContrastColor(customBg) === 'light');

  return (
    <div
      className={`w-full overflow-hidden flex flex-col transition-colors duration-200 bg-transparent ${
        isDark
          ? 'text-gray-200'
          : 'text-gray-800'
      }`}
    >
      {/* Top Arc Bar */}
      <div
        className={`px-4 py-2.5 flex items-center justify-between gap-3 select-none ${
          !isCustom && (isDark ? 'bg-[#1e1e28]' : 'bg-[#eaeaee]')
        }`}
        style={isCustom ? { backgroundColor: customBg } : undefined}
      >
        <div className="flex items-center space-x-3 shrink-0">
          {config.showControls && (
            <WindowControls style={config.controlsStyle} isDark={isDark} />
          )}
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 opacity-80" />
        </div>

        {/* Center Pill Search */}
        {config.showUrlBar ? (
          <div
            className={`flex-1 max-w-md mx-auto h-7 rounded-full px-3 flex items-center justify-between text-xs transition-all border shadow-xs ${
              isCustom
                ? isDark
                  ? 'bg-black/30 text-gray-100 border-white/10'
                  : 'bg-white/80 text-gray-900 border-black/10 shadow-xs'
                : isDark
                ? 'bg-[#121217] text-gray-300 border-indigo-500/20 shadow-indigo-500/5'
                : 'bg-white text-gray-700 border-black/5'
            }`}
          >
            <div className="flex items-center space-x-2 truncate min-w-0">
              {config.showLockIcon && (
                <Lock className="w-3 h-3 text-indigo-400 shrink-0" />
              )}
              <span className="truncate font-mono text-[11px]">{config.url}</span>
            </div>
            <div className="flex items-center space-x-0.5 text-[10px] opacity-40 shrink-0 font-mono">
              <Command className="w-3 h-3" />
              <span>T</span>
            </div>
          </div>
        ) : (
          <div className="text-xs font-mono opacity-70 truncate">{config.title}</div>
        )}

        <div className="w-8 shrink-0"></div>
      </div>

      {/* Content */}
      <div className="relative w-full overflow-hidden flex-1 p-0 m-0 leading-none">{children}</div>
    </div>
  );
};
