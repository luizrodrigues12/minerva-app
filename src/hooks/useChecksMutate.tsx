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
      await queryClient.cancelQueries({ queryKey: ["aluno-data"] });

      // Pegando dados existentes
      const previousAluno = queryClient.getQueryData(["aluno-data"]);

      // Alterando dados
      queryClient.setQueryData(["aluno-data"], (oldAluno: any) => {
        const objMateriaToggled = {
          ...variables.objMateria,
          isChecked: !variables.objMateria.isChecked,
        };
        return {
          ...oldAluno,
          materias: [
            ...oldAluno.materias?.map((mat: any) =>
              mat == objMateria ? objMateriaToggled : mat
            ),
          ],
        };
      });
      return { previousAluno };
    },

    // Tratando erro na request
    onError(error, variables, context) {
      queryClient.setQueryData(["aluno-data"], context?.previousAluno);
    },
    retry: 2,
  });

  return mutate;
}
