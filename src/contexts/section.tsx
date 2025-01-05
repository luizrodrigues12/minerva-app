"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type contextType = {
  section: string;
  setSection: Dispatch<SetStateAction<string | undefined>>;
};

const SectionContext = createContext<contextType>({} as contextType);

const SectionProvider = ({ children }: { children: ReactNode }) => {
  const [section, setSection] = useState<string>();

  return (
    <SectionContext.Provider value={{ section: section!, setSection }}>
      {children}
    </SectionContext.Provider>
  );
};

const useSectionContext = () => useContext(SectionContext);

export { useSectionContext, SectionProvider };
