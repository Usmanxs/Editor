import React from 'react';

interface CodeBlockProps {
  content: string;
  language?: string;
  onEdit: (content: string) => void;
  onLanguageChange: (language: string) => void;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ content, language = 'javascript', onEdit, onLanguageChange }) => {
  return (
    <div className="relative group">
      <select
        value={language}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="absolute right-2 top-2 bg-gray-800 text-white text-sm rounded px-2 py-1"
      >
        <option value="javascript">JavaScript</option>
        <option value="typescript">TypeScript</option>
        <option value="python">Python</option>
        <option value="html">HTML</option>
        <option value="css">CSS</option>
      </select>
      <pre className="bg-gray-900 text-white p-4 rounded-lg my-4">
        <code
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onEdit(e.currentTarget.textContent || '')}
          className="outline-none block"
        >
          {content}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;