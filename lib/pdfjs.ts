import { GlobalWorkerOptions } from 'pdfjs-dist';

if (typeof window !== 'undefined') {
  // Use a dynamic import for the worker
  GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${process.env.NEXT_PUBLIC_PDFJS_VERSION}/build/pdf.worker.min.js`;
}

// Export the initialized pdfjs
export { getDocument } from 'pdfjs-dist';
