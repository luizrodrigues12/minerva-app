import { useUserContext } from "@/contexts/userData";
import { dataMongoUser } from "@/models/userModel";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "nextjs-toploader/app";

export function useDeleteStudent() {
  const { user } = useUserContext();
  const queryClient = useQueryClient();
  const router = useRouter();

  const deleteStudent = async ({ idAluno }: { idAluno: string }) => {
    if (!idAluno) throw new Error("IdAluno inexistente!");

    const result = await fetch(
      `${process.env.HOST}/api/student/delete_student/`,
      {
        method: "DELETE",
        body: JSON.stringify({ token: user.token, idAluno: idAluno }),
      }
    );

    const { error, user: userData } = await result.json();
    if (error) throw new Error(error);
    const data: dataMongoUser = userData;
    return data;
  };

  const mutate = useMutation({
    mutationFn: deleteStudent,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["data-usuario"] });

      const previousUser = await queryClient.getQueryData(["data-usuario"]);

      await queryClient.setQueryData(
        ["data-usuario"],
        (oldUser: dataMongoUser) => {
          const result: dataMongoUser = {
            ...oldUser,
            alunos: oldUser.alunos?.filter(
              (aluno) => aluno.idAluno !== variables.idAluno
            ),
          };

          return result;
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

    onSuccess() {
      router.replace("/home");
    },

    retry: 2,
  });

  return mutate;
}
