"use client";
import ElementList from "@/Data/ElementList";
import layout from "@/Data/layout";
import React from "react";
import { DragDropElementLayout  } from "@/app/email-editor/Provider";
function EmailSidebar() {
  const {dragElementlayout, setDragElementLayout } = DragDropElementLayout();

  const onDragLayoutStart = (layout: any) => {
   
   
    setDragElementLayout(
      {
      dragLayout: {
        ...layout,
        id: Date.now(),
      },
    });
  };
  const onDragElementStart = (element: any) => {
    setDragElementLayout(
      {dragElement: { ...element, id: Date.now() }})
  }

  return (
    <div className="py-4  p-6  ">
    
      <h2 className="font-bold text-md"> Layout</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {layout.map((layout, index) => (
       <div  key={index} draggable onDragStart={()=>onDragLayoutStart(layout)}>

       <div
           
            className="mt-3 border border-dashed flex flex-col  items-center justify-center  rounded-xl pt-2 group hover:shadow-lg hover:border-sky-800 hover:text-sky-500 cursor-pointer"
            >
            {<layout.icon className=" group-hover:text-primary:" />}
            <p>{layout.label}</p>
          </div>
            </div>
        ))}
      </div>
      <div className="mt-6">

      <h2 className="font-bold text-lg"> Elements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ElementList.map((element, index) => (
                 <div  key={index} draggable onDragStart={()=>onDragElementStart(element)}>
            <div
        
            className="mt-3 border border-dashed flex flex-col  items-center justify-center  rounded-xl pt-2 group hover:shadow-lg hover:border-sky-800 hover:text-sky-500 cursor-pointer"
            >
            {<element.icon className=" group-hover:text-primary:" />}
            <p>{element.label}</p>
          </div>
          </div>

        ))}
      </div>
        </div>
    </div>
  );
}

export default EmailSidebar;
