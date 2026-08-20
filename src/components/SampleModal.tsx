import React from 'react';
import { SAMPLE_IMAGES } from '../constants/presets';
import { X, Sparkles } from 'lucide-react';

interface SampleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}

export const SampleModal: React.FC<SampleModalProps> = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-[#161822] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 px-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white">Choose Sample Screenshot</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Grid of sample screenshots */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto">
          {SAMPLE_IMAGES.map((sample) => (
            <button
              key={sample.id}
              type="button"
              onClick={() => {
                onSelect(sample.url);
                onClose();
              }}
              className="group text-left border border-white/10 rounded-xl overflow-hidden bg-white/5 hover:bg-white/10 hover:border-indigo-500/50 transition-all cursor-pointer shadow-lg"
            >
              <div className="h-36 overflow-hidden relative bg-black/40">
                <img
                  src={sample.url}
                  alt={sample.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-semibold bg-black/70 text-indigo-300 backdrop-blur-md">
                  {sample.category}
                </span>
              </div>
              <div className="p-3">
                <h3 className="text-xs font-semibold text-white group-hover:text-indigo-400 transition-colors">
                  {sample.title}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
