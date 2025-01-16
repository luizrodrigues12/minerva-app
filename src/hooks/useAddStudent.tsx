import { useUserContext } from "@/contexts/userData";
import { capitalize } from "@/utils/stringManipulation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { useRouter } from "nextjs-toploader/app";

const token = getCookie("authorization");

type AddStudentProps = {
  idStudent: string;
  nome: string;
  checkedsPrep: Array<string>;
  checkedsSubjects: any;
};

export function useAddStudent({
  nome,
  checkedsPrep,
  idStudent,
  checkedsSubjects,
}: AddStudentProps) {
  const queryClient = useQueryClient();
  const { refetch } = useUserContext();
  const router = useRouter();

  const postStudent = async (data: {
    idStudent: string;
    nome: string;
    checkedsPrep: Array<string>;
    checkedsSubjects: any;
  }) => {
    const res = await fetch(`${process.env.HOST}/api/student/add_student`, {
      method: "POST",
      body: JSON.stringify({
        idAluno: idStudent,
        nome: capitalize(nome),
        preparatorio: checkedsPrep,
        checkeds: checkedsSubjects,
        token,
      }),
    });

    const { alunos } = await res.json();
    refetch();
    return alunos;
  };

  const mutate = useMutation({
    mutationFn: postStudent,

    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["alunos-data"] });
      router.push("/home");
    },
    retry: 2,
  });

  return mutate;
}
