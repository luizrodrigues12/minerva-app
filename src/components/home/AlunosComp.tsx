"use client";

import {
  CalendarWeek,
  ShareAll,
  TrashBin,
  UserEdit,
} from "flowbite-react-icons/outline";
import { useRouter } from "nextjs-toploader/app";
import { motion } from "motion/react";
import { useUserContext } from "@/contexts/userData";
import { useState } from "react";
import Modal from "../layout/Modal";
import Button from "../layout/Button";
import { useDeleteAllPlanning } from "@/hooks/planning/useDeleteAllPlanning";

type AlunoCompProps = { name?: string; idAluno: string; isPlanning?: boolean };

const AlunosComp = ({ idAluno, isPlanning = false }: AlunoCompProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { getAluno } = useUserContext();
  const { mutate } = useDeleteAllPlanning();
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
        <div className="flex gap-2 mx-3">
          <motion.div
            whileHover={{ scale: 1.05, transition: { duration: 0.05 } }}
            whileTap={{ scale: 0.99 }}
          >
            <TrashBin
              size={22.5}
              strokeWidth={1.5}
              className="cursor-pointer hover:text-corIconesHover size-[22px] md:size-[22.5px]"
              onClick={() => {
                setIsOpen(true);
              }}
            />
          </motion.div>
        </div>
      )}

      {isOpen && (
        <Modal className="flex flex-col gap-2" setIsOpen={setIsOpen}>
          <div className="rounded-md p-3 bg-background02 text-center">
            Caso queira apagar todos os planejamentos ligados a{" "}
            <span className="font-interMedium">{aluno.nome}</span>, clique no
            botão abaixo.
          </div>
          <Button
            whileHover={{ scale: 1 }}
            className="!bg-errorButton"
            onClick={() => mutate({ idAluno })}
          >
            Apagar
          </Button>
        </Modal>
      )}
    </div>
  );
};

export default AlunosComp;
