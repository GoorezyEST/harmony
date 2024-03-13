import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [userFiles, setUserFiles] = useState(null);
  const [userVisualizer, setUserVisualizer] = useState({});
  const [userSongs, setUserSongs] = useState(null);

  return (
    <GlobalContext.Provider
      value={{
        userFiles,
        setUserFiles,
        userVisualizer,
        setUserVisualizer,
        userSongs,
        setUserSongs,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used with a settings provider");
  }
  return context;
}
