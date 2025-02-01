import React from "react";

interface LogoElementProps {
  imageUrl: string;
  alt?: string;
  style?: React.CSSProperties;
}

const LogoElement: React.FC<LogoElementProps> = ({ imageUrl, alt, style }) => {
  return (
    <div className="flex items-center">
      <img src={imageUrl} alt={alt || "Logo"} style={style} className="h-12 w-auto" />
    </div>
  );
};

export default LogoElement;
