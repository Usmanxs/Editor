'use client';
import { useState, useRef } from 'react';
import PdfToolbar from '@/components/pdf-editor/PdfToolbar';
import PdfCanvas from '@/components/pdf-editor/PdfCanvas';
import PdfSidebar from '@/components/pdf-editor/PdfSidebar';
import { PDFDocument } from 'pdf-lib';
import { Button } from '@/components/ui/button';
import { Upload, Plus } from 'lucide-react';

export default function PdfEditor() {
  const [pdfDoc, setPdfDoc] = useState<PDFDocument | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(1);
  const [fileName, setFileName] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentTool, setCurrentTool] = useState('');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Reset states
    setError('');
    setLoading(true);

    try {
      // Validate file type
      if (file.type !== 'application/pdf') {
        throw new Error('Please upload a PDF file');
      }

      // Validate file size (e.g., max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('File size should be less than 10MB');
      }

      // Read file as ArrayBuffer
      const arrayBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as ArrayBuffer);
        reader.onerror = (e) => reject(new Error('Error reading file'));
        reader.readAsArrayBuffer(file);
      });

      // Load PDF using pdf-lib
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      setPdfDoc(pdfDoc);
      setTotalPages(pdfDoc.getPageCount());
      setCurrentPage(1);
      setScale(1);
    } catch (err) {
      console.error('Error loading PDF:', err);
      setError(err instanceof Error ? err.message : 'Failed to load PDF');
      setPdfDoc(null);
      setFileName('');
    } finally {
      setLoading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const createNewPdf = async () => {
    setError('');
    try {
      const newPdfDoc = await PDFDocument.create();
      const page = newPdfDoc.addPage([612, 792]); // US Letter size
      setPdfDoc(newPdfDoc);
      setTotalPages(1);
      setCurrentPage(1);
      setFileName('new-document.pdf');
    } catch (err) {
      console.error('Error creating new PDF:', err);
      setError('Failed to create new PDF');
    }
  };

  const downloadPdf = async () => {
    if (!pdfDoc) return;
    
    try {
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName || 'document.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading PDF:', err);
      setError('Failed to download PDF');
    }
  };

  const savePdf = async () => {
    if (!pdfDoc) return;
    
    try {
      const pdfBytes = await pdfDoc.save();
      const response = await fetch('/api/pdf/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName: fileName || 'document.pdf',
          content: Array.from(pdfBytes), // Convert Uint8Array to regular array for JSON
        }),
      });

      if (!response.ok) throw new Error('Failed to save PDF');
      setError('');
    } catch (err) {
      console.error('Error saving PDF:', err);
      setError('Failed to save PDF');
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="border-b p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">PDF Editor</h1>
        <div className="flex gap-4">
          <Button onClick={createNewPdf} variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            New PDF
          </Button>
          <Button 
            onClick={handleUploadClick} 
            variant="outline" 
            disabled={loading}
          >
            <Upload className="w-4 h-4 mr-2" />
            {loading ? 'Loading...' : 'Upload PDF'}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handleFileUpload}
            disabled={loading}
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex">
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
            onSave={savePdf}
            onDownload={downloadPdf}
            fileName={fileName}
            currentTool={currentTool}
            setCurrentTool={setCurrentTool}
          />
          <PdfCanvas
            pdfDoc={pdfDoc}
            currentPage={currentPage}
            scale={scale}
            currentTool={currentTool}
          />
        </div>
      </div>
    </div>
  );
}
