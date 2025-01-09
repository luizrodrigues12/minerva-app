"use client";

import { ReactNode } from "react";
import PerfilContainer from "../home/PerfilContainer";
import LinkContainer from "../home/LinkContainer";
import { useUserContext } from "@/contexts/userData";
import Loading from "./Loading";
import Image from "next/image";

type SideBarDesktopProps = {
  children: ReactNode;
};

const SideBarDesktop = ({ children }: SideBarDesktopProps) => {
  const { user, isFetching } = useUserContext();

  return (
    <div>
      {!isFetching || user ? (
        <div className="bg-background01  md:px-[100px] lg:px-[80px] xl:px-[195px]">
          <div className="flex w-full gap-10 min-h-screen max-h-screen bg-background01 font-inter justify-between">
            <div
              className="hidden relative bg-background02 border-x-2 border-borderColor shadow-md lg:block 
             lg:w-[40%] 2xl:w-[25%]"
            >
              <PerfilContainer username={user.username} />
              <LinkContainer />
            </div>
            <div className="min-h-full w-full bg-background02 border-x-2 border-borderColor shadow-md lg:overflow-y-scroll lg:overflow-hidden scroll-style lg:w-[60%] xl:w-[60%] 2xl:w-[40%]">
              {children}
            </div>
            <div className="hidden min-h-full w-[20%] 2xl:w-[25%] bg-background02 border-x-[2px] border-borderColor shadow-md 2xl:block">
              <div className="background-art w-full h-full"></div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default SideBarDesktop;
