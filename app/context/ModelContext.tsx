// Context.js
import { createContext, useState, memo } from "react";
import { ModelContextType } from "../utils/interfaces";
export const ModelContext = createContext<ModelContextType | null>(null);

const ModelProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentModel, setCurrentModel] = useState<string>("gpt-5-nano");

  return (
    <ModelContext.Provider
      value={{
        model: currentModel,
        setModel: setCurrentModel,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
};

export default memo(ModelProvider);
