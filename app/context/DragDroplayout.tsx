import { createContext } from "react";
interface DragDropLayoutContextType {
    dragElementlayout: any; // Define a proper type for the drag element layout
    setDragElementLayout: React.Dispatch<React.SetStateAction<any>>;
  }
  export const DragDropLayoutContext = createContext<DragDropLayoutContextType | undefined>(undefined);