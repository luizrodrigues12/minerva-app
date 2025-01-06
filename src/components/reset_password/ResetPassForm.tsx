"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "motion/react";
import { validatePassword } from "@/utils/regex";
import { Eye } from "flowbite-react-icons/outline";
import { EyeSlash } from "flowbite-react-icons/solid";
import { useRouter } from "nextjs-toploader/app";

const ForgetPassForm = () => {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isShow, setIsShow] = useState(false);
  const router = useRouter();
  const id = usePathname().slice(20);

  const passwordRGX = validatePassword.test(password);

  const handleResetPass = async () => {
    try {
      if (!passwordRGX)
        throw new Error("8 dígitos, uma letra maiúscula e um número.");

      //Enviando post dos dados
      const response = await fetch(
        `${process.env.HOST}/api/user/reset_password/`,
        {
          method: "PUT",
          body: JSON.stringify({ password, id }),
        }
      );
    } catch (error: any) {
      setPasswordError(error.message);
    }
  };

  return (
    <section className="flex flex-col min-h-[76vh] font-inter text-black xl:min-h-[69.4vh] bg-background01 items-center">
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
              {isShow ? (
                <EyeSlash
                  className="absolute z-[1] bottom-2.5 right-2.5 text-[#404040] md:right-4 cursor-pointer"
                  onClick={() => {
                    setIsShow(!isShow);
                  }}
                />
              ) : (
                <Eye
                  className="absolute z-[1] bottom-2.5 right-2.5 text-[#404040] md:right-4 cursor-pointer"
                  onClick={() => {
                    setIsShow(!isShow);
                  }}
                />
              )}
            </div>

            {passwordError && (
              <p className="text-red-700 text-[12px] md:text-[13px] text-center mt-3">
                {passwordError}
              </p>
            )}
          </div>

          <motion.button
            whileTap={{ scale: 0.99 }}
            whileHover={{ scale: 1.01 }}
            className={`bg-roxominerva text-zinc-200 py-2.5 mt-[2px] text-[14px] rounded-[7px] md:text-[16px] flex items-center justify-center hover:bg-buttonHover hover:text-zinc-100 w-full`}
            onClick={() => {
              handleResetPass();
              router.push("/login");
            }}
          >
            Enviar
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default ForgetPassForm;
