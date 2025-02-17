import React from 'react';

interface ListProps {
  content: string;
  listType: 'ordered' | 'unordered';
  onEdit: (content: string) => void;
  onTypeChange: (type: 'ordered' | 'unordered') => void;
}

const List: React.FC<ListProps> = ({ content, listType, onEdit, onTypeChange }) => {
  const ListTag = listType === 'ordered' ? 'ol' : 'ul';
  
  return (
    <div className="relative group">
      <select
        value={listType}
        onChange={(e) => onTypeChange(e.target.value as 'ordered' | 'unordered')}
        className="absolute -left-20 top-2 opacity-0 group-hover:opacity-100"
      >
        <option value="unordered">Bullet List</option>
        <option value="ordered">Numbered List</option>
      </select>
      <ListTag className="list-inside outline-none hover:ring-2 hover:ring-blue-500 p-2 rounded">
        <div
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onEdit(e.currentTarget.textContent || '')}
          className="outline-none"
        >
          {content}
        </div>
      </ListTag>
    </div>
  );
};

export default List;