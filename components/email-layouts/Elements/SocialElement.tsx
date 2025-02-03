import React from "react";

interface SocialElementProps {
  socialLinks: {
    platform: string;
    url: string;
    iconUrl: string;
  }[];
  style?: React.CSSProperties;
}

const SocialElement: React.FC<SocialElementProps> = ({ socialLinks, style }) => {
  return (
    <div style={style} className="text-center">
      {socialLinks.map((link, index) => (
        <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
          <img src={link.iconUrl} alt={link.platform} width="24" style={{ margin: "5px" }} />
        </a>
      ))}
    </div>
  );
};

export default SocialElement;
