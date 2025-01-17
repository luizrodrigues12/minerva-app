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

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { section } = useSectionContext();
  const { user } = useUserContext();

  useEffect(() => {}, []);

  return (
    <header className="flex items-center h-[8vh] w-full bg-background02 text-black font-inter border-b-2 border-borderColor md:h-[10vh] xl:h-[100px]">
      <div
        className="w-full px-[13px] flex items-center justify-between h-full md:px-[100px] lg:px-[60px] xl:px-[100px] 
      2xl:px-[301px]"
      >
        <motion.div className="text-[16px] hover:text-roxominerva cursor-pointer leading-5 md:text-[20px] xl:text-[22px]">
          <Link href={"/home"}>Minerva</Link>
        </motion.div>
        {!user ? (
          <>
            <NavDesktop />
            <div className="lg:hidden">
              <Hamburguer
                className="cursor-pointer stroke-2 md:size-[28px] md:stroke-1"
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
          </>
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
              className="cursor-pointer stroke-2 md:size-[28px] md:stroke-1 lg:hidden"
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
