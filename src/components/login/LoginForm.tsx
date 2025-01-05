"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Eye } from "flowbite-react-icons/outline";
import { EyeSlash } from "flowbite-react-icons/solid";

const LoginForm = () => {
  // State com os dados
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShow, setIsShow] = useState<boolean>();
  const [width, setWidth] = useState<number>();

  // Manipulando submit do formulário
  const handleLogin = async (e: any) => {
    try {
      e.preventDefault();

      if (!email) throw new Error("Digite um email válido.");
      if (!password) throw new Error("Digite uma senha válida.");

      //Enviando post dos dados
      const res = await fetch(`${process.env.HOST}/api/user/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      //Mostrando error
      const { error } = await res.json();
      if (error) throw new Error(error);

      // Redirecionando
      window.location.href = `/home`;
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      setWidth(innerWidth);
    }
  });

  return (
    <section className="text-black font-inte min-h-[92.2vh] max-h-[92.2vh] bg-background01">
      <motion.div
        animate={{
          height: width! >= 760 ? [0, 460] : [0, 410],
        }}
        transition={{ duration: 0.5 }}
        className="flex h-[410px] flex-col mx-[32px] py-[32px] px-[16px] bg-background02 border-x-2 border-b-2 border-borderColor rounded-b-md md:mx-auto md:px-[35px] md:w-[450px] md:py-[35px]"
      >
        <div className="flex flex-col gap-4 md:gap-5">
          <motion.div
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-4 md:gap-5"
          >
            <h1 className="text-[20px] md:text-[20px] xl:text-[26px] text-[#353535]">
              Login
            </h1>
            <p className="text-[16px] text-[#505050] md:text-[16px]">
              Seja bem-vindo ao{" "}
              <span className="text-roxominerva">Minerva!</span>
            </p>
          </motion.div>

          <motion.div
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col gap-[0px]"
          >
            <div>
              <div className="text-[16px] md:text-[20px]">email</div>
              <input
                type="email"
                name="email"
                autoComplete="email"
                className="flex items-center p-2.5 border-0 bg-background01 rounded-[7px] text-[14px] w-full mt-2 md:text-[16px]  pl-2.5"
                placeholder={"usuário ou email"}
                value={email || ""}
                onChange={(e) => {
                  e.preventDefault();
                  setEmail(e.target.value.trim().toLowerCase());
                }}
              />
              <p className="w-full text-end text-[#404040] text-[12px] mt-[5px] cursor-pointer md:text-[14px]">
                não possui conta?
              </p>
            </div>

            <div>
              <div className="text-[16px] md:text-[20px]">senha</div>
              <div className="flex relative">
                <input
                  type={isShow ? "text" : "password"}
                  id="input-password"
                  name="password"
                  value={password || ""}
                  className="flex items-center p-2.5 border-0 bg-background01 rounded-[7px] text-[14px] w-full mt-2 md:text-[16px] pl-2.5"
                  placeholder={"digite sua senha"}
                  onChange={(e) => setPassword(e.target.value.trim())}
                />
                {isShow ? (
                  <EyeSlash
                    className="absolute z-[1] bottom-2 right-2 text-[#404040]"
                    onClick={() => {
                      setIsShow(!isShow);
                    }}
                  />
                ) : (
                  <Eye
                    className="absolute z-[1] bottom-2 right-2 text-[#404040]"
                    onClick={() => {
                      setIsShow(!isShow);
                    }}
                  />
                )}
              </div>
              <p className="w-full text-end text-[#404040] text-[12px] mt-[5px] cursor-pointer md:text-[14px]">
                esqueceu sua senha?
              </p>
            </div>
          </motion.div>
        </div>

        {error && (
          <p className="text-[12px] md:text-[14px] text-red-700 text-center py-2">
            {error}
          </p>
        )}

        <motion.button
          whileTap={{ scale: 0.99 }}
          whileHover={{ scale: 1.01 }}
          animate={{
            opacity: [0, 1],
            transition: { duration: 0.5, delay: 0.6 },
          }}
          className={`bg-roxominerva text-zinc-100 py-2.5 text-[14px] rounded-[7px] md:text-[16px] flex items-center justify-center hover:bg-buttonHover hover:text-zinc-100 ${
            error ? "mt-3" : "mt-6"
          }`}
          onClick={(e) => handleLogin(e)}
        >
          Login
        </motion.button>
      </motion.div>
    </section>
  );
};

export default LoginForm;
