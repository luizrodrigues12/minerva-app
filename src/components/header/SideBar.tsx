"use client";

import { CloseCircle, Moon, Sun } from "flowbite-react-icons/outline";
import { motion } from "motion/react";
import { Dispatch, SetStateAction } from "react";
import { useSectionContext } from "@/contexts/section";
import { useRouter } from "nextjs-toploader/app";
import { useUserContext } from "@/contexts/userData";
import { useThemeContext } from "@/contexts/darkMode";

type SideBarProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isTablet?: boolean;
  className?: string;
};

const SideBar = ({ setIsOpen, isTablet, className }: SideBarProps) => {
  const { section } = useSectionContext();
  const router = useRouter();
  const { user } = useUserContext();
  const { theme, toggleTheme } = useThemeContext();

  return (
    <motion.div
      animate={{ width: isTablet ? [0, 300] : [0, 195] }}
      transition={{ duration: 0.1 }}
      exit={{ width: [195, 0] }}
      className={`fixed ${
        isTablet ? "w-[300px]" : "w-[195px]"
      } right-0 top-0 z-50 bg-headerColor h-full border-l-[1px] md:border-l-2 border-borderColor text-[14px] md:text-[16px] ${className}`}
    >
      {user ? (
        <div>
          <div className="h-[8vh] flex items-center justify-end pr-[11px] border-b-[1px] md:border-b-2 border-borderColor md:pr-0 md:justify-center md:h-[10vh] xl:h-[100px]">
            <CloseCircle
              strokeWidth={2}
              size={25}
              className="cursor-pointer md:size-[30px]"
              onClick={() => setIsOpen(false)}
            />
          </div>
          <div
            className={`h-[65px] flex items-center justify-center border-b-[1px] md:border-b-2 border-borderColor  ${
              section === "students" ? "text-corIcones font-interMedium " : ""
            }`}
            onClick={() => {
              router.push("/home");
              setIsOpen(false);
            }}
          >
            alunos
          </div>

          <div
            className={`h-[65px] flex items-center justify-center border-b-[1px] md:border-b-2 border-borderColor  ${
              section === "planning" ? "text-corIcones font-interMedium " : ""
            }`}
            onClick={() => {
              router.push("/planning");
              setIsOpen(false);
            }}
          >
            planejamentos
          </div>

          <div
            className={`h-[65px] flex items-center justify-center border-b-[1px] md:border-b-2 border-borderColor ${
              section === "profile"
                ? "text-corIcones font-interMedium"
                : "text-textColor"
            }`}
            onClick={() => {
              router.push("/profile");
              setIsOpen(false);
            }}
          >
            perfil
          </div>
          <div
            className="flex items-center justify-center border-b-[1px] md:border-b-2 border-borderColor gap-[5px] cursor-pointer"
            onClick={toggleTheme}
          >
            <div className="h-[65px] flex items-center justify-center ">
              {theme === "dark" ? (
                <Sun className="md:size-8" />
              ) : (
                <Moon className="md:size-7" />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="h-[8vh] flex items-center justify-end border-b-[1px] md:border-b-2 border-b-borderColor pr-[24px] md:pr-0 md:justify-center md:h-[10vh] xl:h-[100px]">
            <CloseCircle
              strokeWidth={2}
              size={25}
              className="cursor-pointer md:size-[30px]"
              onClick={() => setIsOpen(false)}
            />
          </div>
          <div
            className={`h-[65px] flex items-center justify-center border-b-[1px] md:border-b-2 border-b-borderColor ${
              section === "home"
                ? "text-roxominerva font-interMedium bg-background03"
                : ""
            }`}
            onClick={() => {
              router.push("/");
            }}
          >
            home
          </div>
          <div
            className={`h-[65px] flex items-center justify-center border-b-[1px] md:border-b-2 border-b-borderColor ${
              section === "login"
                ? "text-roxominerva font-interMedium bg-background03"
                : ""
            }`}
            onClick={() => {
              router.push("/login");
            }}
          >
            login
          </div>
          <div
            className={`h-[65px] flex items-center justify-center border-b-[1px] md:border-b-2 border-b-borderColor ${
              section === "register"
                ? "text-roxominerva font-interMedium bg-background03"
                : ""
            }`}
            onClick={() => {
              router.push("/register");
            }}
          >
            register
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default SideBar;
