import React from "react"

type CategoryContextType = {
  catCode: number;
  setCode: React.Dispatch<React.SetStateAction<number>>;
}

export const CategoryContext = React.createContext<CategoryContextType>(null)