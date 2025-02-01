import React from "react";

interface ButtonElementProps {
  content: string;
  style?: React.CSSProperties;
  url: string;
}

const ButtonElement: React.FC<ButtonElementProps> = ({ content, style, url }) => {
  return (
    <div className="flex items-center justify-center">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <button style={style} className="px-4 py-2 rounded-lg font-bold transition hover:opacity-80">
          {content}
        </button>
      </a>
    </div>
  );
};

export default ButtonElement;
