"use client";

import React from "react";
import {
  Monitor,
  Smartphone,
  Save,
  Download,
} from "lucide-react";
import { Button } from "../ui/button";
import { useScreenSize, useEmailTemplate } from "@/app/email-editor/Provider";

const EditorHeader: React.FC = () => {
  const { screenSize, setScreenSize } = useScreenSize();
  const { emailTemplate } = useEmailTemplate();

  // Function to convert relative URLs to absolute URLs
  const getAbsoluteUrl = (relativeUrl: string): string => {
    // If it's already an absolute URL, return as is
    if (relativeUrl.startsWith('http://') || relativeUrl.startsWith('https://')) {
      return relativeUrl;
    }
    // Convert relative URL to absolute
    const baseUrl = window.location.origin;
    return `${baseUrl}${relativeUrl.startsWith('/') ? '' : '/'}${relativeUrl}`;
  };

  // Function to fetch and convert image to base64
  const imageToBase64 = async (imageUrl: string): Promise<string> => {
    try {
      const absoluteUrl = getAbsoluteUrl(imageUrl);
      const response = await fetch(absoluteUrl);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error converting image to base64:', error);
      return imageUrl; // Fallback to original URL if conversion fails
    }
  };

  const convertToHTML = async (template: any[]): Promise<string> => {
    const generateStyles = (styles: any) => {
      return Object.entries(styles || {})
        .map(([key, value]) => `${key}: ${value};`)
        .join(' ');
    };

    const generateElementHTML = async (element: any): Promise<string> => {
      switch (element.type) {
        case 'text':
          return `<div style="${generateStyles(element.style)}">${element.content}</div>`;
        
        case 'button':
          return `<a href="${element.url}" target="_blank" style="${generateStyles(element.style)}">${element.content}</a>`;
        
        case 'image':
        case 'logo':
          const base64Image = await imageToBase64(element.imageUrl);
          return `<img src="${base64Image}" alt="${element.alt || ''}" style="${generateStyles(element.style)}"/>`;
        
        case 'icons':
          const socialLinksPromises = element.socialLinks?.map(async (social: any) => {
            const iconStyle = "display: inline-block; margin: 0 10px; text-decoration: none; color: inherit;";
            return `<a href="${social.url}" target="_blank" style="${iconStyle}">
              ${social.platform}
            </a>`;
          }) || [];
          const socialLinks = await Promise.all(socialLinksPromises);
          return `<div style="${generateStyles(element.style)}">${socialLinks.join('')}</div>`;
        
        default:
          return '';
      }
    };

    const generateColumnHTML = async (layout: any): Promise<string> => {
      if (layout.type === 'column') {
        const columnWidth = `${100 / layout.numOfCol}%`;
        const columnElementsPromises = Object.entries(layout)
          .filter(([key]) => !isNaN(Number(key)))
          .map(async ([_, element]: [string, any]) => await generateElementHTML(element));
        
        const columnElements = await Promise.all(columnElementsPromises);
        
        return `<div style="display: flex; width: 100%; flex-wrap: wrap;">
          ${Array(layout.numOfCol).fill('')
            .map(() => `<div style="width: ${columnWidth}; padding: 10px;">${columnElements.join('')}</div>`)
            .join('')}
        </div>`;
      }
      return '';
    };

    const layoutPromises = template.map(layout => generateColumnHTML(layout));
    const htmlContent = (await Promise.all(layoutPromises)).join('');

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        * {
            box-sizing: border-box;
        }
        img {
            max-width: 100%;
            height: auto;
        }
        @media only screen and (max-width: 600px) {
            div[style*="display: flex"] {
                flex-direction: column !important;
            }
            div[style*="display: flex"] > div {
                width: 100% !important;
            }
        }
    </style>
</head>
<body>
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        ${htmlContent}
    </div>
</body>
</html>`;
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/email-templates/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          template: emailTemplate,
          name: `template-${Date.now()}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save template');
      }

      alert('Template saved successfully!');
    } catch (error) {
      console.error('Error saving template:', error);
      alert('Failed to save template');
    }
  };

  const handleDownload = async () => {
    try {
      const htmlContent = await convertToHTML(emailTemplate);
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      
      link.href = url;
      link.download = `email-template-${Date.now()}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading template:', error);
      alert('Failed to download template');
    }
  };

  return (
    <div className="p-4 shadow-sm flex w-screen justify-between items-center">
      <div className="logo px-4">
        <img src="/next.svg" alt="" />
        <span> email editor</span>
      </div>
      <div className="displays flex gap-2">
        <Button
          variant={screenSize === 'desktop' ? 'link' : 'ghost'}
          onClick={() => setScreenSize('desktop')}
        >
          <Monitor /> Desktop{" "}
        </Button>
        <Button
          variant={screenSize === 'mobile' ? 'link' : 'ghost'}
          onClick={() => setScreenSize("mobile")}
        >
          <Smartphone /> Mobile{" "}
        </Button>
      </div>
      <div className="exports space-x-4">
        <Button variant="outline" onClick={handleSave}>
          <Save className="mr-2" /> Save
        </Button>
        <Button onClick={handleDownload}>
          <Download className="mr-2" /> Export HTML
        </Button>
      </div>
    </div>
  );
};

export default EditorHeader;
