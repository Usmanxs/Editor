import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json(
        { success: false, message: 'Title and content are required' },
        { status: 400 }
      );
    }

    // Create mdx directory if it doesn't exist
    const mdxDir = path.join(process.cwd(), 'public', 'mdx');
    if (!fs.existsSync(mdxDir)) {
      fs.mkdirSync(mdxDir, { recursive: true });
    }

    // Save the MDX file
    const filePath = path.join(mdxDir, `${title}.mdx`);
    fs.writeFileSync(filePath, content);

    return NextResponse.json({
      success: true,
      message: 'MDX file saved successfully',
      path: `/mdx/${title}.mdx`
    });
  } catch (error) {
    console.error('Error saving MDX file:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to save MDX file' },
      { status: 500 }
    );
  }
}