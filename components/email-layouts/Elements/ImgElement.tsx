import React from "react";

interface ImageElementProps {
  imageUrl: string;
  alt?: string;
  style?: React.CSSProperties;
}

const ImageElement: React.FC<ImageElementProps> = ({ imageUrl, alt, style }) => {
  return (
    <div className="flex items-center justify-center">
      <img src={imageUrl} alt={alt || "Image"} style={style} className="rounded-lg shadow-md" />
    </div>
  );
};

export default ImageElement;
