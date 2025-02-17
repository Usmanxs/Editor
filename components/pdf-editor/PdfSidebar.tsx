import React, { useEffect, useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { PDFJS } from '@/lib/pdf-setup';

interface PdfSidebarProps {
  pdfDoc: PDFDocument | null;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const PdfSidebar: React.FC<PdfSidebarProps> = ({
  pdfDoc,
  currentPage,
  setCurrentPage,
}) => {
  const [thumbnails, setThumbnails] = useState<string[]>([]);

  useEffect(() => {
    const generateThumbnails = async () => {
      if (!pdfDoc) {
        setThumbnails([]);
        return;
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      try {
        const loadingTask = PDFJS.getDocument(url);
        const pdf = await loadingTask.promise;
        const newThumbnails: string[] = [];

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 0.2 });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');

          canvas.height = viewport.height;
          canvas.width = viewport.width;

          await page.render({
            canvasContext: context!,
            viewport,
          }).promise;

          newThumbnails.push(canvas.toDataURL());
        }

        setThumbnails(newThumbnails);
      } catch (error) {
        console.error('Error generating thumbnails:', error);
      } finally {
        URL.revokeObjectURL(url);
      }
    };

    generateThumbnails();
  }, [pdfDoc]);

  return (
    <div className="w-64 border-r overflow-y-auto bg-white">
      {thumbnails.map((thumbnail, index) => (
        <div
          key={index}
          className={`p-2 cursor-pointer ${
            currentPage === index + 1 ? 'bg-blue-100' : ''
          }`}
          onClick={() => setCurrentPage(index + 1)}
        >
          <img
            src={thumbnail}
            alt={`Page ${index + 1}`}
            className="w-full border"
          />
          <div className="text-center text-sm mt-1">Page {index + 1}</div>
        </div>
      ))}
    </div>
  );
};

export default PdfSidebar;
