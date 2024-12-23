import { getCookie } from "cookies-next";
import { useMutation } from "@tanstack/react-query";

const token = getCookie("authorization");

export function useDeleteUser() {
  const deleteUser = async () => {
    await fetch(`${process.env.HOST}/api/user/delete_user`, {
      method: "POST",
      body: JSON.stringify({ token: token }),
    });
  };

  const mutate = useMutation({ mutationFn: deleteUser });

  return mutate;
}
