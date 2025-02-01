import { Edit,Mail } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-screen py-2">
         <Link href="/email-editor">
         <Mail size={44} strokeWidth={1.25} />
         Email Editor</Link>
    </div>
  );
}
