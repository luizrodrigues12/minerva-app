"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Eye } from "flowbite-react-icons/outline";
import { EyeSlash } from "flowbite-react-icons/solid";
import Image from "next/image";
import { useSectionContext } from "@/contexts/section";
import { useRouter } from "nextjs-toploader/app";

const LoginForm = () => {
  // State com os dados
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [isShow, setIsShow] = useState<boolean>();
  const [width, setWidth] = useState<number>();
  const { setSection } = useSectionContext();
  const router = useRouter();

  // Manipulando submit do formulário
  const handleLogin = async (e: any) => {
    try {
      e.preventDefault();

      if (!email) {
        setEmailError("Digite um email válido!");
        return;
      }

      if (!password) {
        setpasswordError("Digite uma senha válida.");
        return;
      }

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
      err.message.toLowerCase().includes("senha")
        ? setpasswordError(err.message)
        : setEmailError(err.message);
    }
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      window.addEventListener("resize", () => {
        setWidth(innerWidth);
      });
    }
  }, [width]);

  useEffect(() => {
    setSection("login");
  }, []);

  return (
    <section className="text-black font-inter min-h-[76vh] bg-background01 max-h-[92.2vh] xl:min-h-[69.4vh] section-login">
      <div
        className="flex flex-col w-[350px] m-auto my-[32px] py-[20px] px-[20px] bg-background02 border-borderColor rounded-md md:h-[460px] md:mx-[100px] md:px-[35px] md:w-[450px] md:py-[35px] lg:mt-10 lg:flex-row-reverse lg:w-[750px] lg:px-0 lg:justify-between lg:gap-0 lg:py-0 lg:mx-[80px] xl:mx-[195px] xl:w-[900px] "
        style={{ boxShadow: "-2px 2px 2px #00000010" }}
      >
        <div className="flex flex-col gap-4 md:gap-5 lg:py-[10px] lg:w-full lg:px-6 lg:justify-center lg:gap-2 xl:p-10 xl:pb-14 xl:gap-4">
          <div className="flex flex-col gap-4 md:gap-5 lg:gap-3 xl:gap-4">
            <h1 className="text-[20px] md:text-[20px] lg:text-[22px] xl:text-[26px] text-[#353535]">
              Login
            </h1>
            <p className="text-[16px] text-[#505050] md:text-[16px]">
              Seja bem-vindo ao{" "}
              <span className="text-roxominerva">Minerva!</span>
            </p>
          </div>

          <div className="flex flex-col gap-0">
            <div className={`${emailError ? "pb-2" : "mb-0"}`}>
              <div className="text-[16px]">email</div>
              <input
                type="email"
                name="email"
                autoComplete="email"
                className="flex items-center p-2.5 border-0 bg-background01 rounded-[7px] text-[14px] w-full mt-2 md:text-[15px] md:px-4"
                placeholder={"usuário ou email"}
                value={email || ""}
                onChange={(e) => {
                  e.preventDefault();
                  setEmail(e.target.value.trim().toLowerCase());
                }}
                onFocus={() => setEmailError("")}
              />
              <div
                className={`flex ${
                  emailError ? "justify-between" : "justify-end"
                } w-full items-center mt-1`}
              >
                {emailError && (
                  <p className="text-red-700 text-[12px] md:text-[13px] pl-0.5">
                    {emailError}
                  </p>
                )}
                <p
                  className="text-[#404040] text-[12px] cursor-pointer md:text-[13px] hover:text-roxominerva "
                  onClick={() => {
                    router.push("/register");
                    setSection("register");
                  }}
                >
                  não possui conta?
                </p>
              </div>
            </div>

            <div className={`${passwordError ? "pb-2" : "mb-0"}`}>
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
                  onFocus={() => setpasswordError("")}
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

              <div
                className={`flex ${
                  passwordError ? "justify-between" : "justify-end"
                } w-full items-center mt-1`}
              >
                {passwordError && (
                  <p className="text-red-700 text-[12px] md:text-[13px] pl-0.5">
                    {passwordError}
                  </p>
                )}
                <p
                  className="text-[#404040] text-[12px] cursor-pointer md:text-[13px] hover:text-roxominerva"
                  onClick={() => router.push("/forget_pass")}
                >
                  esqueceu sua senha?
                </p>
              </div>

              <motion.button
                whileTap={{ scale: 0.99 }}
                whileHover={{ scale: 1.01 }}
                className={`bg-roxominerva text-zinc-100 py-2.5 mt-[20px] text-[14px] rounded-[7px] md:text-[16px] flex items-center justify-center hover:bg-buttonHover hover:text-zinc-100 w-full`}
                onClick={(e) => handleLogin(e)}
              >
                Login
              </motion.button>
            </div>
          </div>
        </div>

        <Image
          src={"/images/back-login.jpg"}
          alt="Arte de professora dando aula"
          width={600}
          height={500}
          className="hidden lg:block h-full w-[50%] rounded-l-md"
        />
      </div>
    </section>
  );
};

export default LoginForm;
