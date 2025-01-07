"use client";

import { useUserData } from "@/hooks/useUserData";
import { dataMongoUser } from "@/models/userModel";
import { getCookie } from "cookies-next";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type UserContextProps = {
  user: dataMongoUser;
};

const UserContext = createContext<UserContextProps>({} as UserContextProps);

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const token = getCookie("authorization");
  const { data } = useUserData();

  return (
    <UserContext.Provider value={{ user: data! }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);

export { UserContextProvider, useUserContext };
