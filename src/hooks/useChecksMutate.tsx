import { dataMongoUser } from "@/models/userModel";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useChecksMutate(objMateria: any, idAluno: any, token: any) {
  const queryClient = useQueryClient();

  //Função que faz o PUT
  const toggleCheckeds = async (data: {
    objMateria: any;
    idAluno: any;
    token: any;
  }) => {
    const res = await fetch(`${process.env.HOST}/api/student/toggle_checked`, {
      method: "PUT",
      body: JSON.stringify({ objMateria, idAluno, token }),
    });
    const { aluno } = await res.json();
    return { aluno: aluno };
  };

  // Criando mutate
  const mutate = useMutation({
    mutationFn: toggleCheckeds,

    //Atualizando sem fazer request
    onMutate: async (variables) => {
      // Cancelando request
      await queryClient.cancelQueries({ queryKey: ["data-usuario"] });

      // Pegando dados existentes
      const previousUser = queryClient.getQueryData(["data-usuario"]);

      // Alterando dados
      queryClient.setQueryData(["data-usuario"], (oldUser: dataMongoUser) => {
        const student = oldUser.alunos?.filter(
          (student) => student.idAluno === idAluno
        );
        const subjects = oldUser.alunos?.filter(
          (aluno) => aluno.idAluno == idAluno
        )[0].materias;
        const subjectToChange = subjects?.filter(
          (subject) => subject._id === objMateria._id
        );

        const result = {
          ...oldUser,
          alunos: oldUser.alunos?.map((aluno) => {
            if (aluno.idAluno === idAluno) {
              return {
                ...aluno,
                materias: aluno.materias?.map((subject) => {
                  if (subject._id === objMateria._id) {
                    return { ...subject, isChecked: !subject.isChecked };
                  } else {
                    return subject;
                  }
                }),
              };
            } else {
              return aluno;
            }
          }),
        };

        return result;
      });
      return { previousUser };
    },

    // Tratando erro na request
    onError(error, variables, context) {
      queryClient.setQueryData(["data-usuario"], context?.previousUser);
    },
    retry: 2,
  });

  return mutate;
}
