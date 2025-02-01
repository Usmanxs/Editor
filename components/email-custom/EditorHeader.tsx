"use client ";

import React from "react";
import {
  Monitor,
  Smartphone,
  Code,
  CodeSquare,
  Save,
  Download,
} from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import { useScreenSize } from "@/app/email-editor/Provider";
const EditorHeader: React.FC = () => {
  const { screenSize, setScreenSize } = useScreenSize();

  return (
    <div className="p-4 shadow-sm flex w-screen justify-between items-center">
      <div className="logo px-4 ">
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
        <Button  variant={screenSize === 'mobile' ? 'link' : 'ghost'} onClick={() => setScreenSize("mobile")}>
          <Smartphone /> Mobile{" "}
        </Button>
      </div>
      <div className="exports space-x-4">
        <Button variant="outline">
          <Save /> Save{" "}
        </Button>
        <Button>
          <Download /> Export{" "}
        </Button>
      </div>
    </div>
  );
}

export default EditorHeader;
