"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type DarkModeProps = {
  theme: string;
  toggleTheme: () => void;
};

const DarkModeContext = createContext<DarkModeProps>({} as DarkModeProps);

const DarkModeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState("");

  const getTheme = () => {
    const themeStorage = localStorage.getItem("theme");
    if (themeStorage !== null) {
      setTheme(themeStorage);
      return;
    }
    localStorage.setItem("theme", "light");
    setTheme("light");
  };

  const toggleTheme = () => {
    const themeStorage = localStorage.getItem("theme");
    themeStorage === "dark"
      ? localStorage.setItem("theme", "light")
      : localStorage.setItem("theme", "dark");
    getTheme();
  };

  useEffect(() => {
    getTheme();
  }, []);

  return (
    <DarkModeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`${theme}`}>{children}</div>
    </DarkModeContext.Provider>
  );
};

const useThemeContext = () => useContext(DarkModeContext);

export { DarkModeProvider, useThemeContext };
