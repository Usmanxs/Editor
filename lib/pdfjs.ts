import { GlobalWorkerOptions } from 'pdfjs-dist';

if (typeof window !== 'undefined') {
  // Use a dynamic import for the worker

}

// Export the initialized pdfjs
export { getDocument } from 'pdfjs-dist';
