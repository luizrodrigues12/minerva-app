import { dataMongoUser } from "@/models/userModel";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteAllPlanning() {
  const queryClient = useQueryClient();

  const deleteAllPlanning = async ({ idAluno }: { idAluno: string }) => {
    try {
      const res = await fetch(`${process.env.HOST}/api/planning/delete_all`, {
        method: "DELETE",
        body: JSON.stringify({ idAluno }),
      });
      const { user, error } = await res.json();
      if (error) throw new Error(error);
      if (user) return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const mutate = useMutation({
    mutationFn: deleteAllPlanning,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["data-usuario"] });

      const previousUser = await queryClient.getQueryData(["data-usuario"]);

      await queryClient.setQueryData(
        ["data-usuario"],
        (oldUser: dataMongoUser) => {
          const tratedStudents = oldUser.alunos?.map((aluno) => {
            if (aluno.idAluno === variables.idAluno) {
              return { ...aluno, planning: [] };
            }
            return aluno;
          });

          return { ...oldUser, alunos: tratedStudents };
        }
      );

      return { previousUser };
    },

    onError: async (error, variables, context) => {
      await queryClient.setQueryData(
        ["data-usuario"],
        () => context?.previousUser
      );
    },
  });

  return mutate;
}
