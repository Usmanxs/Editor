import fs from "fs";
import path from "path";
import Link from "next/link";

export default function Files() {
  const mdxFiles = fs.readdirSync(path.join(process.cwd(), "public/mdx"));

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Saved MDX Files</h1>
      <ul>
        {mdxFiles.map((file) => (
          <li key={file}>
            <Link href={`/${file.replace(".mdx", "")}`} className="text-blue-500">
              {file}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
