import React, { useState, useRef, useEffect } from 'react';
import type { MockupConfig } from './types';
import { DEFAULT_MOCKUP_CONFIG } from './constants/presets';
import { Header } from './components/Header';
import { CanvasPreview } from './components/CanvasPreview';
import { SidebarControls } from './components/SidebarControls';
import { SampleModal } from './components/SampleModal';
import { ExportModal } from './components/ExportModal';
import { exportMockupImage, copyMockupToClipboard } from './utils/exportImage';

export function App() {
  const [config, setConfig] = useState<MockupConfig>(DEFAULT_MOCKUP_CONFIG);
  const [isExporting, setIsExporting] = useState(false);
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const exportRef = useRef<HTMLDivElement | null>(null);
  const hiddenFileInputRef = useRef<HTMLInputElement | null>(null);

  // Update helper
  const handleChangeConfig = (newConfig: Partial<MockupConfig>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
  };

  // Clipboard Paste (Ctrl+V) listener
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (e.clipboardData && e.clipboardData.items) {
        const items = e.clipboardData.items;
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf('image') !== -1) {
            const blob = items[i].getAsFile();
            if (blob) {
              const reader = new FileReader();
              reader.onload = (event) => {
                if (event.target?.result) {
                  handleChangeConfig({ imageSrc: event.target.result as string });
                }
              };
              reader.readAsDataURL(blob);
            }
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  // Export handlers
  const handleExport = async () => {
    if (!exportRef.current) return;
    setIsExporting(true);
    try {
      await exportMockupImage({
        node: exportRef.current,
        format: config.exportFormat,
        scale: config.exportScale,
        fileName: config.title ? config.title.toLowerCase().replace(/[^a-z0-9]/g, '-') : 'browser-mockup',
      });
    } catch (error) {
      console.error('Export error:', error);
      alert('Could not export mockup image. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyClipboard = async () => {
    if (!exportRef.current) return;
    await copyMockupToClipboard(exportRef.current, config.exportScale);
  };

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          handleChangeConfig({ imageSrc: event.target.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-screen h-screen bg-[#090a0f] text-gray-100 flex flex-col font-sans overflow-hidden">
      {/* Hidden File Input for Header Upload Trigger */}
      <input
        type="file"
        ref={hiddenFileInputRef}
        onChange={handleUploadFile}
        accept="image/*"
        className="hidden"
      />

      {/* Top Navbar */}
      <Header
        config={config}
        onChangeConfig={handleChangeConfig}
        onUploadClick={() => hiddenFileInputRef.current?.click()}
        onResetClick={() => setConfig(DEFAULT_MOCKUP_CONFIG)}
        onSampleClick={() => setIsSampleModalOpen(true)}
        onExport={() => setIsExportModalOpen(true)}
        onCopyClipboard={handleCopyClipboard}
        isExporting={isExporting}
      />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Canvas Area */}
        <main className="flex-1 h-full overflow-hidden bg-gradient-to-b from-[#0b0c10] to-[#12141c]">
          <CanvasPreview
            config={config}
            exportRef={exportRef}
            onImageChange={(src) => handleChangeConfig({ imageSrc: src })}
            onSelectSampleImage={() => setIsSampleModalOpen(true)}
          />
        </main>

        {/* Sidebar Controls */}
        <SidebarControls config={config} onChangeConfig={handleChangeConfig} />
      </div>

      {/* Sample Screenshots Modal */}
      <SampleModal
        isOpen={isSampleModalOpen}
        onClose={() => setIsSampleModalOpen(false)}
        onSelect={(url) => handleChangeConfig({ imageSrc: url })}
      />

      {/* Size Selection & Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        config={config}
        onChangeConfig={handleChangeConfig}
        onConfirmDownload={handleExport}
        onCopyClipboard={handleCopyClipboard}
        isExporting={isExporting}
        canvasRef={exportRef}
      />
    </div>
  );
}

export default App;
