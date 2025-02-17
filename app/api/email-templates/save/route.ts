import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { template, name } = body;

    // Generate HTML from template
    const html = await generateEmailHTML(template);

    // Create templates directory if it doesn't exist
    const templatesDir = path.join(process.cwd(), 'public', 'email-templates');
    if (!fs.existsSync(templatesDir)) {
      fs.mkdirSync(templatesDir, { recursive: true });
    }

    // Save template JSON
    const jsonPath = path.join(templatesDir, `${name}.json`);
    fs.writeFileSync(jsonPath, JSON.stringify(template, null, 2));

    // Save HTML version
    const htmlPath = path.join(templatesDir, `${name}.html`);
    fs.writeFileSync(htmlPath, html);

    return NextResponse.json({ 
      success: true, 
      message: 'Template saved successfully',
      paths: {
        json: `/email-templates/${name}.json`,
        html: `/email-templates/${name}.html`
      }
    });
  } catch (error) {
    console.error('Error saving template:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to save template' },
      { status: 500 }
    );
  }
}

async function generateEmailHTML(template: any) {
  // Email-safe CSS
  const baseStyles = `
    body { margin: 0; padding: 0; background-color: #f4f4f4; }
    table { border-collapse: collapse; }
    td { padding: 0; }
    img { border: 0; display: block; }
  `;

  const generateElementHTML = async (element: any) => {
    switch (element.type) {
      case 'text':
        return `
          <td style="${element.style || ''}">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="padding: 10px; font-family: Arial, sans-serif;">
                  ${element.content}
                </td>
              </tr>
            </table>
          </td>`;

      case 'button':
        return `
          <td style="padding: 10px;">
            <table border="0" cellpadding="0" cellspacing="0">
              <tr>
                <td style="border-radius: 4px; background-color: ${element.style?.backgroundColor || '#007bff'};">
                  <a href="${element.url}" 
                     style="color: #ffffff; display: inline-block; padding: 12px 20px; text-decoration: none; font-family: Arial, sans-serif;"
                     target="_blank">
                    ${element.content}
                  </a>
                </td>
              </tr>
            </table>
          </td>`;

      case 'image':
        return `
          <td style="padding: 10px;">
            <img src="${element.imageUrl}"
                 alt="${element.alt || ''}"
                 width="${element.style?.width || '100%'}"
                 style="max-width: 100%; height: auto;" />
          </td>`;

      case 'spacer':
        return `
          <td style="height: ${element.height || '20px'};"></td>`;

      case 'divider':
        return `
          <td style="padding: 10px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="border-top: 1px solid #e0e0e0;"></td>
              </tr>
            </table>
          </td>`;

      case 'social':
        const icons = element.socialLinks.map((social: any) => `
          <a href="${social.url}" style="text-decoration: none; margin: 0 10px;" target="_blank">
            <img src="${social.icon}" alt="${social.platform}" width="32" />
          </a>
        `).join('');
        
        return `
          <td style="padding: 10px; text-align: center;">
            ${icons}
          </td>`;

      default:
        return '';
    }
  };

  const generateColumnHTML = async (layout: any) => {
    if (layout.type === 'column') {
      const columnWidth = Math.floor(100 / layout.numOfCol);
      const columns = [];

      for (let i = 0; i < layout.numOfCol; i++) {
        const element = layout[i];
        if (element) {
          columns.push(await generateElementHTML(element));
        } else {
          columns.push('<td style="padding: 10px;"></td>');
        }
      }

      return `
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            ${columns.map(col => `
              <td width="${columnWidth}%" valign="top">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>${col}</tr>
                </table>
              </td>
            `).join('')}
          </tr>
        </table>`;
    }
    return '';
  };

  const contentHTML = await Promise.all(template.map(generateColumnHTML));

  return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Email Template</title>
    <style type="text/css">
      ${baseStyles}
      @media only screen and (max-width: 600px) {
        .container { width: 100% !important; }
        .column { display: block !important; width: 100% !important; }
      }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4;">
    <center>
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" class="container">
            ${contentHTML.join('')}
        </table>
    </center>
</body>
</html>`;
}
