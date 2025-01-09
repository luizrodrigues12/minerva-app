"use client";

import {
  CalendarEdit,
  Edit,
  ShareAll,
  TrashBin,
  UserEdit,
} from "flowbite-react-icons/outline";
import { useRouter } from "nextjs-toploader/app";
import { motion } from "motion/react";

const transformName = (name: string) => {
  const separatedNames = name.toLowerCase().split(" ");
  return separatedNames.map(
    (palavra, i) => palavra.split("")[0].toUpperCase() + palavra.slice(1) + " "
  );
};

const AlunosComp = ({ name }: { name: string; idAluno: string }) => {
  return (
    <div className="w-full text-black py-2 px-4 rounded-md bg-background01 flex items-center justify-between text-[16px] md:text-[16px]">
      <motion.div className="hover:text-roxominerva cursor-pointer pr-1 md:pr-3">
        {transformName(name)}
      </motion.div>

      <div className="flex gap-1 md:gap-3 items-center">
        <motion.div
          whileHover={{ scale: 1.05, transition: { duration: 0.05 } }}
          whileTap={{ scale: 0.99 }}
        >
          <ShareAll
            size={28}
            strokeWidth={1.5}
            className="mr-1 cursor-pointer hover:text-roxominerva size-[28px] md:size-[28px]"
          />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.04, transition: { duration: 0.05 } }}
          whileTap={{ scale: 0.99 }}
        >
          <UserEdit
            size={28}
            strokeWidth={1.5}
            className="cursor-pointer hover:text-roxominerva size-[28px] md:size-[28px]"
          />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05, transition: { duration: 0.05 } }}
          whileTap={{ scale: 0.99 }}
        >
          <TrashBin
            size={22.5}
            strokeWidth={1.5}
            className="cursor-pointer hover:text-roxominerva size-[22.5px] md:size-[22.5px]"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default AlunosComp;
