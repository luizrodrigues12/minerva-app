"use client";

import Loading from "../layout/Loading";
import { unstable_noStore as noStore } from "next/cache";
import { useUserContext } from "@/contexts/userData";
import Button from "../layout/Button";
import { useEffect, useState } from "react";
import { useSectionContext } from "@/contexts/section";
import { UserCircle } from "flowbite-react-icons/outline";
import Container from "../layout/Container";
import Accordion from "../layout/Accordion";
import ChangeEmailForm from "./change_email/ChangeEmailForm";
import ChangePasswordForm from "./change_password/ChangePasswordForm";
import VerifyEmailForm from "./verify_email/VerifyEmailForm";
import EditPhotoIcon from "./change-photo/EditPhotoIcon";
import PhotoForm from "./change-photo/PhotoForm";
import Image from "next/image";
import DeleteAccount from "./delete_account/DeleteAccount";

const UserDataComp = () => {
  noStore();
  const { user, logoutFunction, refetch } = useUserContext();
  const [isPosting, setIsPosting] = useState(false);
  const { setSection } = useSectionContext();
  const [isOpen, setIsOpen] = useState(false);

  const deleteAccount = async () => {
    setIsPosting(true);
    await fetch(`${process.env.HOST}/api/user/delete_user`, {
      method: "POST",
      body: JSON.stringify({ token: user.token }),
    });
    logoutFunction();
  };

  useEffect(() => {
    setSection("profile");
    refetch();
  }, []);

  return (
    <Container className="min-h-screen">
      {!user || isPosting ? (
        <Loading />
      ) : (
        <div className="flex flex-col w-full text-textColor">
          <div className="flex flex-col items-start gap-4 md:rounded-md text-textColor ">
            <div className="flex gap-3 w-full">
              {user.avatar ? (
                <div className="relative">
                  <Image
                    src={user.avatar}
                    alt={`Avatar de ${user.name}`}
                    width={200}
                    height={200}
                    className="max-w-[88px] min-h-[88px] max-h-[88px] md:min-h-[95px] md:max-w-[95px] md:max-h-[95px] rounded-md object-cover shadow-md dark:bg-[#101010] bg-background03"
                  />
                  <EditPhotoIcon setIsOpen={setIsOpen} />
                </div>
              ) : (
                <div className="bg-background03 text-inputText rounded-md relative min-w-[88px] min-h-[88px] max-w-[88px] max-h-[88px] md:min-w-[95px] md:min-h-[95px] md:max-w-[95px] md:max-h-[95px]flex items-center justify-center">
                  <UserCircle
                    strokeWidth={0.5}
                    className="size-20 w-full h-full"
                  />
                  <EditPhotoIcon setIsOpen={setIsOpen} />
                </div>
              )}
              <div className="flex flex-col gap-1.5 justify-between w-full">
                <div className="bg-background03 p-2.5 rounded-md text-[14px] md:text-[16px]">
                  {user.name}
                </div>
                <div className="bg-background03 p-2.5 rounded-md text-[14px] md:text-[16px]">
                  Educador(a)
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full relative">
              <div className="text-[16px] md:text-[18px]">email</div>
              <div className="bg-background03 p-3 rounded-md text-inputText text-[14px] md:text-[16px]">
                {user.email}
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full  ">
              <div className=" text-[16px] md:text-[18px]">configurações</div>
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

                <Accordion
                  children={<DeleteAccount deleteAccount={deleteAccount} />}
                  textLeft="Excluir conta"
                  classNameContent="bg-background02"
                />
              </div>
            </div>

            {isOpen && <PhotoForm setIsOpen={setIsOpen} />}

            <Button
              className="w-full !p-2.5"
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
