"use client";

import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

type Props = { username: string; email: string };

const UserDataComp = ({ email, username }: Props) => {
  const token = getCookie("authorization");
  const router = useRouter();

  const logoutFunction = (e: any) => {
    e.preventDefault();

    deleteCookie("authorization");
    deleteCookie("username");

    window.location.replace("/login");
  };

  const removerConta = async (e: any) => {
    e.preventDefault();

    await fetch(`${process.env.HOST}/api/user/delete_user`, {
      method: "POST",
      body: JSON.stringify({ token: token }),
    });
    deleteCookie("authorization");
    deleteCookie("username");
    window.location.replace("/login");
  };

  return (
    <div className="px-8 md:self-center rounded-lg md:px-6 md:py-5 md:w-[400px] md:border-zinc-800 md:border-2">
      <div className="flex items-center justify-center gap-3">
        <h2 className="font-medium text-xl w-[270px] text-zinc-200 text-center pt-1 pb-1.5 md:pt-0 md:pb-2">
          Meus Dados
        </h2>
      </div>
      <hr className="bg-zinc-800 h-0.5 my-2 border-none" />
      <div className="flex flex-col gap-2 ">
        <div className="flex justify-between">
          <h3 className="text-[1rem]">Username</h3>
          <h3
            className="text-[0.9rem] text-red-700 hover:text-red-500 hover:cursor-pointer"
            onClick={(e) => removerConta(e)}
          >
            Excluir conta
          </h3>
        </div>
        <div className="bg-zinc-800 p-1.5 pl-2.5 rounded-lg">{username}</div>
        <h3 className="text-[1rem]">Email</h3>
        <div className="bg-zinc-800 p-1.5 pl-2.5 rounded-lg">{email}</div>
        <hr className="bg-zinc-800 h-0.5 mb-1.5 md:mt-2 md:mb-2 border-none" />
      </div>
      <button
        className="bg-roxominerva w-full rounded-lg text-[16px] md:p-[7px] text-zinc-100; h-10 flex justify-center items-center"
        onClick={(e) => logoutFunction(e)}
      >
        Logout
      </button>
    </div>
  );
};

export default UserDataComp;
