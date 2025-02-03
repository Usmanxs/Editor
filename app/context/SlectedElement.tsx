import { createContext } from "react";
interface SelectedElementContextType {
  selectedElement: HTMLElement | null;
  setSelectedElement: (element: HTMLElement | null) => void;
}
export const SelectedElementContext = createContext<SelectedElementContextType| null  >(null) ;
