import React from "react";
import type { MockupConfig } from "../types";
import { ArcFrame } from "./BrowserFrames/ArcFrame";
import { BraveFrame } from "./BrowserFrames/BraveFrame";
import { ChromeFrame } from "./BrowserFrames/ChromeFrame";
import { GlassFrame } from "./BrowserFrames/GlassFrame";
import { SafariFrame } from "./BrowserFrames/SafariFrame";
import { WindowsEdgeFrame } from "./BrowserFrames/WindowsEdgeFrame";

interface MockupProps {
  config: MockupConfig;
  imageSrc: string | null;
  onDropImage?: (file: File) => void;
}

export const BrowserMockup: React.FC<MockupProps> = ({ config, imageSrc }) => {
  // Shadow CSS mapping
  const getShadowClass = () => {
    switch (config.shadowStyle) {
      case "soft":
        return "shadow-lg shadow-black/20";
      case "medium":
        return "shadow-2xl shadow-black/40";
      case "heavy":
        return "shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)]";
      case "glow":
        return "shadow-[0_0_50px_rgba(99,102,241,0.35)]";
      case "floating":
        return "shadow-[0_35px_80px_-15px_rgba(0,0,0,0.8)] translate-y-[-2px]";
      case "none":
      default:
        return "shadow-none";
    }
  };

  const frameContent = (
    <div className="relative w-full overflow-hidden bg-transparent flex items-center justify-center p-0 m-0">
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={config.title || "Browser Mockup"}
          className="w-full h-auto block transition-transform duration-200 m-0 p-0"
          style={{
            objectFit: config.imageFit,
            objectPosition: config.imagePosition,
            transform: `scale(${config.imageScale / 100})`,
            borderRadius: config.imageRadius ? `${config.imageRadius}px` : "0px",
          }}
        />
      ) : (
        <div className="p-12 text-center text-gray-400 font-sans min-h-[240px] flex flex-col items-center justify-center bg-black/20 w-full">
          <p className="text-sm font-medium">No Image Uploaded</p>
          <p className="text-xs text-gray-500 mt-1">Upload or drag an image here</p>
        </div>
      )}

      {config.showWatermark && config.watermarkText && (
        <div className="absolute bottom-3 right-4 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-white/80 text-[10px] font-mono select-none">
          {config.watermarkText}
        </div>
      )}
    </div>
  );

  const renderFrame = () => {
    switch (config.browserType) {
      case "chrome":
        return <ChromeFrame config={config}>{frameContent}</ChromeFrame>;
      case "brave":
        return <BraveFrame config={config}>{frameContent}</BraveFrame>;
      case "arc":
        return <ArcFrame config={config}>{frameContent}</ArcFrame>;
      case "glass":
        return <GlassFrame config={config}>{frameContent}</GlassFrame>;
      case "edge":
        return <WindowsEdgeFrame config={config}>{frameContent}</WindowsEdgeFrame>;
      case "safari":
      default:
        return <SafariFrame config={config}>{frameContent}</SafariFrame>;
    }
  };

  return (
    <div
      className={`w-full transition-all duration-200 ${getShadowClass()}`}
      style={{
        borderRadius: `${config.windowRadius}px`,
        borderWidth: `${config.borderWidth}px`,
        borderColor: config.borderColor,
      }}
    >
      {renderFrame()}
    </div>
  );
};
