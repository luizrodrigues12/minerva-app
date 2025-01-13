import { AlunoObj } from "@/models/userModel";
import { useQuery } from "@tanstack/react-query";

export function useParentsData(idAluno: string) {
  const getAlunoData = async () => {
    const data = await fetch(`${process.env.HOST}/api/student/get_subjects`, {
      method: "POST",
      body: JSON.stringify({ idAluno }),
    });
    const { aluno } = await data.json();
    return aluno;
  };

  const query = useQuery<AlunoObj>({
    queryFn: getAlunoData,
    queryKey: ["subjects-data"],
  });

  return query;
}
