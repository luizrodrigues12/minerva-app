import { MateriaType } from "@/models/MateriasModel";
import { create } from "zustand";

export type AlunosObj = {
  idAluno?: string;
  nome?: string;
  preparatorio?: Array<String>;
  materias?: Array<MateriaType>;
};

type State = {
  token: string;
  username: string;
  nomeAluno: string;
  stateChecks: Array<string>;
  alunos: Array<AlunosObj>;
  matsToSend: Array<MateriaType>;
  setToken: (newToken: string) => void;
  setAluno: (nomeAluno: string) => void;
  setChecks: (newChecK: string) => void;
  setAlunos: (objAluno: Array<AlunosObj>) => void;
  emptyStateChecks: () => void;
  setMatsToSend: ({}: MateriaType) => void;
};

const useUserStore = create<State>((set) => ({
  token: "",
  username: "",
  nomeAluno: "",
  stateChecks: [],
  alunos: [{}],
  matsToSend: [],
  setToken: (newToken: string) => {
    set(() => ({ token: newToken }));
  },
  setAluno: (nomeAluno: string) => {
    set(() => ({ nomeAluno: nomeAluno }));
  },
  setChecks: (newCheck: string) => {
    set((state) => ({ stateChecks: [...state.stateChecks, newCheck] }));
  },
  setAlunos: (objAluno: Array<AlunosObj>) => {
    set((state) => ({ alunos: objAluno }));
  },
  emptyStateChecks: () => {
    set((state) => ({ stateChecks: [] }));
  },
  setMatsToSend: (objMats: MateriaType) => {
    set((state) => ({ matsToSend: [objMats] }));
  },
}));

export default useUserStore;
