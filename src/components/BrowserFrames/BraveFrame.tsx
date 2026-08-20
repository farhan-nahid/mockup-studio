import React from 'react';
import type { MockupConfig } from '../../types';
import { WindowControls } from './WindowControls';
import {
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Lock,
  ShieldAlert,
  Flame,
  Plus,
} from 'lucide-react';

interface FrameProps {
  config: MockupConfig;
  children: React.ReactNode;
}

export const BraveFrame: React.FC<FrameProps> = ({ config, children }) => {
  const isDark = config.themeMode === 'dark';

  return (
    <div
      className={`w-full overflow-hidden flex flex-col transition-colors duration-200 ${
        isDark ? 'bg-[#191a21] text-gray-200' : 'bg-[#e9ebef] text-gray-800'
      }`}
    >
      {/* Top Header */}
      <div
        className={`px-3 py-2 flex items-center justify-between gap-3 border-b select-none ${
          isDark ? 'bg-[#22242f] border-orange-500/20' : 'bg-white border-black/10'
        }`}
      >
        <div className="flex items-center space-x-3 shrink-0">
          {config.showControls && (
            <WindowControls style={config.controlsStyle} isDark={isDark} />
          )}
          {config.showNavButtons && (
            <div className="flex items-center space-x-1 opacity-70">
              <ChevronLeft className="w-4 h-4" />
              <ChevronRight className="w-4 h-4 opacity-40" />
              <RotateCw className="w-3.5 h-3.5 opacity-60 ml-1" />
            </div>
          )}
        </div>

        {/* Center: Address bar + Brave Shield */}
        {config.showUrlBar ? (
          <div
            className={`flex-1 max-w-xl mx-auto h-8 rounded-lg px-3 flex items-center justify-between text-xs transition-colors border ${
              isDark
                ? 'bg-[#191a21] text-gray-200 border-orange-500/30 shadow-xs'
                : 'bg-[#f4f5f7] text-gray-800 border-black/10'
            }`}
          >
            <div className="flex items-center space-x-2 truncate min-w-0">
              <Flame className="w-3.5 h-3.5 text-orange-500 shrink-0 fill-orange-500" />
              {config.showLockIcon && (
                <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
              )}
              <span className="truncate font-mono text-[11px]">{config.url}</span>
            </div>
            <div className="flex items-center space-x-1 shrink-0">
              <ShieldAlert className="w-3.5 h-3.5 text-orange-500 hover:scale-110 cursor-pointer transition-transform" />
            </div>
          </div>
        ) : (
          <div className="text-xs font-semibold text-orange-500 flex items-center space-x-1.5">
            <Flame className="w-3.5 h-3.5 fill-orange-500" />
            <span>{config.title}</span>
          </div>
        )}

        <div className="flex items-center space-x-2 shrink-0 opacity-70">
          <Plus className="w-4 h-4 cursor-pointer hover:opacity-100" />
        </div>
      </div>

      {/* Content */}
      <div className="relative w-full overflow-hidden flex-1">{children}</div>
    </div>
  );
};
