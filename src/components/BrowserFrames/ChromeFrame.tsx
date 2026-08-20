import React from 'react';
import type { MockupConfig } from '../../types';
import { WindowControls } from './WindowControls';
import {
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Lock,
  Plus,
  MoreVertical,
  Globe,
  X,
  Puzzle,
  User,
} from 'lucide-react';
import { getContrastColor } from '../../utils/colorUtils';

interface FrameProps {
  config: MockupConfig;
  children: React.ReactNode;
}

export const ChromeFrame: React.FC<FrameProps> = ({ config, children }) => {
  const isCustom = config.themeMode === 'custom';
  const customBg = config.customTabColor || '#2563eb';
  const isDark = config.themeMode === 'dark' || (isCustom && getContrastColor(customBg) === 'light');

  // Background for tab strip (top area where inactive tab strip resides)
  const tabStripClass = isCustom
    ? ''
    : isDark
    ? 'bg-[#1e1f22] text-gray-300'
    : 'bg-[#dee1e6] text-gray-700';

  // Toolbar & Active Tab matching background
  const mainBarClass = isCustom
    ? isDark
      ? 'bg-black/25 text-gray-100 border-black/40'
      : 'bg-white/90 text-gray-900 border-black/10 shadow-xs'
    : isDark
    ? 'bg-[#2b2d30] text-gray-200 border-black/30'
    : 'bg-white text-gray-800 border-black/10';

  const activeTabClass = isCustom
    ? isDark
      ? 'bg-black/25 text-white shadow-xs'
      : 'bg-white/90 text-gray-900 shadow-xs'
    : isDark
    ? 'bg-[#2b2d30] text-gray-200'
    : 'bg-white text-gray-800';

  const urlBarClass = isCustom
    ? isDark
      ? 'bg-black/30 text-gray-200 border border-white/10'
      : 'bg-black/5 text-gray-800 border border-black/10'
    : isDark
    ? 'bg-[#1e1f22] text-gray-200 border border-white/5'
    : 'bg-[#f1f3f4] text-gray-800 hover:bg-[#e8eaed]';

  return (
    <div className="w-full overflow-hidden flex flex-col transition-colors duration-200 bg-transparent">
      {/* Chrome Top Tab Strip */}
      <div
        className={`pt-2.5 px-3 flex items-end gap-2 select-none ${tabStripClass}`}
        style={isCustom ? { backgroundColor: customBg } : undefined}
      >
        {/* Left Window Controls */}
        <div className="flex items-center space-x-2 shrink-0 pb-2 mr-2">
          {config.showControls && (
            <WindowControls style={config.controlsStyle} isDark={isDark} />
          )}
        </div>

        {/* Active Tab */}
        <div className="flex-1 max-w-xs sm:max-w-sm flex items-center">
          <div
            className={`h-9 px-3.5 py-1.5 rounded-t-xl flex items-center justify-between text-xs font-medium w-full transition-all relative ${activeTabClass}`}
          >
            <div className="flex items-center space-x-2 truncate min-w-0">
              <Globe className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span className="truncate text-[12px] font-sans">{config.title || 'New Tab'}</span>
            </div>
            <button
              type="button"
              aria-label="Close tab"
              className="ml-2 p-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/15 text-gray-400 hover:text-gray-200 transition-colors cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          </div>

          {/* New Tab Button */}
          <button
            type="button"
            aria-label="New tab"
            className="p-1.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 ml-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex-1" />
      </div>

      {/* Chrome Navigation & Toolbar */}
      <div
        className={`px-3 py-2 flex items-center justify-between gap-2 border-b select-none ${mainBarClass}`}
        style={isCustom ? { backgroundColor: customBg } : undefined}
      >
        {/* Nav Buttons (Back, Forward, Reload) */}
        {config.showNavButtons && (
          <div className="flex items-center space-x-1.5 text-gray-500 dark:text-gray-400 shrink-0">
            <ChevronLeft className="w-4 h-4 cursor-pointer hover:text-gray-800 dark:hover:text-gray-100 transition-colors" />
            <ChevronRight className="w-4 h-4 opacity-40" />
            <RotateCw className="w-3.5 h-3.5 cursor-pointer hover:text-gray-800 dark:hover:text-gray-100 transition-colors ml-0.5" />
          </div>
        )}

        {/* Address Bar */}
        {config.showUrlBar ? (
          <div
            className={`flex-1 mx-2 h-7.5 rounded-full px-3.5 flex items-center justify-between text-xs transition-all ${urlBarClass}`}
          >
            <div className="flex items-center space-x-2 truncate min-w-0">
              {config.showLockIcon && (
                <Lock className="w-3 h-3 text-emerald-500 shrink-0" />
              )}
              <span className="truncate font-mono text-[11px] tracking-tight">{config.url}</span>
            </div>
          </div>
        ) : (
          <div className="flex-1" />
        )}

        {/* Right Extensions & Profile Icons */}
        <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 shrink-0">
          <Puzzle className="w-3.5 h-3.5 cursor-pointer hover:text-gray-800 dark:hover:text-gray-100 transition-colors hidden sm:block opacity-70" />
          <div className="w-5 h-5 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center hidden sm:flex">
            <User className="w-3 h-3 text-indigo-400" />
          </div>
          <MoreVertical className="w-4 h-4 cursor-pointer hover:text-gray-800 dark:hover:text-gray-100 transition-colors" />
        </div>
      </div>

      {/* Main Page Content */}
      <div className="relative w-full overflow-hidden flex-1 p-0 m-0 leading-none">{children}</div>
    </div>
  );
};
