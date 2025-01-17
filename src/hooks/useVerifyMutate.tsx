import { useUserContext } from "@/contexts/userData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type VerifyProps = {
  email: string;
};

export function useVerifyMutate() {
  const queryClient = useQueryClient();
  const { refetch } = useUserContext();

  const verifyEmail = async ({ email }: VerifyProps) => {
    const res = await fetch(`${process.env.HOST}/api/user/verify_email`, {
      method: "PUT",
      body: JSON.stringify({ email, verifyEmail: true }),
    });
    const data: { success: string; error: string } = await res.json();
    return data;
  };

  const mutate = useMutation({
    mutationFn: verifyEmail,

    onSuccess: () => {
      setTimeout(() => {
        refetch();
        window.location.replace("/home");
      }, 10000);
    },

    retry: 2,
  });

  return mutate;
}
