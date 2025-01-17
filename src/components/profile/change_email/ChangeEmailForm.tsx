"use client";

import Button from "@/components/layout/Button";
import InputComp from "@/components/layout/InputComp";
import Loading from "@/components/layout/Loading";
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
      if (email !== repeatEmail) throw new Error("Emails não correspondentes.");

      setIsPosting(true);
      const res = await fetch(`${process.env.HOST}/api/user/change_email`, {
        method: "PUT",
        body: JSON.stringify({
          oldEmail: user.email,
          newEmail: email,
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
        <div className="text-black flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1.5">
              <InputComp
                placeholder="novo email"
                className="!mt-0"
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setError("")}
              />
              <InputComp
                placeholder="repetir email"
                className="!mt-0"
                value={repeatEmail || ""}
                onChange={(e) => setRepeatEmail(e.target.value)}
                onFocus={() => setError("")}
              />
            </div>

            {error && (
              <p className="text-red-600 py-2.5 text-center text-[14px] md:text-[15px] bg-background03 rounded-md">
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
            <div className="bg-background03 p-6 modal border-2 border-borderColor rounded-md shadow-md flex flex-col gap-2 w-[90%] md:w-[60%] lg:w-[30%] xl:w-[25%]">
              <div className="bg-background02 p-2.5 rounded-md text-center text-[14px] md:text-[16px]">
                Enviamos um email para {email}
              </div>
              <div className="bg-background02 p-2.5 rounded-md text-center text-[14px] md:text-[16px]">
                Abra-o para confirmar a alteração do email.
              </div>

              <Button
                whileHover={{ scale: 1.001 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setIsOpen(false)}
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

export default ChangeEmailForm;
