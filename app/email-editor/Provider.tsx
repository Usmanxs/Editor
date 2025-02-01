'use client';
import React, { useState ,useContext} from "react";
import { ScreenSizeContext } from "../context/ScreenSizecContext";
import { DragDropLayoutContext } from "../context/DragDroplayout";
import { EmailTemplateContext } from "../context/EmailTemple";
interface ScreenSizeProviderProps {
  children: React.ReactNode ;
}

function Provider({ children }: { children: React.ReactNode }) {
  const [screenSize, setScreenSize] = useState<string>("desktop");
  const [dragElementlayout, setDragElementLayout] = useState<any>(null);
  const [emailTemplate, setEmailTemplate] = useState([]);

  return (
    <ScreenSizeContext.Provider value={{ screenSize, setScreenSize }}>
      <DragDropLayoutContext.Provider value={{ dragElementlayout, setDragElementLayout }}>
      <EmailTemplateContext.Provider value={{emailTemplate, setEmailTemplate}}>

      {children}
      </EmailTemplateContext.Provider>
      </DragDropLayoutContext.Provider>
    </ScreenSizeContext.Provider>
  );
}

export default Provider
export const useScreenSize = () => {
  const context = useContext(ScreenSizeContext);
  if (!context) {
    throw new Error("useScreenSize must be used within a Provider");
  }
  return context;
};

export const DragDropElementLayout = () => {
  const context = useContext(DragDropLayoutContext);
  if (!context) {
    throw new Error("useDragDropElementLayout must be used within a Provider");
  }
  return context;
};
export const useEmailTemplate = () => {
  const context = useContext(EmailTemplateContext);
  if (!context) {
    throw new Error("useEmailTemplate must be used within a Provider");
  }
  return context;
};