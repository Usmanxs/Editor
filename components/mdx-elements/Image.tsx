import React from 'react';

interface ImageProps {
  url: string;
  alt: string;
  onEdit: (updates: { url: string; alt: string }) => void;
}

const Image: React.FC<ImageProps> = ({ url, alt, onEdit }) => {
  return (
    <div className="relative group">
      <div className="mb-2">
        <input
          type="text"
          value={url}
          placeholder="Image URL"
          onChange={(e) => onEdit({ url: e.target.value, alt })}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <input
          type="text"
          value={alt}
          placeholder="Alt text"
          onChange={(e) => onEdit({ url, alt: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>
      {url && <img src={url} alt={alt} className="max-w-full h-auto" />}
    </div>
  );
};

export default Image;