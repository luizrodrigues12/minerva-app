"use client";

import { useUserData } from "@/hooks/useUserData";
import { dataMongoUser } from "@/models/userModel";
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
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<dataMongoUser, Error>>;
  logoutFunction: () => Promise<void>;
};

const UserContext = createContext<UserContextProps>({} as UserContextProps);

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const { data, isFetching, refetch } = useUserData();

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
      value={{ user: data!, isFetching, refetch, logoutFunction }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);

export { UserContextProvider, useUserContext };
