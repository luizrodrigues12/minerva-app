"use client";

import { useGetSubjects } from "@/hooks/useGetSubjects";
import { MateriaType } from "@/models/MateriasModel";
import { createContext, ReactNode, useContext } from "react";

type SubjectsProps = {
  subjects: Array<MateriaType>;
};

const SubjectsContext = createContext<SubjectsProps>({} as SubjectsProps);

const SubjectsProvider = ({ children }: { children: ReactNode }) => {
  const { data: subjects } = useGetSubjects();

  return (
    <SubjectsContext.Provider value={{ subjects: subjects! }}>
      {children}
    </SubjectsContext.Provider>
  );
};

const useSubjectsContext = () => useContext(SubjectsContext);

export { SubjectsProvider, useSubjectsContext };
