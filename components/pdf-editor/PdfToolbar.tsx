import React from 'react';
import { Button } from '@/components/ui/button';
import {
  ZoomIn,
  ZoomOut,
  Save,
  Download,
  Type,
  Image as ImageIcon,
  Pencil,
  Square,
  Circle,
} from 'lucide-react';
import { PDFDocument } from 'pdf-lib';

interface PdfToolbarProps {
  pdfDoc: PDFDocument | null;
  currentPage: number;
  totalPages: number;
  scale: number;
  setScale: (scale: number) => void;
  onSave: () => void;
  onDownload: () => void;
  fileName: string;
  currentTool: string;
  setCurrentTool: (tool: string) => void;
}

const PdfToolbar: React.FC<PdfToolbarProps> = ({
  pdfDoc,
  currentPage,
  totalPages,
  scale,
  setScale,
  onSave,
  onDownload,
  fileName,
  currentTool,
  setCurrentTool,
}) => {
  return (
    <div className="border-b p-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setScale(scale - 0.1)}
          disabled={scale <= 0.5}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <span className="w-20 text-center">
          {Math.round(scale * 100)}%
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setScale(scale + 0.1)}
          disabled={scale >= 2}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button 
          variant={currentTool === 'text' ? 'default' : 'outline'} 
          size="icon"
          onClick={() => setCurrentTool(currentTool === 'text' ? '' : 'text')}
        >
          <Type className="h-4 w-4" />
        </Button>
        <Button 
          variant={currentTool === 'image' ? 'default' : 'outline'} 
          size="icon"
          onClick={() => setCurrentTool(currentTool === 'image' ? '' : 'image')}
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
        <Button 
          variant={currentTool === 'draw' ? 'default' : 'outline'} 
          size="icon"
          onClick={() => setCurrentTool(currentTool === 'draw' ? '' : 'draw')}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button 
          variant={currentTool === 'rectangle' ? 'default' : 'outline'} 
          size="icon"
          onClick={() => setCurrentTool(currentTool === 'rectangle' ? '' : 'rectangle')}
        >
          <Square className="h-4 w-4" />
        </Button>
        <Button 
          variant={currentTool === 'circle' ? 'default' : 'outline'} 
          size="icon"
          onClick={() => setCurrentTool(currentTool === 'circle' ? '' : 'circle')}
        >
          <Circle className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button 
          variant="outline" 
          onClick={onSave}
          disabled={!pdfDoc}
        >
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
        <Button 
          variant="outline" 
          onClick={onDownload}
          disabled={!pdfDoc}
        >
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      </div>
    </div>
  );
};

export default PdfToolbar;
