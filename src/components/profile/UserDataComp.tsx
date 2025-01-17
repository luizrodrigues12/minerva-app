"use client";

import Loading from "../layout/Loading";
import { unstable_noStore as noStore } from "next/cache";
import { useUserContext } from "@/contexts/userData";
import Button from "../layout/Button";
import { useEffect } from "react";
import { useSectionContext } from "@/contexts/section";
import { UserCircle } from "flowbite-react-icons/outline";
import Container from "../layout/Container";
import Accordion from "../layout/Accordion";
import ChangeEmailForm from "./change_email/ChangeEmailForm";
import ChangePasswordForm from "./change_password/ChangePasswordForm";
import VerifyEmailForm from "./verify_email/VerifyEmailForm";

const UserDataComp = () => {
  noStore();
  const { user, logoutFunction } = useUserContext();
  const { setSection } = useSectionContext();

  const removerConta = async (e: any) => {
    e.preventDefault();
    await fetch(`${process.env.HOST}/api/user/delete_user`, {
      method: "POST",
      body: JSON.stringify({ token: user.token }),
    });
    logoutFunction();
  };

  useEffect(() => {
    setSection("profile");
  });

  return (
    <Container>
      {!user ? (
        <Loading />
      ) : (
        <div className="flex flex-col w-full h-screen">
          <div className="flex flex-col items-start gap-4 md:rounded-md">
            <div className="flex gap-3 w-full">
              <div className="bg-background03 text-[#414141] rounded-md">
                <UserCircle size={100} strokeWidth={0.5} />
              </div>
              <div className="flex flex-col gap-2 justify-between w-full">
                <div className="bg-background03 p-3 rounded-md text-[#404040] text-[14px] md:text-[16px]">
                  {user.username}
                </div>
                <div className="bg-background03 p-3 rounded-md text-[#404040] text-[14px] md:text-[16px]">
                  Educador(a)
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full relative">
              <div className="text-black text-[16px] md:text-[18px]">email</div>
              <div>
                <div
                  className="text-black text-[12px] mr-1.5 mb-1 hover:text-red-700 cursor-pointer text-end absolute right-0 
                top-3.5 md:text-[14px]"
                  onClick={async (e) => await removerConta(e)}
                >
                  excluir conta
                </div>
                <div className="bg-background03 p-3 rounded-md text-[#202020] text-[14px] md:text-[16px]">
                  {user.email}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full  ">
              <div className="text-black text-[16px] md:text-[18px]">
                configurações
              </div>
              <div className="flex flex-col gap-1.5">
                <Accordion
                  children={<VerifyEmailForm />}
                  textLeft="Verificar email"
                  classNameContent="bg-background02"
                />

                <Accordion
                  textLeft={"Alterar email"}
                  children={<ChangeEmailForm />}
                  classNameContent="bg-background02"
                />

                <Accordion
                  children={<ChangePasswordForm />}
                  textLeft="Alterar senha"
                  classNameContent="bg-background02"
                />
              </div>
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
