"use client";

import { useUserContext } from "@/contexts/userData";
import { dataMongoUser } from "@/models/userModel";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteAvatar() {
  const { user } = useUserContext();

  const queryClient = useQueryClient();

  const deleteAvatar = async () => {
    const res = await fetch(`${process.env.HOST}/api/user/avatar`, {
      method: "DELETE",
      body: JSON.stringify({ token: user.token }),
    });
    const { error, user: data } = await res.json();
    if (error) throw new Error(error);

    return data;
  };

  const mutate = useMutation({
    mutationFn: deleteAvatar,

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["data-usuario"] });

      const previousUser = await queryClient.getQueryData(["data-usuario"]);

      await queryClient.setQueryData(
        ["data-usuario"],
        (oldUser: dataMongoUser) => {
          const result: dataMongoUser = {
            ...oldUser,
            avatar: "",
            avatar_key: "",
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
    retry: 2,
  });

  return mutate;
}
