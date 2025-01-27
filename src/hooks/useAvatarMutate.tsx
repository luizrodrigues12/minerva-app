"use client";

import { useUserContext } from "@/contexts/userData";
import { dataMongoUser } from "@/models/userModel";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateAvatarProps {
  file?: File;
  isDelete?: boolean;
}

export function useAvatarMutate() {
  const { user } = useUserContext();

  const queryClient = useQueryClient();

  const updateAvatar = async ({ file }: UpdateAvatarProps) => {
    if (!file) throw new Error("Escolha uma foto.");

    const formData = new FormData();
    formData.append("image", file!);
    formData.append("token", user.token!);

    const res = await fetch(`${process.env.HOST}/api/user/avatar`, {
      method: "PUT",
      body: formData,
    });

    const { error, user: userFromBack } = await res.json();
    if (error) throw new Error(error);
    const data: dataMongoUser = userFromBack;

    return data;
  };

  const mutate = useMutation({
    mutationFn: updateAvatar,
    mutationKey: ["update-avatar"],

    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["data-usuario"] });
      const previousUser = await queryClient.getQueryData(["data-usuario"]);
      return { previousUser };
    },

    onError(error, variables, context) {
      queryClient.setQueryData(
        ["data-usuario"],
        (oldUser: dataMongoUser) => context?.previousUser
      );
    },

    retry: 2,
  });

  return mutate;
}
