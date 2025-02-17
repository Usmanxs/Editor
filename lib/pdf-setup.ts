import * as PDFJS from 'pdfjs-dist';

if (typeof window !== 'undefined') {
  PDFJS.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.mjs',
    import.meta.url
  ).toString();
}

export { PDFJS };
