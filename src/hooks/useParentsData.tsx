"use client";

import { AlunoObj } from "@/models/userModel";
import { useQuery } from "@tanstack/react-query";

export function useParentsData(idAluno: string) {
  const getAlunoData = async (): Promise<AlunoObj | null> => {
    const data = await fetch(`${process.env.HOST}/api/student/get_subjects`, {
      method: "POST",
      body: JSON.stringify({ idAluno }),
    });
    const { aluno } = await data.json();
    if (!aluno) return null;
    return aluno;
  };

  const query = useQuery<AlunoObj | null>({
    queryFn: getAlunoData,
    queryKey: ["aluno-parents-data"],
  });

  return query;
}
