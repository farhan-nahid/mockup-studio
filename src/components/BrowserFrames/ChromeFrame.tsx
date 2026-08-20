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
} from 'lucide-react';

interface FrameProps {
  config: MockupConfig;
  children: React.ReactNode;
}

export const ChromeFrame: React.FC<FrameProps> = ({ config, children }) => {
  const isDark = config.themeMode === 'dark';

  return (
    <div
      className={`w-full overflow-hidden flex flex-col transition-colors duration-200 bg-transparent ${
        isDark ? 'text-gray-200' : 'text-gray-800'
      }`}
    >
      {/* Top Tab Bar */}
      <div className="pt-2 px-3 flex items-end justify-between gap-2 select-none">
        <div className="flex items-center space-x-3 shrink-0 mb-1">
          {config.showControls && (
            <WindowControls style={config.controlsStyle} isDark={isDark} />
          )}
        </div>

        {/* Tab Element */}
        <div className="flex-1 max-w-sm flex items-center">
          <div
            className={`h-9 px-3 py-1.5 rounded-t-lg flex items-center justify-between text-xs font-medium w-full transition-colors ${
              isDark
                ? 'bg-[#292a2d] text-gray-200 border-t border-x border-white/5'
                : 'bg-white text-gray-800 shadow-xs'
            }`}
          >
            <div className="flex items-center space-x-2 truncate min-w-0">
              <Globe className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span className="truncate">{config.title || 'New Tab'}</span>
            </div>
            <span className="text-xs opacity-50 hover:opacity-100 ml-2 cursor-pointer">×</span>
          </div>
          <button
            type="button"
            aria-label="New tab"
            className="p-1 rounded-full hover:bg-black/10 text-gray-400 ml-1"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="w-12 shrink-0"></div>
      </div>

      {/* URL & Actions Bar */}
      <div
        className={`px-3 py-1.5 flex items-center justify-between gap-2 border-b select-none ${
          isDark ? 'bg-[#292a2d] border-black/40' : 'bg-white border-black/10'
        }`}
      >
        {config.showNavButtons && (
          <div className="flex items-center space-x-1 opacity-70 shrink-0">
            <ChevronLeft className="w-4 h-4 cursor-pointer hover:opacity-100" />
            <ChevronRight className="w-4 h-4 opacity-40" />
            <RotateCw className="w-3.5 h-3.5 cursor-pointer hover:opacity-100 ml-1" />
          </div>
        )}

        {/* Address Bar */}
        {config.showUrlBar ? (
          <div
            className={`flex-1 mx-2 h-7 rounded-full px-3 flex items-center justify-between text-xs transition-colors ${
              isDark
                ? 'bg-[#202124] text-gray-300 border border-white/5'
                : 'bg-[#f1f3f4] text-gray-700'
            }`}
          >
            <div className="flex items-center space-x-2 truncate min-w-0">
              {config.showLockIcon && (
                <Lock className="w-3 h-3 text-emerald-500 shrink-0" />
              )}
              <span className="truncate font-mono text-[11px]">{config.url}</span>
            </div>
          </div>
        ) : (
          <div className="flex-1" />
        )}

        <div className="flex items-center space-x-2 opacity-70 shrink-0">
          <MoreVertical className="w-4 h-4 cursor-pointer hover:opacity-100" />
        </div>
      </div>

      {/* Content */}
      <div className="relative w-full overflow-hidden flex-1 p-0 m-0 leading-none">{children}</div>
    </div>
  );
};
