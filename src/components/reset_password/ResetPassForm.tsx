"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { validatePassword } from "@/utils/regex";
import { Eye } from "flowbite-react-icons/outline";
import { EyeSlash } from "flowbite-react-icons/solid";
import { useRouter } from "nextjs-toploader/app";
import Loading from "../layout/Loading";
import Button from "../layout/Button";
import { useSectionContext } from "@/contexts/section";
import EyeComp from "../layout/EyeComp";

const ForgetPassForm = () => {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [message, setMessage] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const router = useRouter();
  const { setSection } = useSectionContext();
  const id = usePathname().slice(20);

  const handleResetPass = async () => {
    try {
      if (!password) throw new Error("Digite uma senha.");
      if (!validatePassword.test(password))
        throw new Error("8 dígitos, uma letra maiúscula e um número.");

      //Enviando post dos dados
      setIsPosting(true);
      const response = await fetch(
        `${process.env.HOST}/api/user/reset_password/`,
        {
          method: "PUT",
          body: JSON.stringify({ password, id }),
        }
      );

      const { success } = await response.json();
      setIsPosting(false);
      if (success) setMessage(success);
    } catch (error: any) {
      setPasswordError(error.message);
    }
  };

  useEffect(() => {
    setSection("home");
  }, []);

  return (
    <section className="flex flex-col min-h-[76vh] font-inter text-black xl:min-h-[69.4vh] bg-background01 items-center">
      {!isPosting ? (
        <div className="bg-background02 p-8 rounded-md shadow-md mx-8 my-[32px] md:w-[400px]">
          <div className="flex flex-col gap-4">
            <h1 className="text-[20px] md:text-[20px] lg:text-[22px] xl:text-[22px] text-[#353535]">
              Redefinir Senha
            </h1>

            <p className="text-[14px] md:text-[15px] bg-background01 p-3 rounded-md">
              Escolha uma nova senha para substituir a antiga.
            </p>

            <div>
              <div className="text-[16px]">senha</div>
              <div className="flex relative">
                <input
                  type={isShow ? "text" : "password"}
                  id="input-password"
                  name="password"
                  value={password || ""}
                  className="flex items-center p-2.5 border-0 bg-background01 rounded-[7px] text-[14px] w-full mt-2 md:text-[15px] md:px-4"
                  placeholder={"digite sua senha"}
                  onChange={(e) => setPassword(e.target.value.trim())}
                  onFocus={() => setPasswordError("")}
                />
                <EyeComp isShow={isShow} setIsShow={setIsShow} />
              </div>

              {passwordError && (
                <p className="text-red-700 text-[12px] md:text-[13px] text-center mt-3">
                  {passwordError}
                </p>
              )}
            </div>

            {message && (
              <div className="bg-background03 p-6 modal border-2 border-borderColor rounded-md shadow-md flex flex-col gap-2 w-[80%] md:w-[50%] lg:w-[35%] xl:w-[25%] 2xl:w-[20%] !top-[30%]">
                <div className="bg-background02 p-2.5 text-black rounded-md text-center text-[14px] md:text-[16px]">
                  {message}
                </div>
                <Button
                  whileHover={{ scale: 1.001 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => router.replace("/login")}
                >
                  Fazer Login
                </Button>
              </div>
            )}

            <motion.button
              whileTap={{ scale: 0.99 }}
              whileHover={{ scale: 1.01 }}
              className={`bg-roxominerva text-zinc-200 py-2.5 mt-[2px] text-[14px] rounded-[7px] md:text-[16px] flex items-center justify-center hover:bg-buttonHover hover:text-zinc-100 w-full`}
              onClick={() => {
                handleResetPass();
              }}
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
