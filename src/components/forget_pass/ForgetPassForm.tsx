"use client";

import { validateEmail } from "@/utils/regex";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Loading from "../layout/Loading";
import { useSectionContext } from "@/contexts/section";

const ForgetPassForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const { setSection } = useSectionContext();
  const emailTest = validateEmail.test(email);

  const handleForgetPass = async () => {
    try {
      if (!emailTest) throw new Error("Por favor, digite um email válido.");
      //Enviando post dos dados
      setIsPosting(true);
      const response = await fetch(
        `${process.env.HOST}/api/user/forget_password/`,
        {
          method: "POST",
          body: JSON.stringify({ email }),
        }
      );
      const { data, error } = await response.json();
      setIsPosting(false);
      if (error) throw new Error(error);
      if (data) router.replace("/login");
    } catch (error: any) {
      setEmailError(error.message);
    }
  };

  useEffect(() => {
    setSection("home");
  }, []);

  return (
    <section className="flex white flex-col min-h-[76vh] font-inter text-textColor xl:min-h-[69.4vh] bg-background01 items-center">
      {!isPosting ? (
        <div className="bg-background02 p-8 rounded-md shadow-md mx-8 my-[32px] md:w-[400px]">
          <div className="flex flex-col gap-4">
            <h1 className="text-[20px] md:text-[20px] lg:text-[22px] xl:text-[22px] text-[#353535]">
              Redefinir Senha
            </h1>

            <p className="text-[14px] md:text-[15px] bg-background01 p-3 rounded-md">
              Caso exista uma conta com esse email, você receberá um email com
              um link para redefinir sua senha.
            </p>

            <div>
              <div className="text-[16px]">email</div>
              <input
                type="email"
                name="email"
                autoComplete="email"
                className="flex items-center p-2.5 border-0 bg-background01 rounded-[7px] text-[14px] w-full mt-2 md:text-[15px] md:px-4"
                placeholder={"digite seu email"}
                value={email || ""}
                onChange={(e) => {
                  e.preventDefault();
                  setEmail(e.target.value.trim().toLowerCase());
                }}
                onFocus={() => setEmailError("")}
              />

              {emailError && (
                <p className="text-red-700 text-[12px] md:text-[13px] pl-0.5 mt-2">
                  {emailError}
                </p>
              )}
            </div>

            <motion.button
              whileTap={{ scale: 0.99 }}
              whileHover={{ scale: 1.01 }}
              className={`bg-roxominerva text-zinc-200 py-2.5 mt-[2px] text-[14px] rounded-[7px] md:text-[16px] flex items-center justify-center hover:bg-buttonHover hover:text-zinc-100 w-full`}
              onClick={() => handleForgetPass()}
            >
              Enviar
            </motion.button>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </section>
  );
};

export default ForgetPassForm;
