"use client";

import Button from "@/components/layout/Button";
import InputComp from "@/components/layout/InputComp";
import Loading from "@/components/layout/Loading";
import Modal from "@/components/layout/Modal";
import { useUserContext } from "@/contexts/userData";
import { validateEmail } from "@/utils/regex";
import { useState } from "react";

const ChangeEmailForm = () => {
  const { user } = useUserContext();
  const [isPosting, setIsPosting] = useState(false);
  const [email, setEmail] = useState("");
  const [repeatEmail, setRepeatEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");

  const sendEmail = async () => {
    try {
      if (!email) throw new Error("Digite um email.");
      if (!validateEmail.test(email))
        throw new Error("Digite um email válido.");
      if (!repeatEmail) throw new Error("Repita o email.");
      if (email.toUpperCase() !== repeatEmail.toUpperCase())
        throw new Error("Emails não correspondentes.");

      setIsPosting(true);
      const res = await fetch(`${process.env.HOST}/api/user/change_email`, {
        method: "PUT",
        body: JSON.stringify({
          oldEmail: user.email.toLowerCase(),
          newEmail: email.toLowerCase(),
          sendEmail: true,
        }),
      });
      setIsPosting(false);
      const { success, error } = await res.json();
      if (error) throw new Error(error);
      if (success) setIsOpen(true);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div>
      {!isPosting ? (
        <div className="text-textColor flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1.5">
              <InputComp
                placeholder="novo email"
                className="!mt-0"
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setError("")}
                type="email"
              />
              <InputComp
                placeholder="repetir email"
                className="!mt-0"
                value={repeatEmail || ""}
                onChange={(e) => setRepeatEmail(e.target.value)}
                onFocus={() => setError("")}
                type="email"
              />
            </div>

            {error && (
              <p className="text-errorColor py-2.5 text-center text-[14px] md:text-[15px] bg-background03 rounded-md">
                {error}
              </p>
            )}
            <Button
              whileHover={{ scale: 1.001 }}
              whileTap={{ scale: 0.99 }}
              onClick={async () => await sendEmail()}
            >
              Alterar email
            </Button>
          </div>

          {isOpen && (
            <Modal setIsOpen={setIsOpen}>
              <div className="bg-background03 rounded-md flex flex-col gap-2 w-full mt-2">
                <div className="bg-background02 p-2.5 rounded-md text-center text-[14px] md:text-[16px]">
                  Enviamos um email para {email}
                </div>
                <div className="bg-background02 p-2.5 rounded-md text-center text-[14px] md:text-[16px]">
                  Abra-o para confirmar a alteração do email.
                </div>
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

export default ChangeEmailForm;
