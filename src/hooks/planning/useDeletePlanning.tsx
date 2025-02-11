"use client";

import { dataMongoUser } from "@/models/userModel";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "nextjs-toploader/app";

export function useDeletePlanning() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const deletePlanning = async ({
    idAluno,
    planningId,
  }: {
    planningId: string;
    idAluno: string;
  }) => {
    const res = await fetch(
      `${process.env.HOST}/api/planning/delete_planning`,
      {
        method: "DELETE",
        body: JSON.stringify({ planningId, idAluno }),
      }
    );
    const { planning } = await res.json();
    return planning;
  };

  const mutate = useMutation({
    mutationFn: deletePlanning,

    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["data-usuario"] });

      const previousUser = await queryClient.getQueryData(["data-usuario"]);

      return { previousUser };
    },

    onSuccess: async (data, variables, context) => {
      await queryClient.setQueryData(
        ["data-usuario"],
        (oldUser: dataMongoUser) => {
          const result = oldUser.alunos?.map((aluno) => {
            if (aluno.idAluno === variables.idAluno) {
              return { ...aluno, planning: data };
            } else {
              return aluno;
            }
          });
          console.log(data);
          if (data.length === 0) router.replace("/planning");
          return { ...oldUser, alunos: result };
        }
      );
    },

    onError: async (error, _, context) => {
      await queryClient.setQueryData(
        ["data-usuario"],
        () => context?.previousUser
      );
      throw new Error(error.message);
    },
  });

  return mutate;
}
