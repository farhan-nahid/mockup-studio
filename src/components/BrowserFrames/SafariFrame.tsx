import React from 'react';
import type { MockupConfig } from '../../types';
import { WindowControls } from './WindowControls';
import { ChevronLeft, ChevronRight, RotateCw, Lock, Share2, Plus, Sidebar } from 'lucide-react';

interface FrameProps {
  config: MockupConfig;
  children: React.ReactNode;
}

export const SafariFrame: React.FC<FrameProps> = ({ config, children }) => {
  const isDark = config.themeMode === 'dark';

  return (
    <div
      className={`w-full overflow-hidden flex flex-col transition-colors duration-200 bg-transparent ${
        isDark ? 'text-gray-200' : 'text-gray-800'
      }`}
    >
      {/* Top Header */}
      <div
        className={`px-4 py-2.5 flex items-center justify-between gap-3 border-b select-none ${
          isDark ? 'bg-[#282830] border-black/30' : 'bg-[#e4e4e9] border-black/10'
        }`}
      >
        {/* Left Section: Window Controls & Sidebar toggle */}
        <div className="flex items-center space-x-3 shrink-0">
          {config.showControls && (
            <WindowControls style={config.controlsStyle} isDark={isDark} />
          )}
          <Sidebar className="w-4 h-4 opacity-40 hover:opacity-100 transition-opacity cursor-pointer hidden sm:block" />
          {config.showNavButtons && (
            <div className="flex items-center space-x-1 opacity-60">
              <ChevronLeft className="w-4 h-4" />
              <ChevronRight className="w-4 h-4 opacity-40" />
            </div>
          )}
        </div>

        {/* Center Section: Address Bar */}
        {config.showUrlBar ? (
          <div
            className={`flex-1 max-w-xl mx-auto h-8 rounded-lg px-3 flex items-center justify-between text-xs transition-all shadow-inner ${
              isDark
                ? 'bg-[#18181c] text-gray-300 border border-white/5'
                : 'bg-white text-gray-700 border border-black/5 shadow-xs'
            }`}
          >
            <div className="flex items-center space-x-2 truncate min-w-0">
              {config.showLockIcon && (
                <Lock className="w-3 h-3 text-emerald-500 shrink-0" />
              )}
              <span className="truncate font-mono tracking-tight">{config.url}</span>
            </div>
            <RotateCw className="w-3 h-3 opacity-40 shrink-0 hover:opacity-100 cursor-pointer" />
          </div>
        ) : (
          <div className="text-xs font-medium opacity-60 truncate max-w-sm text-center">
            {config.title}
          </div>
        )}

        {/* Right Section: Actions */}
        <div className="flex items-center space-x-2 shrink-0 opacity-60">
          <Share2 className="w-3.5 h-3.5 hover:opacity-100 cursor-pointer hidden sm:block" />
          <Plus className="w-3.5 h-3.5 hover:opacity-100 cursor-pointer" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative w-full overflow-hidden flex-1 p-0 m-0 leading-none">{children}</div>
    </div>
  );
};
