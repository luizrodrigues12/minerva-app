"use client";

import { useUserData } from "@/hooks/useUserData";
import { dataMongoUser } from "@/models/userModel";
import { createContext, ReactNode, useContext } from "react";

const UserContext = createContext<dataMongoUser>({} as dataMongoUser);

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const { data } = useUserData();

  return <UserContext.Provider value={data!}>{children}</UserContext.Provider>;
};

const useUserContext = () => useContext(UserContext);

export { UserContextProvider, useUserContext };
