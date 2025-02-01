"use client";
import { DragDropElementLayout, useEmailTemplate } from "@/app/email-editor/Provider";
import { useState ,JSX} from "react";
import ButtonElement from "./Elements/ButtonElement";
import TextElement from "./Elements/TextElement";
import ImageElement from "./Elements/ImgElement";
import SocialElement from "./Elements/SocialElement";
import LogoElement from "./Elements/LogoElement";
import DividerElement from "./Elements/DividerElement";


interface ColumnLayoutProps {
  layout: {
    numOfCol: number;
    id: number;
  };
}

interface DragOverState {
  index: number;
  columnId: number;
}

interface DragElement {
  type: string;
  [key: string]: any; // Allow additional properties
}

const ColumnLayout: React.FC<ColumnLayoutProps> = ({ layout }) => {
  const { emailTemplate, setEmailTemplate } = useEmailTemplate();
  const { dragElementlayout } = DragDropElementLayout();
  
  const [dragOver, setDragOver] = useState<DragOverState | null>(null);

  // Handle drag over event
  const onDragOverHandle = (event: React.DragEvent<HTMLDivElement>, index: number) => {
    event.preventDefault();
    setDragOver({
      index: index,
      columnId: layout?.id,
    });
  };

  // Handle drop event
  const onDropHandle = () => {
    if (!dragOver || !dragElementlayout?.dragElement) return;
    const index = dragOver.index;
    setEmailTemplate((prevTemplate:any) =>
      prevTemplate.map((col:any) =>
        col.id === layout?.id
          ? { ...col, [index]: dragElementlayout.dragElement }
          : col
      )
    );

    console.log("Updated Email Template:", emailTemplate);
    setDragOver(null);
  };

  // Handle drag leave event
  const onDragLeaveHandle = () => {
    setDragOver(null);
  };

  // Function to get element type for display
  const getElementComponent = (element: DragElement | undefined): JSX.Element | string => {
    if (element?.type === "button") {
      return <ButtonElement content={element.content} url={element.url} {...element} />;
    }
    if (element?.type === "text") {
      return <TextElement content={element.content} {...element} />;
    }
    if (element?.type === "image") {
     return <ImageElement imageUrl={element.imageUrl} {...element} />;
     }
     if (element?.type === "logo" ) {
     return <LogoElement imageUrl={element.imageUrl} {...element} />;
     }
     if(element?.type === "divider"){
       return <DividerElement />;
     }
    
     if (element?.type === "icons " ) {
     return <SocialElement socialLinks={element.socialLinks} {...element} />;
     }
    return "Not avalible";
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${layout.numOfCol}, 1fr)`,
        gap: "0px",
      }}
    >
      {Array.from({ length: layout.numOfCol }, (_, index) => (
        <div
          key={index}
          className={`w-full h-20 border border-dashed flex justify-center text-black items-center ${
            index === dragOver?.index && dragOver?.columnId === layout.id ? "bg-green-300" : ""
          }`}
          onDragOver={(e) => onDragOverHandle(e, index)}
          onDrop={onDropHandle}
          onDragLeave={onDragLeaveHandle}
        >
          {layout?.[index] ? getElementComponent(layout?.[index] as DragElement) : "Drag and Drop here"}
        </div>
      ))}
    </div>
  );
};

export default ColumnLayout;
