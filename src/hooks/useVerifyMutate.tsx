import { dataMongoUser } from "@/models/userModel";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type VerifyProps = {
  email: string;
};

export function useVerifyMutate() {
  const queryClient = useQueryClient();

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

    // Alterando isVerified para true sem fazer refetch
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["data-usuario"] });

      const previousUser: dataMongoUser = await queryClient.getQueryData([
        "data-usuario",
      ])!;

      await queryClient.setQueryData(
        ["data-usuario"],
        (oldUser: dataMongoUser) => {
          const result: dataMongoUser = { ...oldUser, isVerified: true };
          return result;
        }
      );

      return { previousUser };
    },

    onError(error, variables, context) {
      queryClient.setQueryData(["data-usuario"], () => context?.previousUser);
    },
    retry: 2,
  });

  return mutate;
}
