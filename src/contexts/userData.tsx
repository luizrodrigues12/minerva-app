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
  const [userData, setUserData] = useState<dataMongoUser | null>(null);

  const getUser = async () => {
    const res = await fetch(`${process.env.HOST}/api/user/get_user`, {
      method: "POST",
      body: JSON.stringify({ token: token }),
    });
    const { user }: { user: dataMongoUser } = await res.json();
    setUserData(user);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user: userData! }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);

export { UserContextProvider, useUserContext };
