"use client";

import { ReactNode } from "react";
import PerfilContainer from "../home/PerfilContainer";
import LinkContainer from "../home/LinkContainer";
import { useUserContext } from "@/contexts/userData";
import Loading from "./Loading";
import { useThemeContext } from "@/contexts/darkMode";

type SideBarDesktopProps = {
  children: ReactNode;
};

const SideBarDesktop = ({ children }: SideBarDesktopProps) => {
  const { user, isFetching } = useUserContext();
  const { theme } = useThemeContext();

  return (
    <div>
      {!isFetching || user ? (
        <div className="bg-background01 md:px-[100px] lg:px-[60px] xl:px-[100px] 2xl:px-[300px]">
          <div
            className={`flex w-full min-h-screen max-h-screen bg-background01 font-inter ${
              user ? "justify-between" : "justify-center"
            } `}
          >
            {user && (
              <div
                className="hidden relative bg-background02 border-x-[1px] border-borderColor shadow-sm lg:block 
             lg:w-[28%] xl:w-[25%] 2xl:w-[25%]"
              >
                <PerfilContainer />
                <LinkContainer />
              </div>
            )}

            <div className="min-h-full w-full bg-background02 md:border-x-[1px] md:border-borderColor md:shadow-sm md:overflow-y-scroll md:overflow-hidden scroll-style lg:w-[40%] xl:w-[45%] 2xl:w-[45%]">
              {children}
            </div>

            {user && (
              <div className="hidden min-h-full w-[20%] lg:w-[28%] xl:w-[25%] 2xl:w-[25%] bg-background02 border-x-[1px] border-borderColor shadow-sm lg:block">
                <div
                  className={`${
                    theme === "light" ? "background-art" : "background-art-dark"
                  } w-full h-full`}
                ></div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default SideBarDesktop;
