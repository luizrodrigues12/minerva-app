"use client";

import Button from "@/components/layout/Button";
import Loading from "@/components/layout/Loading";
import { useUserContext } from "@/contexts/userData";
import { CheckCircle } from "flowbite-react-icons/solid";
import React, { useState } from "react";

const VerifyEmailForm = () => {
  const [error, setError] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [message, setMessage] = useState("");
  const { user } = useUserContext();
  const { token, email } = user;

  const sendEmailVerify = async () => {
    try {
      setIsPosting(true);
      const res = await fetch(`${process.env.HOST}/api/user/verify_email`, {
        method: "PUT",
        body: JSON.stringify({ token, email, sendEmail: true }),
      });
      setIsPosting(false);
      const { success, error } = await res.json();
      if (error) throw new Error(error);
      if (success) setMessage(success);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div>
      {!isPosting ? (
        <div>
          {!user.isVerified && (
            <div className="flex flex-col gap-2">
              <div className="bg-background03 py-4 text-center text-black rounded-md text-[14px] md:text-[16px]">
                Enviaremos um email pra você.
                <br /> Abra-o e clique em verificar email.
              </div>
              {error && (
                <p className="text-red-600 py-2.5 text-center text-[14px] md:text-[15px] bg-background03 rounded-md">
                  {error}
                </p>
              )}
              <Button
                onClick={() => {
                  setError("");
                  sendEmailVerify();
                }}
              >
                Enviar email
              </Button>
            </div>
          )}

          {user.isVerified && (
            <div className="bg-background03 py-4 text-center text-black rounded-md text-[14px] md:text-[16px] flex gap-1 items-center justify-center">
              <p>Email verificado!</p>
              <CheckCircle className="size-[24px] text-roxominerva" />
            </div>
          )}

          {message && (
            <div className="bg-background03 p-6 modal border-2 border-borderColor rounded-md shadow-md flex flex-col gap-2 w-[90%] md:w-[60%] lg:w-[30%] xl:w-[25%]">
              <div className="bg-background02 p-2.5 text-black rounded-md text-center text-[14px] md:text-[16px]">
                {message}
              </div>
              <Button
                whileHover={{ scale: 1.001 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setMessage("")}
              >
                Fechar
              </Button>
            </div>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default VerifyEmailForm;
