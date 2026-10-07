import { getCookie } from "cookies-next";
import { useMutation } from "@tanstack/react-query";

const token = getCookie("authorization");

export function useDeleteUser() {
  const deleteUser = async () => {
    await fetch(`/api/user/delete_user`, {
      method: "POST",
      headers: { "content-type": "application/json" }, body: JSON.stringify({ token: token }),
    });
  };

  const mutate = useMutation({ mutationFn: deleteUser });

  return mutate;
}
