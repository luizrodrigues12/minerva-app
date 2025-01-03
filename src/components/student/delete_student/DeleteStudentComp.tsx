"use client";

import { getCookie } from "cookies-next";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { motion } from "motion/react";
import Loading from "@/components/layout/Loading";

const DeleteStudentComp = ({ idAluno }: { idAluno: string }) => {
  const router = useRouter();
  const token = getCookie("authorization");

  const fetcher = (url: string) =>
    fetch(`${process.env.HOST}/api/student/get_student`, {
      method: "POST",
      body: JSON.stringify({ idAluno: idAluno, token: token }),
    }).then(async (res) => {
      const { aluno } = await res.json();
      return aluno[0];
    });

  const {
    data: oneStudent,
    mutate,
    isValidating,
  } = useSWR(`${process.env.HOST}/api/subject/get_subjects`, fetcher);

  const deleteStudent = async (e: any) => {
    e.preventDefault();
    const result = await fetch(
      `${process.env.HOST}/api/student/delete_student/`,
      {
        method: "DELETE",
        body: JSON.stringify({ token: token, idAluno: idAluno }),
      }
    );
    window.location.href = "/home";
  };

  useEffect(() => {}, []);

  return (
    <div className="w-full flex flex-col justify-center items-center height_pattern">
      {isValidating ? (
        <Loading />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="px-8 md:self-center rounded-lg md:px-6 md:py-5 md:w-[400px] md:border-zinc-800 md:border-2"
        >
          <div className="flex flex-col justify-center gap-1">
            <div className="flex items-center justify-center gap-2">
              <h2 className="font-medium text-xl w-[270px] text-center text-zinc-200">
                Remover Aluno
              </h2>
            </div>
            <hr className="bg-zinc-800 h-0.5 mt-2 mb-1 border-none" />
            <div className="flex flex-col gap-1.5">
              <h3 className="text-[1rem]">Username</h3>
              <div className="bg-zinc-800 p-1.5 pl-2.5 rounded-lg border-2 border-zinc-800">
                {oneStudent?.nome}
              </div>

              <h3 className="text-[1rem]">Preparatório(s)</h3>
              <div className="bg-zinc-800 p-1.5 pl-2.5 rounded-lg flex gap-1 border-2 border-zinc-800">
                {oneStudent?.preparatorio?.map((prep: any, i: any) =>
                  prep == "aplicação" ? (
                    <p key={i}>{prep[0].toUpperCase() + prep.substring(1)} </p>
                  ) : (
                    <p key={i}>{prep.toUpperCase()}</p>
                  )
                )}
              </div>
            </div>

            <div className="bg-zinc-900 p-1.5 mt-2 pl-2.5 rounded-lg flex gap-1 border-2 border-zinc-800 mb-2 text-zinc-100">
              Certifique-se de que realmente desejas remover esse aluno, pois
              essa ação é irreversível.
            </div>
            <button
              onClick={(e) => deleteStudent(e)}
              className="flex items-center justify-center rounded-lg text-[15px] p-2 py-2 w-full text-zinc-200 bg-[#961f17de] tracking-wider hover:bg-[#961f17ad]"
            >
              Remover Aluno
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DeleteStudentComp;
