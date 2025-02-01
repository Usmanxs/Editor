import React from "react";

interface TextElementProps {
  content: string;
  style?: React.CSSProperties;
}

const TextElement: React.FC<TextElementProps> = ({ content, style }) => {
  return (
    <p style={style} className="text-gray-800 leading-6">
      {content}
    </p>
  );
};

export default TextElement;
