"use client";

import { AlunosObj } from "@/stores/userStore";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const RemoveStudentComp = ({ idAluno }: { idAluno: string }) => {
  const router = useRouter();
  const [oneStudent, setOneStudent] = useState<AlunosObj>();
  const token = getCookie("authorization");

  const getAluno = async () => {
    const result = await fetch(`${process.env.HOST}/api/student/get_student`, {
      method: "POST",
      body: JSON.stringify({ idAluno: idAluno, token: token }),
    });
    // Pegando aluno do return
    const { aluno } = await result.json();
    setOneStudent(aluno[0]);

    // Verificando se o aluno pertence ao professor
    if (!aluno[0]) router.push("/home");
  };

  const deleteStudent = async (e: any) => {
    e.preventDefault();
    const result = await fetch(
      `${process.env.HOST}/api/student/delete_student/`,
      {
        method: "DELETE",
        body: JSON.stringify({ token: token, idAluno: idAluno }),
      }
    );
    window.location.replace("/home");
  };

  useEffect(() => {
    getAluno();
  }, []);

  return (
    <div className="px-8 md:self-center rounded-lg md:px-6 md:py-5 md:w-[400px] md:border-zinc-800 md:border-2">
      <div className="flex flex-col justify-center gap-1">
        <div className="flex items-center justify-center gap-2">
          <h2 className="font-medium text-xl w-[270px] text-center text-zinc-200">
            Remover Aluno
          </h2>
        </div>
        <hr className="bg-zinc-800 h-0.5 mt-2 mb-1 border-none" />
        <div className="flex flex-col gap-1.5">
          <h3 className="text-[1rem]">Username</h3>
          <div className="bg-zinc-800 p-1.5 pl-2.5 rounded-lg border-2 border-[#961f17de]">
            {oneStudent?.nome}
          </div>

          <h3 className="text-[1rem]">Preparatório(s)</h3>
          <div className="bg-zinc-800 p-1.5 pl-2.5 rounded-lg flex gap-1 border-2 border-[#961f17de]">
            {oneStudent?.preparatorio?.map((prep, i) =>
              prep == "aplicação" ? (
                <p key={i}>{prep[0].toUpperCase() + prep.substring(1)} </p>
              ) : (
                <p key={i}>{prep.toUpperCase()}</p>
              )
            )}
          </div>
        </div>
        <hr className="bg-zinc-800 h-0.5 my-2 border-none" />
        <div className="bg-zinc-900 p-1.5 pl-2.5 rounded-lg flex gap-1 border-2 border-[#961f17de] mb-2 text-zinc-100">
          Certifique-se de que realmente desejas remover esse aluno, pois essa
          ação é irreversível.
        </div>
        <button
          onClick={(e) => deleteStudent(e)}
          className="flex items-center justify-center rounded-lg text-[14px] font-medium p-2 w-full md:p-[7px] text-zinc-200 bg-[#961f17de] tracking-wider"
        >
          Remover Aluno
        </button>
      </div>
    </div>
  );
};

export default RemoveStudentComp;
