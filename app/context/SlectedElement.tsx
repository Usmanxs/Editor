import { createContext } from "react";

interface SelectedElementType {
  layout: {
    id: number;
  };
  index: number;
}

interface SelectedElementContextType {
  selectedElement: SelectedElementType | null;
  setSelectedElement: (element: SelectedElementType | null) => void;
}

export const SelectedElementContext = createContext<SelectedElementContextType | null>(null);
