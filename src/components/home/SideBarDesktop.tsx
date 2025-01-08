"use client";

import { ReactNode } from "react";
import PerfilContainer from "./PerfilContainer";
import LinkContainer from "./LinkContainer";
import { useUserContext } from "@/contexts/userData";
import Loading from "../layout/Loading";

type SideBarDesktopProps = {
  children: ReactNode;
};

const SideBarDesktop = ({ children }: SideBarDesktopProps) => {
  const { user, isFetching } = useUserContext();

  return (
    <div>
      {!isFetching ? (
        <div className="bg-background01 px-[195px] ">
          <div className="flex w-full gap-10 min-h-screen max-h-screen bg-background01 font-inter lg:gap-12 justify-between">
            <div className="relative bg-background02 border-x-2 min-w-max border-borderColor shadow-md">
              <PerfilContainer username={user.username} />
              <LinkContainer />
            </div>
            <div className="min-h-full min-w-max bg-background02 border-x-2 border-borderColor shadow-md overflow-y-scroll overflow-hidden scroll-style">
              {children}
            </div>
            <div className="min-h-full min-w-[400px] background-art bg-background02 border-x-[2px] border-borderColor shadow-md" />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default SideBarDesktop;
