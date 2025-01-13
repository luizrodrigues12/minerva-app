"use client";

import { useUserData } from "@/hooks/useUserData";
import { AlunoObj, dataMongoUser } from "@/models/userModel";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { deleteCookie } from "cookies-next";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type UserContextProps = {
  user: dataMongoUser;
  isFetching: boolean;
  getAluno: (idAluno: string) => AlunoObj;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<dataMongoUser, Error>>;
  logoutFunction: () => Promise<void>;
};

const UserContext = createContext<UserContextProps>({} as UserContextProps);

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const { data, isFetching, refetch } = useUserData();

  const getAluno = (idAluno: string) => {
    const aluno = data?.alunos?.filter((aluno) => aluno.idAluno === idAluno);
    return aluno![0];
  };

  const logoutFunction = async () => {
    const res = await fetch(`${process.env.HOST}/api/user/logout`, {
      method: "GET",
    });
    deleteCookie("authorization");
    deleteCookie("username");
    window.location.href = "/login";
  };

  return (
    <UserContext.Provider
      value={{ user: data!, isFetching, refetch, logoutFunction, getAluno }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);

export { UserContextProvider, useUserContext };
