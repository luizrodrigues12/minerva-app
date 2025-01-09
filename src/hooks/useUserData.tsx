import { dataMongoUser } from "@/models/userModel";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";

const token = getCookie("authorization");

export function useUserData() {
  const getUserData = async () => {
    const res = await fetch(`${process.env.HOST}/api/user/get_user`, {
      method: "POST",
      body: JSON.stringify({ token: token }),
    });
    const { user } = await res.json();
    return user ? user : null;
  };

  const query = useQuery<dataMongoUser>({
    queryFn: getUserData,
    queryKey: ["data-usuario"],
    refetchOnWindowFocus: true,
  });

  return query;
}
