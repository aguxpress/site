import { createContext } from "react";

interface ScrollContextOptions {
  isPastTop: boolean;
  setIsPastTop: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ScrollContext = createContext<ScrollContextOptions | null>(null);
