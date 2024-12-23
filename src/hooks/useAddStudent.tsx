import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCookie } from "cookies-next";

const token = getCookie("authorization");

export function useAddStudent(
  idStudent: string,
  nomeAluno: string,
  checkedsPrep: Array<string>,
  checkedsSubjects: any
) {
  const queryClient = useQueryClient();

  const postStudent = async (data: {
    idStudent: string;
    nomeAluno: string;
    checkedsPrep: Array<string>;
    checkedsSubjects: any;
  }) => {
    const res = await fetch(`${process.env.HOST}/api/student/add_student`, {
      method: "POST",
      body: JSON.stringify({
        idAluno: idStudent,
        nome: nomeAluno.trim(),
        preparatorio: checkedsPrep,
        checkeds: checkedsSubjects,
        token,
      }),
    });

    const { alunos } = await res.json();
    return alunos;
  };

  const mutate = useMutation({
    mutationFn: postStudent,

    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["alunos-data"] });
    },
    retry: 2,
  });

  return mutate;
}