import React from 'react';
import type { WindowControlsStyle } from '../../types';
import { Minus, Square, X } from 'lucide-react';

interface WindowControlsProps {
  style: WindowControlsStyle;
  isDark: boolean;
}

export const WindowControls: React.FC<WindowControlsProps> = ({ style, isDark }) => {
  if (style === 'hidden') return null;

  if (style === 'mac') {
    return (
      <div className="flex items-center space-x-2 shrink-0 select-none">
        <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] hover:opacity-80 transition-opacity" />
        <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] hover:opacity-80 transition-opacity" />
        <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] hover:opacity-80 transition-opacity" />
      </div>
    );
  }

  if (style === 'windows') {
    return (
      <div className="flex items-center space-x-3 shrink-0 select-none text-xs">
        <button
          type="button"
          aria-label="Minimize window"
          className={`p-1 rounded hover:bg-white/10 transition-colors ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          <Minus className="w-3 h-3" />
        </button>
        <button
          type="button"
          aria-label="Maximize window"
          className={`p-1 rounded hover:bg-white/10 transition-colors ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          <Square className="w-2.5 h-2.5" />
        </button>
        <button
          type="button"
          aria-label="Close window"
          className="p-1 rounded hover:bg-red-500 hover:text-white transition-colors text-gray-400"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    );
  }

  // minimal style
  return (
    <div className="flex items-center space-x-1.5 shrink-0 select-none opacity-60">
      <div className={`w-2.5 h-2.5 rounded-full ${isDark ? 'bg-gray-400' : 'bg-gray-500'}`} />
      <div className={`w-2.5 h-2.5 rounded-full ${isDark ? 'bg-gray-400' : 'bg-gray-500'}`} />
      <div className={`w-2.5 h-2.5 rounded-full ${isDark ? 'bg-gray-400' : 'bg-gray-500'}`} />
    </div>
  );
};
