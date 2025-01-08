"use client";

import { useUserData } from "@/hooks/useUserData";
import { dataMongoUser } from "@/models/userModel";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
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
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<dataMongoUser, Error>>;
};

const UserContext = createContext<UserContextProps>({} as UserContextProps);

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const { data, isFetching, refetch } = useUserData();

  return (
    <UserContext.Provider value={{ user: data!, isFetching, refetch }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);

export { UserContextProvider, useUserContext };
