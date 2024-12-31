"use client";

import { Edit, TrashBin } from "flowbite-react-icons/outline";
import { useRouter } from "nextjs-toploader/app";
import Link from "next/link";
import { motion } from "motion/react";

const AlunosComp = ({ text, idAluno }: { text: string; idAluno: string }) => {
  const router = useRouter();
  return (
    <div className="container_alunos">
      <div className=" flex p-2 pb-1.5 px-3 rounded-lg border-2 border-zinc-800 shadow-lg justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.1 }}
          whileTap={{ scale: 1 }}
          onClick={() => router.push(`/student/${idAluno}`)}
          className="text-[17px] tracking-wide text-zinc-300  cursor-pointer hover:underline underline-offset-[3px] hover:text-zinc-200"
        >
          {text}
        </motion.div>
        <div className="options flex gap-3">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.1 }}
            whileTap={{ scale: 1 }}
            onClick={() => router.push(`/student/update_student/${idAluno}`)}
            className="cursor-pointer"
          >
            <Edit className="text-zinc-400 hover:text-zinc-200" />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.1 }}
            whileTap={{ scale: 1 }}
            onClick={() => router.push(`/student/delete_student/${idAluno}`)}
            className="cursor-pointer"
          >
            <TrashBin className="text-zinc-400 hover:text-zinc-200" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AlunosComp;
