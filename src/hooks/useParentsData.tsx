"use client";

import { AlunoObj } from "@/models/userModel";
import { useQuery } from "@tanstack/react-query";

export function useParentsData(idAluno: string) {
  const getAlunoData = async (): Promise<AlunoObj> => {
    const data = await fetch(`${process.env.HOST}/api/student/get_subjects`, {
      method: "POST",
      body: JSON.stringify({ idAluno }),
    });
    const { aluno } = await data.json();
    return aluno;
  };

  const query = useQuery<AlunoObj>({
    queryFn: getAlunoData,
    queryKey: ["aluno-parents-data"],
  });

  return query;
}
