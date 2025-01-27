"use client";

import { AlunoObj } from "@/models/userModel";
import { useQuery } from "@tanstack/react-query";

interface ParentsDataType {
  aluno: AlunoObj;
  user: { name: string; avatar: string };
}

export function useParentsData(idAluno: string) {
  const getAlunoData = async (): Promise<ParentsDataType | null> => {
    const data = await fetch(`${process.env.HOST}/api/student/get_subjects`, {
      method: "POST",
      body: JSON.stringify({ idAluno }),
    });
    const { aluno, user } = await data.json();
    if (!aluno) return null;
    return { aluno, user };
  };

  const query = useQuery<ParentsDataType | null>({
    queryFn: getAlunoData,
    queryKey: ["aluno-parents-data"],
  });

  return query;
}
