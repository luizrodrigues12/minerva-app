"use client";

import Button from "@/components/layout/Button";
import Loading from "@/components/layout/Loading";
import Modal from "@/components/layout/Modal";
import { useUserContext } from "@/contexts/userData";
import { CheckCircle } from "flowbite-react-icons/solid";
import React, { useState } from "react";

const VerifyEmailForm = () => {
  const [error, setError] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
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
      if (success) {
        setMessage(success);
        setIsOpen(true);
      }
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
              <div className="bg-background03 py-4 text-center text-textColor rounded-md text-[14px] md:text-[16px]">
                Enviaremos um email pra você.
                <br /> Abra-o e clique em verificar email.
              </div>
              {error && (
                <p className="text-errorColor py-2.5 text-center text-[14px] md:text-[15px] bg-background03 rounded-md">
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
            <div className="bg-background03 py-4 text-center rounded-md text-[14px] md:text-[16px] flex gap-1 items-center justify-center">
              <p>Email verificado!</p>
              <CheckCircle className="size-[24px] text-corIcones" />
            </div>
          )}

          {isOpen && (
            <Modal setIsOpen={setIsOpen}>
              <div className="bg-background02 p-4 rounded-md flex flex-col gap-2 w-full mt-2 text-center">
                {message}
              </div>
            </Modal>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default VerifyEmailForm;
