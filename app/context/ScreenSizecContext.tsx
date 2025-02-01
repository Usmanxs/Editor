import { createContext } from "react";

interface ScreenSizeContextType {
  screenSize: string;
  setScreenSize: React.Dispatch<React.SetStateAction<string>>;
}

export const ScreenSizeContext = createContext<ScreenSizeContextType | null>(null);
