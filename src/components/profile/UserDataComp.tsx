"use client";

import { deleteCookie, getCookie } from "cookies-next/client";
import Loading from "../layout/Loading";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useState } from "react";
import { dataMongoUser } from "@/models/userModel";
import { unstable_noStore as noStore } from "next/cache";
import { motion } from "motion/react";

const UserDataComp = () => {
  const token = getCookie("authorization");
  const router = useRouter();
  const [user, setUser] = useState<dataMongoUser>();

  noStore();

  const getUserData = async () => {
    const res = await fetch(`${process.env.HOST}/api/user/get_user`, {
      method: "POST",
      body: JSON.stringify({ token: token }),
    });
    const { user } = await res.json();
    setUser(user);
  };

  const deleteCookies = () => {
    deleteCookie("authorization");
    deleteCookie("username");
  };

  const logoutFunction = async (e: any) => {
    e.preventDefault();

    const res = await fetch(`${process.env.HOST}/api/user/logout`, {
      method: "GET",
    });
    const { redirect } = await res.json();

    if (redirect) router.push("/login");
  };

  const removerConta = async (e: any) => {
    e.preventDefault();
    await fetch(`${process.env.HOST}/api/user/delete_user`, {
      method: "POST",
      body: JSON.stringify({ token: token }),
    });
    deleteCookies();
    router.push("/login");
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="flex flex-col w-full h-screen">
      {!user ? (
        <Loading />
      ) : (
        <div className="px-8 md:self-center rounded-lg md:px-6 md:p-5 md:w-[400px] md:border-zinc-800 md:border-2 height_pattern">
          <div className="flex items-center justify-center gap-3">
            <h2 className="text-xl w-[270px] text-zinc-200 text-center pt-1 pb-1.5 md:pt-0 md:pb-3">
              Meus Dados
            </h2>
          </div>
          <hr className="bg-zinc-800 h-0.5 my-2 border-none" />
          <div className="flex flex-col gap-2 pb-1">
            <div className="flex justify-between">
              <h3 className="text-[1rem]">Username</h3>
              <h3
                className="text-[0.9rem] text-red-700 hover:text-red-500 hover:cursor-pointer"
                onClick={(e) => removerConta(e)}
              >
                Excluir conta
              </h3>
            </div>
            <div className="bg-zinc-800 p-1.5 pl-2.5 rounded-lg text-zinc-300">
              {user.username}
            </div>
            <h3 className="text-[1rem]">Email</h3>
            <div className="bg-zinc-800 p-1.5 pl-2.5 rounded-lg text-zinc-300">
              {user.email}
            </div>
          </div>

          <hr className="bg-zinc-800 h-0.5 mb-2 mt-2 md:mt-2 md:mb-2 border-none" />

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 1 }}
            transition={{ duration: 0.01 }}
            className="bg-roxominerva w-full rounded-lg text-[16px] md:p-[7px] text-textButton h-10 flex justify-center items-center hover:bg-[#484199] hover:text-textButtonHover"
            onClick={(e) => logoutFunction(e)}
          >
            Logout
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default UserDataComp;
