import React from 'react';

interface BlockquoteProps {
  content: string;
  onEdit: (content: string) => void;
}

const Blockquote: React.FC<BlockquoteProps> = ({ content, onEdit }) => {
  return (
    <blockquote
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => onEdit(e.currentTarget.textContent || '')}
      className="border-l-4 border-gray-300 pl-4 italic my-4 outline-none hover:ring-2 hover:ring-blue-500 p-2 rounded"
    >
      {content}
    </blockquote>
  );
};

export default Blockquote;