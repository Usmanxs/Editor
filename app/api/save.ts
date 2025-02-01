import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  const filePath = path.join(process.cwd(), "public/mdx", `${title}.mdx`);
  fs.writeFileSync(filePath, `---\ntitle: ${title}\n---\n\n${content}`);

  res.status(200).json({ message: "File saved successfully", path: `/mdx/${title}.mdx` });
}
