export interface MDXElement {
  type: 'heading' | 'paragraph' | 'code' | 'blockquote' | 'list' | 'image' | 'link' | 'table' | 'divider';
  content: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  language?: string;
  id: string;
  listType?: 'ordered' | 'unordered';
  url?: string;
  alt?: string;
  columns?: string[];
  rows?: string[][];
}