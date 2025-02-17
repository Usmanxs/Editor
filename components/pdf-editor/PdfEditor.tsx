import PdfCanvas from '@/components/pdf-editor/PdfCanvas';
import PdfSidebar from '@/components/pdf-editor/PdfSidebar';
import PdfToolbar from '@/components/pdf-editor/PdfToolbar';
import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

const PdfEditor: React.FC = () => {
  const [pdfDoc, setPdfDoc] = useState<PDFDocument | null>(null);
  const [currentTool, setCurrentTool] = useState<string>('');
  const [scale, setScale] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [fileName, setFileName] = useState<string>('');

  const handleTextUpdate = (index: number, newText: string) => {
    console.log(`Text at index ${index} updated to: ${newText}`);
  };

  const handleSave = async () => {
    // Implement save functionality
  };

  const handleDownload = async () => {
    // Implement download functionality
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <PdfSidebar
          pdfDoc={pdfDoc}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col">
          <PdfToolbar
            pdfDoc={pdfDoc}
            currentPage={currentPage}
            totalPages={totalPages}
            scale={scale}
            setScale={setScale}
            onSave={handleSave}
            onDownload={handleDownload}
            fileName={fileName}
            currentTool={currentTool}
            setCurrentTool={setCurrentTool}
          />
          <div className="flex-1 overflow-auto bg-gray-100 flex items-center justify-center">
            <PdfCanvas
              pdfDoc={pdfDoc}
              currentPage={currentPage}
              scale={scale}
              currentTool={currentTool}
              onTextUpdate={handleTextUpdate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfEditor;
