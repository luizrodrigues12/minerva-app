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
import {
  ArrowRight,
  CloseCircle,
  UserCircle,
} from "flowbite-react-icons/outline";
import Container from "../layout/Container";

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
    <Container>
      {!user || isPending ? (
        <Loading />
      ) : (
        <div className="flex flex-col w-full h-screen">
          <div className="flex flex-col items-start gap-4 md:rounded-md">
            <div className="flex gap-3 w-full">
              <div className="bg-background03 text-[#414141] rounded-md">
                <UserCircle size={100} strokeWidth={0.5} />
              </div>
              <div className="flex flex-col gap-2 justify-between w-full">
                <div className="bg-background03 p-2.5 px-3 rounded-md text-[#404040]">
                  {user.username}
                </div>
                <div className="bg-background03 p-2.5 px-3 rounded-md text-[#404040]">
                  Educador(a)
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full relative">
              <div className="text-black text-[18px]">email</div>
              <div>
                <div
                  className="text-black text-[14px] mr-1.5 mb-1 hover:text-red-700 cursor-pointer text-end absolute right-0 
                top-3.5"
                  onClick={async (e) => await removerConta(e)}
                >
                  excluir conta
                </div>
                <div className="bg-background03 p-2.5 md:px-3 rounded-md text-[#202020]">
                  {user.email}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full  ">
              <div className="text-black text-[18px]">configurações</div>
              <div className="flex flex-col gap-1.5">
                <div
                  className="p-2.5 bg-background03 text-[#404040] rounded-md flex justify-between items-center px-3
              hover:bg-[#e7e7e7] cursor-pointer"
                >
                  <p>Verificar email</p>
                  <div>
                    <ArrowRight strokeWidth={2} size={26} />
                  </div>
                </div>

                <div
                  className="p-2.5 bg-background03 text-[#404040] rounded-md flex justify-between items-center px-3
              hover:bg-[#e7e7e7] cursor-pointer"
                >
                  <p>Alterar email</p>
                  <div>
                    <ArrowRight strokeWidth={2} size={26} />
                  </div>
                </div>

                <div
                  className="p-2.5 bg-background03 text-[#404040] rounded-md flex justify-between items-center px-3
              hover:bg-[#e7e7e7] cursor-pointer"
                >
                  <p>Alterar senha</p>
                  <div>
                    <ArrowRight strokeWidth={2} size={26} />
                  </div>
                </div>
              </div>

              {error && (
                <p className="text-red-700 text-[14px] text-center py-1">
                  {error}
                </p>
              )}

              {/* <Button
              whileHover={{ scale: 1.003 }}
              whileTap={{ scale: 0.99 }}
              onClick={async () => await changePassword()}
              className="text-background02"
            >
              Alterar senha
            </Button> */}

              {isOpen && (
                <div className="p-6 bg-background01 text-black border-2 border-borderColor rounded-md modal">
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

            <Button
              className="w-full bg-zinc-700 hover:bg-zinc-800 mt-1 !p-2.5"
              whileHover={{ scale: 1.003 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => logoutFunction()}
            >
              Logout
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default UserDataComp;
