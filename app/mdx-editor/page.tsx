'use client';
import React, { useState } from 'react';
import Heading from '@/components/mdx-elements/Heading';
import Paragraph from '@/components/mdx-elements/Paragraph';
import CodeBlock from '@/components/mdx-elements/CodeBlock';
import Blockquote from '@/components/mdx-elements/Blockquote';
import List from '@/components/mdx-elements/List';
import Image from '@/components/mdx-elements/Image';
import Link from '@/components/mdx-elements/Link';
import { MDXElement } from './types';
import { 
  Type, 
  Code, 
  Quote, 
  ListOrdered, 
  List as ListIcon,
  Image as ImageIcon, 
  Link as LinkIcon, 
  Minus,
  Save,
  Download,
  Trash2,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function MDXEditor() {
  const [elements, setElements] = useState<MDXElement[]>([]);
  const [title, setTitle] = useState('Untitled Document');

  const addElement = (type: MDXElement['type']) => {
    const newElement: MDXElement = {
      id: Date.now().toString(),
      type,
      content: '',
      ...(type === 'heading' && { level: 1 }),
      ...(type === 'code' && { language: 'javascript' }),
      ...(type === 'list' && { listType: 'unordered' }),
      ...(type === 'image' && { url: '', alt: '' }),
      ...(type === 'link' && { url: '' }),
    };
    setElements([...elements, newElement]);
  };

  const updateElement = (id: string, updates: Partial<MDXElement>) => {
    setElements(elements.map(el => 
      el.id === id ? { ...el, ...updates } : el
    ));
  };

  const deleteElement = (id: string) => {
    setElements(elements.filter(el => el.id !== id));
  };

  const moveElement = (id: string, direction: 'up' | 'down') => {
    const index = elements.findIndex(el => el.id === id);
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === elements.length - 1)
    ) return;

    const newElements = [...elements];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newElements[index], newElements[newIndex]] = [newElements[newIndex], newElements[index]];
    setElements(newElements);
  };

  const generateMDX = () => {
    let mdx = `---\ntitle: ${title}\n---\n\n`;
    
    elements.forEach(element => {
      switch (element.type) {
        case 'heading':
          mdx += `${'#'.repeat(element.level || 1)} ${element.content}\n\n`;
          break;
        case 'paragraph':
          mdx += `${element.content}\n\n`;
          break;
        case 'code':
          mdx += `\`\`\`${element.language}\n${element.content}\n\`\`\`\n\n`;
          break;
        case 'blockquote':
          mdx += `> ${element.content}\n\n`;
          break;
        case 'list':
          const lines = element.content.split('\n');
          lines.forEach((line, index) => {
            if (element.listType === 'ordered') {
              mdx += `${index + 1}. ${line}\n`;
            } else {
              mdx += `- ${line}\n`;
            }
          });
          mdx += '\n';
          break;
        case 'image':
          mdx += `![${element.alt}](${element.url})\n\n`;
          break;
        case 'link':
          mdx += `[${element.content}](${element.url})\n\n`;
          break;
        case 'divider':
          mdx += `---\n\n`;
          break;
      }
    });
    
    return mdx;
  };

  const downloadMDX = () => {
    const mdxContent = generateMDX();
    const blob = new Blob([mdxContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title}.mdx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const saveMDX = async () => {
    try {
      const response = await fetch('/api/mdx/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content: generateMDX(),
        }),
      });

      if (!response.ok) throw new Error('Failed to save');
      alert('MDX file saved successfully!');
    } catch (error) {
      alert('Failed to save MDX file');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8 flex justify-between items-center">
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-2xl font-bold border-none focus-visible:ring-0 focus-visible:ring-offset-0 px-0 max-w-[300px]"
        />
        <div className="space-x-4">
          <Button
            onClick={saveMDX}
            className="gap-2"
          >
            <Save size={16} /> Save
          </Button>
          <Button
            onClick={downloadMDX}
            variant="secondary"
            className="gap-2"
          >
            <Download size={16} /> Download
          </Button>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => addElement('heading')}
              >
                <Type size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add Heading</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => addElement('paragraph')}
              >
                <span className="text-lg">¶</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add Paragraph</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => addElement('code')}
              >
                <Code size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add Code Block</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => addElement('blockquote')}
              >
                <Quote size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add Quote</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => addElement('list')}
              >
                <ListIcon size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add List</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => addElement('image')}
              >
                <ImageIcon size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add Image</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => addElement('link')}
              >
                <LinkIcon size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add Link</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => addElement('divider')}
              >
                <Minus size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add Divider</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="space-y-4">
        {elements.map((element, index) => (
          <div key={element.id} className="group relative bg-background rounded-lg p-4 border shadow-sm">
            <div className="absolute -left-12 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => moveElement(element.id, 'up')}
                disabled={index === 0}
                className="h-8 w-8"
              >
                <ChevronUp size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => moveElement(element.id, 'down')}
                disabled={index === elements.length - 1}
                className="h-8 w-8"
              >
                <ChevronDown size={16} />
              </Button>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteElement(element.id)}
              className="absolute -right-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 size={16} />
            </Button>

            <div className="relative">
              {element.type === 'heading' && (
                <div className="flex items-center gap-4">
                  <select
                    value={element.level}
                    onChange={(e) => updateElement(element.id, { level: Number(e.target.value) as 1|2|3|4|5|6 })}
                    className="absolute -left-20 top-2 w-16 h-8 rounded-md border border-input bg-background px-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {[1,2,3,4,5,6].map(level => (
                      <option key={level} value={level}>H{level}</option>
                    ))}
                  </select>
                  <Heading
                    level={element.level || 1}
                    content={element.content}
                    onEdit={(content) => updateElement(element.id, { content })}
                  />
                </div>
              )}
              
              {element.type === 'paragraph' && (
                <Paragraph
                  content={element.content}
                  onEdit={(content) => updateElement(element.id, { content })}
                />
              )}
              
              {element.type === 'code' && (
                <CodeBlock
                  content={element.content}
                  language={element.language}
                  onEdit={(content) => updateElement(element.id, { content })}
                  onLanguageChange={(language) => updateElement(element.id, { language })}
                />
              )}

              {element.type === 'blockquote' && (
                <Blockquote
                  content={element.content}
                  onEdit={(content) => updateElement(element.id, { content })}
                />
              )}

              {element.type === 'list' && (
                <List
                  content={element.content}
                  listType={element.listType || 'unordered'}
                  onEdit={(content) => updateElement(element.id, { content })}
                  onTypeChange={(listType) => updateElement(element.id, { listType })}
                />
              )}

              {element.type === 'image' && (
                <Image
                  url={element.url || ''}
                  alt={element.alt || ''}
                  onEdit={(updates) => updateElement(element.id, updates)}
                />
              )}

              {element.type === 'link' && (
                <Link
                  content={element.content}
                  url={element.url || ''}
                  onEdit={(updates) => updateElement(element.id, updates)}
                />
              )}

              {element.type === 'divider' && (
                <hr className="my-4 border-t-2 border-gray-200" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
