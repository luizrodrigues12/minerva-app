"use client";

import { CloseCircle } from "flowbite-react-icons/outline";
import { AnimatePresence, motion } from "motion/react";
import MoonIcon from "./svgs/moonIcon";
import { Dispatch, SetStateAction } from "react";
import { useSectionContext } from "@/contexts/section";

const SideBar = ({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { section, setSection } = useSectionContext();

  return (
    <motion.div
      animate={{ width: [0, 195] }}
      transition={{ duration: 0.1 }}
      exit={{ width: [195, 0] }}
      className="fixed w-[195px] right-0 top-0 bg-background01 h-full border-l-2 border-borderColor 
       text-[14px]"
    >
      <div className="h-[65px] flex items-center justify-end border-b-2 border-b-borderColor pr-[32px]">
        <CloseCircle
          strokeWidth={2}
          size={25}
          className=" cursor-pointer"
          onClick={() => setIsOpen(false)}
        />
      </div>
      <div
        className={`h-[65px] flex items-center justify-center border-b-2 border-b-borderColor ${
          section === "home"
            ? "text-roxominerva font-interMedium bg-[#C1C1C1]"
            : ""
        }`}
        onClick={() => setSection("home")}
      >
        home
      </div>
      <div
        className={`h-[65px] flex items-center justify-center border-b-2 border-b-borderColor ${
          section === "login"
            ? "text-roxominerva font-interMedium bg-[#C1C1C1]"
            : ""
        }`}
        onClick={() => setSection("login")}
      >
        login
      </div>
      <div
        className={`h-[65px] flex items-center justify-center border-b-2 border-b-borderColor ${
          section === "register"
            ? "text-roxominerva font-interMedium bg-[#C1C1C1]"
            : ""
        }`}
        onClick={() => setSection("register")}
      >
        register
      </div>
      <div className="flex items-center justify-center border-b-2 border-b-borderColor gap-[5px] cursor-pointer">
        <MoonIcon className="size-[21px]" />
        <div className="h-[65px] flex items-center justify-center ">escuro</div>
      </div>
    </motion.div>
  );
};

export default SideBar;
