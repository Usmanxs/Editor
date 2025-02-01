'use client';
import { useScreenSize } from '@/app/Provider';
import React, { useState } from 'react'
import { DragDropElementLayout , useEmailTemplate } from '@/app/email-editor/Provider';
import ColumnLayout from '../email-layouts/ColumnLayout';
function EmailCanvas() {
  const [ dragOver,setDragOver]  = useState(false)
 const {dragElementlayout, setDragElementLayout } = DragDropElementLayout();
  const { screenSize, setScreenSize } = useScreenSize();
  const { emailTemplate, setEmailTemplate } = useEmailTemplate();
  
  const  onDragOver = (e: any) => {
    e.preventDefault();
    setDragOver(true);
  }
  
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  };
  const onDropHandler = () => {
    setDragOver (false)
    console.log( dragElementlayout?.dragLayout);
    if (dragElementlayout?.dragLayout) {
      setEmailTemplate((prev: any[]) => [...prev, dragElementlayout?.dragLayout])
    }
  }
  const getAllLayouts = (layout: any) => {

    if (layout?.type == 'column') {
      return(

        <>
       
        <ColumnLayout layout={layout} />
      </>
         
      ) 
    }
    return <h3> nothing</h3>; // Return null for unsupported types instead of undefined
  };

  return (
    <div className='mt-20 flex justify-center h-full '>
    
      <div className={` bg-white p-6 w-full h-full  ${screenSize == 'desktop' ? 'max-w-2xl' : 'max-w-md'} ${dragOver && ' bg-sky-400' || dragElementlayout }`}>
        <div className={ `w-full h-full border  border-gray-300` } 
        onDragOver={onDragOver}
        onDrop={()=>onDropHandler()}
        onDragLeave={onDragLeave}>
          <div className="w-full h-full flex flex-col justify-center items-center">
          {emailTemplate?.length>0? emailTemplate?.map((layout:any, index:number) => (
            <div key={index} className=" bg-gray-100 w-full">
            {getAllLayouts(layout)}
            
             </div>
          ))
          : <p>Drag and drop elements here</p>}
          </div>
        </div>
      </div>
      </div>
  )
}

export default EmailCanvas