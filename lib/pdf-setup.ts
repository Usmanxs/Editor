import * as PDFJS from 'pdfjs-dist';

if (typeof window !== 'undefined') {
  PDFJS.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';
}

export { PDFJS };
