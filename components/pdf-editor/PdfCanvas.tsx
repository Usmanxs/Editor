import React, { useEffect, useRef, useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { PDFJS } from '@/lib/pdf-setup';

interface TextLayer {
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  width: number;
  height: number;
  transform: number[];
  isEditing?: boolean;
}

interface PdfCanvasProps {
  pdfDoc: PDFDocument | null;
  currentPage: number;
  scale: number;
  currentTool: string;
  onTextUpdate?: (index: number, newText: string) => void;
}

const PdfCanvas: React.FC<PdfCanvasProps> = ({
  pdfDoc,
  currentPage,
  scale,
  currentTool,
  onTextUpdate,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [textLayers, setTextLayers] = useState<TextLayer[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedText, setSelectedText] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<number | null>(null);

  useEffect(() => {
    const renderPage = async () => {
      if (!pdfDoc || !canvasRef.current || !containerRef.current) return;

      setLoading(true);
      try {
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);

        const loadingTask = PDFJS.getDocument(url);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(currentPage);
        
        // Calculate scale to fit the page width to container
        const containerWidth = containerRef.current.clientWidth;
        const pageWidth = page.getViewport({ scale: 1 }).width;
        const baseScale = (containerWidth - 48) / pageWidth; // 48px for padding
        const finalScale = baseScale * scale;

        const viewport = page.getViewport({ scale: finalScale });

        // Set up canvas
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (!context) return;

        canvas.height = viewport.height;
        canvas.width = viewport.width;
        containerRef.current.style.height = `${viewport.height}px`;
        containerRef.current.style.width = `${viewport.width}px`;

        // Render PDF page
        await page.render({
          canvasContext: context,
          viewport,
        }).promise;

        // Extract text content
        const textContent = await page.getTextContent();
        const newTextLayers: TextLayer[] = [];

        textContent.items.forEach((item: any) => {
          // Get the transform values
          const transform = item.transform;
          
          // Calculate the position using the transform matrix
          const x = transform[4];
          const y = transform[5];
          
          // Calculate font size from transform matrix
          const fontSize = Math.sqrt(
            (transform[0] * transform[0]) +
            (transform[1] * transform[1])
          );

          // Convert PDF coordinates to viewport coordinates
          const [viewportX, viewportY] = viewport.convertToViewportPoint(x, y);

          // Calculate text dimensions
          context.font = `${fontSize * finalScale}px ${item.fontName || 'Arial'}`;
          const metrics = context.measureText(item.str);
          
          newTextLayers.push({
            text: item.str,
            x: viewportX,
            y: viewport.height - viewportY, // Flip Y coordinate
            fontSize: fontSize * finalScale,
            fontFamily: item.fontName || 'Arial',
            width: metrics.width,
            height: fontSize * finalScale * 1.2, // Approximate line height
            transform: item.transform,
          });
        });

        setTextLayers(newTextLayers);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error rendering PDF:', error);
      } finally {
        setLoading(false);
      }
    };

    renderPage();
  }, [pdfDoc, currentPage, scale]);

  return (
    <div className="flex-1 overflow-auto bg-gray-100 flex items-center justify-center p-6">
      {loading && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      )}
      <div ref={containerRef} className="relative bg-white shadow-lg">
        <canvas ref={canvasRef} className="absolute top-0 left-0" />
        <div 
          className="absolute top-0 left-0 w-full h-full"
          style={{ transform: 'scale(1, -1) translateY(-100%)' }}
        >
          {textLayers.map((layer, index) => (
            <div
              key={index}
              className={`absolute select-none transition-colors duration-200 
                ${currentTool === 'text' ? 'cursor-text pointer-events-auto' : ''}
                ${selectedText === index ? 'bg-yellow-200/70' : ''}
                ${editingText === index ? 'ring-2 ring-blue-500' : ''}
                hover:bg-yellow-100/50
              `}
              style={{
                left: `${layer.x}px`,
                top: `${layer.y}px`,
                fontSize: `${layer.fontSize}px`,
                fontFamily: layer.fontFamily,
                width: `${layer.width}px`,
                height: `${layer.height}px`,
                lineHeight: `${layer.height}px`,
                position: 'absolute',
                whiteSpace: 'pre',
                userSelect: 'none',
                cursor: currentTool === 'text' ? 'text' : 'default',
                transform: 'scale(1, -1)', // Flip text back to normal
              }}
              onClick={() => currentTool === 'text' && setSelectedText(index)}
            >
              {layer.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PdfCanvas;
