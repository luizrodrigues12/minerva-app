"use client";

import {
  CalendarWeek,
  ShareAll,
  TrashBin,
  UserEdit,
  Edit,
  Download,
  CalendarEdit,
} from "flowbite-react-icons/outline";
import { useRouter } from "nextjs-toploader/app";
import { motion } from "motion/react";
import { useUserContext } from "@/contexts/userData";
import { useState } from "react";

type AlunoCompProps = { name?: string; idAluno: string; isPlanning?: boolean };

const AlunosComp = ({ idAluno, isPlanning = false }: AlunoCompProps) => {
  const router = useRouter();
  const { getAluno } = useUserContext();
  const aluno = getAluno(idAluno);

  return (
    <div className="w-full text-textColor rounded-md bg-background03 flex items-center justify-between text-[14px] md:text-[16px]">
      <motion.div
        whileHover={{ scale: 1.005 }}
        whileTap={{ scale: 1 }}
        transition={{ duration: 0.05 }}
        className="hover:text-corIconesHover cursor-pointer w-full h-full py-2.5 px-3"
        onClick={() => {
          if (isPlanning) {
            router.push(`/planning/${idAluno}`);
            return;
          }
          router.push(`/student/${idAluno}`);
        }}
      >
        {aluno?.nome}
      </motion.div>

      {!isPlanning ? (
        <div className="flex gap-2.5 items-center px-3">
          <motion.div
            whileHover={{ scale: 1.05, transition: { duration: 0.05 } }}
            whileTap={{ scale: 0.99 }}
          >
            <ShareAll
              size={28}
              strokeWidth={1.5}
              className="mr-1 cursor-pointer hover:text-corIconesHover size-[26px] md:size-[28px]"
              onClick={() => {
                navigator.share({
                  title: `Informações de ${aluno?.nome}`,
                  url: `${process.env.HOST}/parents/get_subjects/${idAluno}`,
                });
              }}
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.04, transition: { duration: 0.05 } }}
            whileTap={{ scale: 0.99 }}
          >
            <UserEdit
              size={28}
              strokeWidth={1.5}
              className="cursor-pointer hover:text-corIconesHover size-[26px] md:size-[28px]"
              onClick={() => router.push(`/student/update_student/${idAluno}`)}
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, transition: { duration: 0.05 } }}
            whileTap={{ scale: 0.99 }}
          >
            <TrashBin
              size={22.5}
              strokeWidth={1.5}
              className="cursor-pointer hover:text-corIconesHover size-[22px] md:size-[22.5px]"
              onClick={() => {
                router.push(`/student/delete_student/${idAluno}`);
              }}
            />
          </motion.div>
        </div>
      ) : (
        <motion.div
          whileHover={{ scale: 1.05, transition: { duration: 0.05 } }}
          whileTap={{ scale: 0.99 }}
          className="mr-3 rounded-full w-7 flex items-center justify-center cursor-pointer"
        >
          {aluno.planning?.length}
        </motion.div>
      )}
    </div>
  );
};

export default AlunosComp;
