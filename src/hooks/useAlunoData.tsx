import { useQuery } from "@tanstack/react-query";

export function useAlunoData(idAluno: string, token: string) {
  const getAlunoData = async () => {
    const data = await fetch(`${process.env.HOST}/api/student/get_student`, {
      method: "POST",
      body: JSON.stringify({ idAluno: idAluno, token: token }),
    });
    const { aluno } = await data.json();
    return aluno[0];
  };

  const query = useQuery({
    queryFn: getAlunoData,
    queryKey: ["aluno-data"],
  });

  return query;
}
