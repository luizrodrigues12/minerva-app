"use client";

import Loading from "../layout/Loading";
import { unstable_noStore as noStore } from "next/cache";
import { useUserContext } from "@/contexts/userData";
import InputComp from "../layout/InputComp";
import Image from "next/image";
import Button from "../layout/Button";
import { useEffect, useState } from "react";
import { useSectionContext } from "@/contexts/section";
import { validatePassword } from "@/utils/regex";
import { CloseCircle } from "flowbite-react-icons/outline";

const UserDataComp = () => {
  const [isPending, setIsPending] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [error, setError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRepeat, setNewPasswordRepeat] = useState("");
  const { user, logoutFunction } = useUserContext();
  const { setSection } = useSectionContext();

  noStore();

  const removerConta = async (e: any) => {
    e.preventDefault();
    await fetch(`${process.env.HOST}/api/user/delete_user`, {
      method: "POST",
      body: JSON.stringify({ token: user.token }),
    });
    logoutFunction();
  };

  const changePassword = async () => {
    try {
      if (!currentPassword) throw new Error("Digite a senha atual.");
      if (!newPassword) throw new Error("Digite uma nova senha.");
      if (!validatePassword.test(newPassword))
        throw new Error("8 dígitos mínimos, uma letra maiúscula e um número.");
      if (!newPasswordRepeat) throw new Error("Repita a nova senha.");
      if (!(newPassword === newPasswordRepeat))
        throw new Error("Repita a nova senha corretamente.");

      setIsPending(true);
      const res = await fetch(`${process.env.HOST}/api/user/change_password`, {
        method: "POST",
        body: JSON.stringify({
          token: user.token,
          newPassword,
          currentPassword,
        }),
      });
      setIsPending(false);
      const { error } = await res.json();
      if (error) {
        throw new Error(error);
      } else {
        setIsOpen(true);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    setSection("profile");
  });

  return (
    <div className="flex flex-col w-full h-screen md:p-4 lg:p-6 2xl:p-8">
      {!user || isPending ? (
        <Loading />
      ) : (
        <div className="flex flex-col items-start gap-3 md:border-2 md:border-borderColor md:rounded-md p-6 py-2 md:p-4">
          <div className="flex gap-3 w-full">
            <Image
              src={"/images/blank-user.jpg"}
              alt="Foto do usuário"
              width={150}
              height={150}
              className="rounded-lg size-[110px] lg:size-[100px]"
              style={{ boxShadow: "0px 0px 4px #00000010" }}
            />
            <div className="flex flex-col gap-1.5 text-[#404040] p-3 bg-background01 rounded-md w-full justify-center">
              <div className="bg-background02 p-1 px-3 rounded-md">
                {user.username}
              </div>
              <div className="bg-background02 p-1 px-3 rounded-md">
                Educador(a)
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full relative">
            <div className="text-black text-[18px]">email</div>
            <div>
              <div
                className="text-black text-[14px] mr-1.5 mb-1 hover:text-red-700 cursor-pointer text-end absolute right-0 top-3.5"
                onClick={async (e) => await removerConta(e)}
              >
                excluir conta
              </div>
              <div className="bg-background01 p-2.5 md:px-3 rounded-md text-[#202020]">
                {user.email}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full  ">
            <div className="text-black text-[18px]">alterar senha</div>
            <div className="flex flex-col gap-1.5 p-4 bg-background01 rounded-md">
              <InputComp
                placeholder="senha atual"
                className="!mt-0 bg-background02"
                value={currentPassword || ""}
                onChange={(e) => setCurrentPassword(e.target.value)}
                onFocus={() => setError("")}
              />
              <InputComp
                placeholder="nova senha"
                className="!mt-0 bg-background02"
                value={newPassword || ""}
                onChange={(e) => setNewPassword(e.target.value)}
                onFocus={() => setError("")}
              />
              <InputComp
                placeholder="repetir nova senha"
                className="!mt-0 bg-background02"
                value={newPasswordRepeat || ""}
                onChange={(e) => setNewPasswordRepeat(e.target.value)}
                onFocus={() => setError("")}
              />

              {error && (
                <p className="text-red-700 text-[14px] text-center py-1">
                  {error}
                </p>
              )}
              <Button
                whileHover={{ scale: 1.003 }}
                whileTap={{ scale: 0.99 }}
                onClick={async () => await changePassword()}
                className="text-background02"
              >
                Alterar senha
              </Button>

              {isOpen && (
                <div className="p-6 px-8 bg-background01 text-black border-2 border-borderColor rounded-md modal">
                  <div className="flex flex-col gap-3">
                    <div className="text-center text-[18px]">
                      Sua senha foi alterada <br />
                      com sucesso.
                    </div>
                    <Button onClick={() => setIsOpen(false)}>Fechar</Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Button
            className="w-full bg-zinc-700 hover:bg-zinc-800"
            whileHover={{ scale: 1.003 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => logoutFunction()}
          >
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserDataComp;
