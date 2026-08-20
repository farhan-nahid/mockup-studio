import { toBlob, toJpeg, toPng } from 'html-to-image';
import confetti from 'canvas-confetti';
import type { ExportFormat } from '../types';

export interface ExportOptions {
  node: HTMLElement;
  format: ExportFormat;
  scale: 1 | 2 | 3 | 4;
  fileName?: string;
}

export const exportMockupImage = async ({
  node,
  format,
  scale,
  fileName = 'browser-mockup',
}: ExportOptions): Promise<void> => {
  try {
    const pixelRatio = scale;

    let dataUrl: string;

    const filter = (domNode: HTMLElement) => {
      // Ignore UI control elements tagged with 'export-ignore' if any
      return !domNode.classList?.contains('export-ignore');
    };

    const options = {
      pixelRatio,
      cacheBust: true,
      quality: 1.0,
      filter: filter as any,
      style: {
        transform: 'none',
      },
    };

    if (format === 'jpeg') {
      dataUrl = await toJpeg(node, { ...options, quality: 1.0 });
    } else if (format === 'webp') {
      const pngUrl = await toPng(node, options);
      dataUrl = await convertToWebP(pngUrl);
    } else {
      dataUrl = await toPng(node, options);
    }

    // Trigger Download
    const link = document.createElement('a');
    link.download = `${fileName}-${Date.now()}.${format}`;
    link.href = dataUrl;
    link.click();

    // Trigger celebratory confetti effect
    fireConfetti();
  } catch (error) {
    console.error('Failed to export mockup image:', error);
    throw error;
  }
};

export const copyMockupToClipboard = async (node: HTMLElement, scale: 1 | 2 | 3 | 4 = 2): Promise<boolean> => {
  try {
    const blob = await toBlob(node, {
      pixelRatio: scale,
      cacheBust: true,
      quality: 1.0,
    });

    if (!blob) {
      throw new Error('Failed to generate image blob');
    }

    if (navigator.clipboard && window.ClipboardItem) {
      const item = new ClipboardItem({ 'image/png': blob });
      await navigator.clipboard.write([item]);
      fireConfetti();
      return true;
    } else {
      throw new Error('Clipboard API not supported in this environment');
    }
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};

const convertToWebP = (pngDataUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject('No canvas context');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/webp', 1.0));
    };
    img.onerror = reject;
    img.src = pngDataUrl;
  });
};

const fireConfetti = () => {
  try {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#6366f1', '#a855f7', '#ec4899', '#3b82f6', '#10b981'],
    });
  } catch {
    // Ignore if confetti fails
  }
};
