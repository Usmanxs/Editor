import React from 'react';

interface LinkProps {
  content: string;
  url: string;
  onEdit: (updates: { content: string; url: string }) => void;
}

const Link: React.FC<LinkProps> = ({ content, url, onEdit }) => {
  return (
    <div className="relative group space-y-2">
      <input
        type="text"
        value={url}
        placeholder="URL"
        onChange={(e) => onEdit({ content, url: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <div
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => onEdit({ content: e.currentTarget.textContent || '', url })}
        className="text-blue-500 underline outline-none hover:ring-2 hover:ring-blue-500 p-1 rounded"
      >
        {content}
      </div>
    </div>
  );
};

export default Link;