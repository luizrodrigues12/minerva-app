import { idToSubjects } from "@/actions/idToSubjects";
import { useUserContext } from "@/contexts/userData";
import { MateriaType } from "@/models/MateriasModel";
import { AlunoObj } from "@/models/userModel";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { useRouter } from "nextjs-toploader/app";

const token = getCookie("authorization");

export function useAddStudent(
  idStudent: string,
  nome: string,
  checkedsPrep: Array<string>,
  checkedsSubjects: any
) {
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
        nome: nome,
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

    // onMutate: async (variables) => {
    //   await queryClient.cancelQueries({ queryKey: ["alunos-data"] });

    //   const oldStudents = queryClient.getQueryData(["alunos-data"]);

    //   queryClient.setQueryData(
    //     ["alunos-data"],
    //     async (oldStudents: Array<AlunoObj>) => {
    //       const subjectsNew: Array<MateriaType> = await idToSubjects(
    //         JSON.stringify(variables.checkedsSubjects])
    //       );
    //       return [
    //         ...oldStudents,
    //         {
    //           idAluno: variables.idStudent,
    //           nome: variables.nomeAluno,
    //           preparatorio: variables.checkedsPrep,
    //           materias: subjectsNew,
    //         },
    //       ];
    //     }
    //   );

    //   return { oldStudents };
    // },

    // onError(error, variables, context) {
    //   queryClient.setQueryData(["alunos-data"], context?.oldStudents);
    // },

    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["alunos-data"] });
      router.push("/home");
    },
    retry: 2,
  });

  return mutate;
}
