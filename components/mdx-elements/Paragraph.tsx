import React from 'react';

interface ParagraphProps {
  content: string;
  onEdit: (content: string) => void;
}

const Paragraph: React.FC<ParagraphProps> = ({ content, onEdit }) => {
  return (
    <p
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => onEdit(e.currentTarget.textContent || '')}
      className="outline-none hover:ring-2 hover:ring-blue-500 p-1 rounded my-2"
    >
      {content}
    </p>
  );
};

export default Paragraph;