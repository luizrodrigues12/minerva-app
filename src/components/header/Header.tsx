"use client";

import { getCookie } from "cookies-next/client";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Hamburguer from "./svgs/Hamburguer";
import SideBar from "./SideBar";
import NavDesktop from "./NavDesktop";
import { deleteCookie } from "cookies-next";
import Button from "../layout/Button";

const Header = () => {
  const tokenCookie = getCookie("authorization");
  const [token, setToken] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);

  const getUser = async () => {
    try {
      const res = await fetch(`${process.env.HOST}/api/user/get_user`, {
        method: "POST",
        body: JSON.stringify({ token: tokenCookie }),
      });
      const { user } = await res.json();
      if (!user) throw new Error("Usuário não encontrado");

      setToken(user.token);
    } catch (error) {
      setToken("");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <header className="flex items-center h-[8vh] w-full bg-background01 text-black font-inter border-b-2 border-borderColor md:h-[10vh] xl:h-[100px] relative bottom-0">
      <div className="w-full px-[32px] flex items-center justify-between h-full md:px-[100px] lg:px-[80px] xl:px-[195px] ">
        <motion.div className="text-[16px] hover:text-roxominerva cursor-pointer leading-5 md:text-[20px] xl:text-[22px]">
          <Link href={token ? "/home" : "/"}>Minerva</Link>
        </motion.div>
        {!token ? (
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
