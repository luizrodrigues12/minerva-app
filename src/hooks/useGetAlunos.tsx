import { useQuery } from "@tanstack/react-query";
import { AlunoObj } from "@/models/userModel";

export function useGetAlunos(token: string) {
  const getAlunos = async (): Promise<AlunoObj[]> => {
    const data = await fetch(`${process.env.HOST}/api/student/get_students`, {
      method: "POST",
      body: JSON.stringify({ token: token }),
    });
    const { alunos } = await data.json();
    return alunos;
  };

  const query = useQuery({ queryFn: getAlunos, queryKey: ["alunos-data"] });
  return query;
}

export default useGetAlunos;
