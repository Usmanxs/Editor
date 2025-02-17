import React from 'react';
import { JSX } from 'react/jsx-runtime';

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  content: string;
  onEdit: (content: string) => void;
}

const Heading: React.FC<HeadingProps> = ({ level, content, onEdit }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  return (
    <div className="group relative">
      <Tag 
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => onEdit(e.currentTarget.textContent || '')}
        className="outline-none hover:ring-2 hover:ring-blue-500 p-1 rounded"
      >
        {content}
      </Tag>
    </div>
  );
};

export default Heading;