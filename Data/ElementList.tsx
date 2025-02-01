import { SplitSquareVertical } from "lucide-react";
import { Frame, Image, RectangleEllipsis, TextSearchIcon, Twitter, Video, Facebook, Linkedin, Instagram, } from "lucide-react";

export default [
    {
        icon: RectangleEllipsis,
        label: "Button",
        type: "button",
        content: "Click Me",
        url: "#",
        style: {
            backgroundColor: "#007BFF",
            color: "#FFFFFF",
            width: "auto",
            padding: "12px 24px",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "bold",
            textAlign: "center",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
        },
        hoverStyle: {
            backgroundColor: "#0056b3",
        },
        outerStyle: `flex items-center justify-center`,
    },
    {
        icon: TextSearchIcon,
        label: "Text",
        type: "text",
        content: "Sample Text",
        style: {
            backgroundColor: "transparent",
            color: "#333333",
            width: "100%",
            padding: "8px",
            fontSize: "18px",
            fontWeight: "400",
            lineHeight: "1.5",
            textAlign: "left",
        },
        outerStyle: `flex items-start justify-start`,
    },
    {
        icon: Image,
        label: "Image",
        type: "image",
        content: "Sample Image",
        imageUrl: "/image.png",
        alt: "Sample Image",
        url: "#",
        style: {
            width: "100%",
            height: "auto",
            borderRadius: "8px",
            objectFit: "cover",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        },
        outerStyle: `flex items-center justify-center`,
    },
    {
        icon: Frame,
        label: "Logo",
        type: "logo",
        content: "Company Logo",
        imageUrl: "/logo.svg",
        alt: "Company Logo",
        url: "#",
        style: {
            width: "80px",
            height: "auto",
            objectFit: "contain",
        },
        outerStyle: `flex items-center justify-left`,
    },
    
    {
        icon: Twitter,
        label: "Social",
        type: "social",
        content: "Follow us on social media",
        socialLinks: [
            {
                platform: "Twitter",
                url: "https://twitter.com",
                icon: <Twitter className="text-blue-400" />,
            },
            {
                platform: "Facebook",
                url: "https://facebook.com",
                icon: <Facebook className="text-blue-600" />,
            },
            {
                platform: "LinkedIn",
                url: "https://linkedin.com",
                icon: <Linkedin className="text-blue-700" />,
            },
            {
                platform: "Instagram",
                url: "https://instagram.com",
                icon: <Instagram className="text-pink-500" />,
            },
        
        ],
        style: {
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "10px 16px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "bold",
            textAlign: "center",
            transition: "background-color 0.3s ease",
            cursor: "pointer",
        },
        outerStyle: `flex items-center justify-center`,
    },
   
    {
        icon: SplitSquareVertical,
        label: "Divider",
        type: "divider",
        content: "Divider Line",
        style: {
            borderTop: "2px solid #cccccc",
            width: "100%",
            margin: "16px 0",
            display: "block",
        },
        outerStyle: `text-center`,
    }
    
    
];
