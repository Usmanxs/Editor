"use client";
import EditorHeader from "@/components/email-custom/EditorHeader";
import EmailCanvas from "@/components/email-custom/EmailCanvas";
import EmailSetting from "@/components/email-custom/EmailSetting";
import EmailSidebar from "@/components/email-custom/EmailSidebar";

export default function page() {
  return (
    <div className="">
      <EditorHeader />

      <div className="grid grid-flow-col w-screen col-span-5">
        <div className=" grid col-span-1">
          <EmailSidebar />
        </div>

        <div className="grid col-span-3 bg-slate-200 h-full">
          <EmailCanvas />
        </div>
        <div className="grid col-span-1">
          <EmailSetting />
        </div>
      </div>
    </div>
  );
}
