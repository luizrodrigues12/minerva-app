"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Hamburguer from "./svgs/Hamburguer";
import SideBar from "./SideBar";
import NavDesktop from "./NavDesktop";
import { deleteCookie } from "cookies-next";
import Button from "../layout/Button";
import { useUserContext } from "@/contexts/userData";
import { useSectionContext } from "@/contexts/section";
import { useThemeContext } from "@/contexts/darkMode";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { section } = useSectionContext();
  const { user } = useUserContext();
  const { theme } = useThemeContext();

  return (
    <header
      className={`flex items-center h-[8vh] w-full bg-background03 md:bg-background02 text-textColor font-inter border-b-2 border-borderColor md:h-[10vh] xl:h-[100px] ${
        section === "home" || section === "login" || section === "register"
          ? "light"
          : theme
      }`}
    >
      <div
        className="w-full px-[13px] flex items-center justify-between h-full md:px-[100px] lg:px-[60px] xl:px-[100px] 
      2xl:px-[301px]"
      >
        <div className="text-[16px] hover:text-textColor cursor-pointer leading-5 md:text-[20px] xl:text-[22px]">
          <Link href={"/home"}>Minerva</Link>
        </div>
        {!user ? (
          <div>
            <NavDesktop />
            <div className="lg:hidden">
              <Hamburguer
                className="cursor-pointer stroke-textColor stroke-2 md:size-[28px] md:stroke-1"
                onClick={() => {
                  setIsOpen(true);
                }}
              />
              <AnimatePresence>
                {isOpen && (
                  <SideBar
                    isTablet={false}
                    setIsOpen={setIsOpen}
                    className="md:hidden"
                  />
                )}
                {isOpen && (
                  <SideBar
                    key={1}
                    isTablet={true}
                    setIsOpen={setIsOpen}
                    className="hidden md:block lg:hidden"
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <nav>
            <Button
              className="hidden lg:block"
              onClick={() => {
                deleteCookie("authorization");
                deleteCookie("username");
                window.location.href = `/login`;
              }}
            >
              Logout
            </Button>

            <Hamburguer
              className="cursor-pointer stroke-textColor stroke-2 md:size-[28px] md:stroke-1 lg:hidden"
              onClick={() => {
                setIsOpen(true);
              }}
            />
            <AnimatePresence>
              {isOpen && (
                <SideBar
                  isTablet={false}
                  setIsOpen={setIsOpen}
                  className="md:hidden"
                />
              )}
              {isOpen && (
                <SideBar
                  key={1}
                  isTablet={true}
                  setIsOpen={setIsOpen}
                  className="hidden md:block lg:hidden"
                />
              )}
            </AnimatePresence>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
