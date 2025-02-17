import { PDFWorker } from 'pdfjs-dist/legacy/build/pdf';

if (typeof window !== 'undefined' && 'Worker' in window) {
  window.pdfjsWorker = PDFWorker;
}