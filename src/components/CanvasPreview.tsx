import React, { useState, useRef } from 'react';
import type { MockupConfig } from '../types';
import { GRADIENT_PRESETS } from '../constants/presets';
import { BrowserMockup } from './BrowserMockup';
import { Upload, Image as ImageIcon, Sparkles } from 'lucide-react';

interface CanvasPreviewProps {
  config: MockupConfig;
  exportRef: React.RefObject<HTMLDivElement | null>;
  onImageChange: (imageSrc: string) => void;
  onSelectSampleImage: () => void;
}

export const CanvasPreview: React.FC<CanvasPreviewProps> = ({
  config,
  exportRef,
  onImageChange,
  onSelectSampleImage,
}) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Background CSS calculation
  const getBackgroundStyle = (): React.CSSProperties => {
    if (config.backgroundType === 'transparent') {
      return {
        background: 'transparent',
        backgroundColor: 'transparent',
        backgroundImage: 'none',
      };
    }

    if (config.backgroundType === 'solid') {
      return { backgroundColor: config.solidColor };
    }

    // Gradient Preset
    const preset = GRADIENT_PRESETS.find((g) => g.id === config.gradientPreset);
    return { background: preset?.css || GRADIENT_PRESETS[0].css };
  };

  // Aspect ratio class calculation
  const getAspectRatioClass = () => {
    switch (config.aspectRatio) {
      case '16:9':
        return 'aspect-video';
      case '4:3':
        return 'aspect-[4/3]';
      case '1:1':
        return 'aspect-square';
      case '9:16':
        return 'aspect-[9/16]';
      case '4:5':
        return 'aspect-[4/5]';
      case '21:9':
        return 'aspect-[21/9]';
      case 'auto':
      default:
        return 'min-h-[400px] h-auto';
    }
  };

  // Drag and Drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            onImageChange(event.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onImageChange(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4 lg:p-8 overflow-auto select-none">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept="image/*"
        className="hidden"
      />

      {/* Outer Wrapper for Checkerboard Preview */}
      <div
        className={`relative w-full max-w-5xl transition-all duration-300 rounded-2xl ${
          config.backgroundType === 'transparent'
            ? 'bg-[radial-gradient(#374151_1px,transparent_1px),radial-gradient(#374151_1px,#111827_1px)] [background-size:20px_20px] [background-position:0_0,10px_10px] border border-white/10'
            : ''
        }`}
      >
        {/* Main Export Node Area */}
        <div
          ref={exportRef}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative w-full transition-all duration-300 flex items-center justify-center rounded-2xl overflow-hidden ${
            config.backgroundType === 'transparent' ? '' : 'shadow-2xl'
          } ${getAspectRatioClass()}`}
          style={{
            ...getBackgroundStyle(),
            padding: `${config.paddingY}px ${config.paddingX}px`,
          }}
        >
        {/* Drag & Drop Highlight Overlay */}
        {isDraggingOver && (
          <div className="absolute inset-0 bg-indigo-600/40 backdrop-blur-sm z-30 flex flex-col items-center justify-center border-4 border-dashed border-white rounded-2xl text-white animate-pulse">
            <Upload className="w-16 h-16 mb-2" />
            <p className="text-xl font-bold">Drop Image to Upload</p>
          </div>
        )}

        {/* Browser Mockup Frame */}
        {config.imageSrc ? (
          <BrowserMockup config={config} imageSrc={config.imageSrc} />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 text-white space-y-4">
            <div className="p-4 rounded-full bg-white/10 border border-white/15">
              <ImageIcon className="w-10 h-10 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Upload your screenshot or image</h3>
              <p className="text-xs text-gray-400 mt-1 max-w-sm">
                Drag and drop your screenshot anywhere here, or select an image file to generate your browser mockup.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Screenshot</span>
              </button>

              <button
                type="button"
                onClick={onSelectSampleImage}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs flex items-center gap-2 border border-white/10 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Try Sample Image</span>
              </button>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};
