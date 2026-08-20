import React from 'react';
import type { MockupConfig } from '../../types';
import { WindowControls } from './WindowControls';
import {
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Lock,
  Compass,
  MoreHorizontal,
} from 'lucide-react';
import { getContrastColor } from '../../utils/colorUtils';

interface FrameProps {
  config: MockupConfig;
  children: React.ReactNode;
}

export const WindowsEdgeFrame: React.FC<FrameProps> = ({ config, children }) => {
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
      {/* Title Bar & Windows Controls */}
      <div
        className={`px-3 py-1.5 flex items-center justify-between border-b select-none ${
          isCustom
            ? isDark ? 'border-black/30' : 'border-black/10'
            : isDark ? 'bg-[#2b2b2f] border-black/30' : 'bg-[#e5e5e5] border-black/10'
        }`}
        style={isCustom ? { backgroundColor: customBg } : undefined}
      >
        <div className="flex items-center space-x-2 text-xs font-semibold">
          <Compass className="w-3.5 h-3.5 text-blue-500" />
          <span className="truncate max-w-xs text-[11px] opacity-80">
            {config.title || 'Microsoft Edge'}
          </span>
        </div>

        {config.showControls && (
          <WindowControls
            style={config.controlsStyle === 'mac' ? 'windows' : config.controlsStyle}
            isDark={isDark}
          />
        )}
      </div>

      {/* Edge Address & Nav Bar */}
      <div
        className={`px-3 py-1.5 flex items-center justify-between gap-2 border-b select-none ${
          isCustom
            ? isDark ? 'border-black/20' : 'border-black/10'
            : isDark ? 'bg-[#202024] border-black/20' : 'bg-white border-black/10'
        }`}
        style={isCustom ? { backgroundColor: customBg } : undefined}
      >
        {config.showNavButtons && (
          <div className="flex items-center space-x-1 opacity-70 shrink-0">
            <ChevronLeft className="w-4 h-4 cursor-pointer hover:opacity-100" />
            <ChevronRight className="w-4 h-4 opacity-40" />
            <RotateCw className="w-3.5 h-3.5 cursor-pointer hover:opacity-100 ml-1" />
          </div>
        )}

        {config.showUrlBar ? (
          <div
            className={`flex-1 mx-2 h-7 rounded-md px-3 flex items-center justify-between text-xs transition-colors border ${
              isCustom
                ? isDark
                  ? 'bg-black/25 text-gray-100 border-white/10'
                  : 'bg-white/80 text-gray-900 border-black/10'
                : isDark
                ? 'bg-[#1b1b1f] text-gray-200 border-white/10'
                : 'bg-[#f9f9f9] text-gray-800 border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-2 truncate min-w-0">
              {config.showLockIcon && (
                <Lock className="w-3 h-3 text-blue-500 shrink-0" />
              )}
              <span className="truncate font-mono text-[11px]">{config.url}</span>
            </div>
          </div>
        ) : (
          <div className="flex-1" />
        )}

        <div className="flex items-center space-x-2 opacity-70 shrink-0">
          <MoreHorizontal className="w-4 h-4 cursor-pointer hover:opacity-100" />
        </div>
      </div>

      {/* Content */}
      <div className="relative w-full overflow-hidden flex-1 p-0 m-0 leading-none">{children}</div>
    </div>
  );
};
