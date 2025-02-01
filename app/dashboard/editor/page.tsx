'use client';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from 'next-mdx-remote'
import remarkGfm from "remark-gfm";

type FormData = {
  title: string;
  content: string;
};

export default function page() {
  const { register, handleSubmit } = useForm<FormData>();
  const [mdxContent, setMdxContent] = useState<any>(null);
  const [title, setTitle] = useState("");

  const onSubmit = async (data: FormData) => {
    setTitle(data.title);
    const serialized = await serialize(data.content, {
      mdxOptions: { remarkPlugins: [remarkGfm] },
    });
    setMdxContent(serialized);
  };

  const downloadMDX = () => {
    const element = document.createElement("a");
    const file = new Blob([`---\ntitle: ${title}\n---\n\n${mdxContent}`], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${title}.mdx`;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className=" p-6 w-full ">
      <div className="flex justify-around  p-4 ">

      <h1 className="text-xl font-bold m-4">MDX Editor</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input {...register("title")} placeholder="Enter title" className="border p-2" />
        <textarea {...register("content")} placeholder="Write MDX content" className="border p-2 h-40" />
        <button type="submit" className="bg-blue-500 text-white p-2">Preview</button>
      </form>

      {mdxContent && (
        <div className="m-6 p-4 border ">
          <h2 className="text-lg font-bold">{title}</h2>
          <MDXRemote {...mdxContent} />
          <button onClick={downloadMDX} className="bg-green-500 text-white p-2 mt-4">
            Download MDX
          </button>
        </div>
      )}
      </div>
    </div>
  );
}
