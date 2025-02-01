import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join(process.cwd(), "public/mdx"));
  const paths = files.map((file) => ({
    params: { slug: file.replace(".mdx", "") },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const filePath = path.join(process.cwd(), "public/mdx", `${params.slug}.mdx`);
  const rawContent = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(rawContent);
  const mdxSource = await serialize(content);

  return { props: { mdxSource, data } };
}

export default function Post({ mdxSource, data }: any) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{data.title}</h1>
      <MDXRemote {...mdxSource} />
    </div>
  );
}
