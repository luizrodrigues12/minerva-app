"use client";

import { useEffect, useState } from "react";
import { useRouter } from "nextjs-toploader/app";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "@/utils/regex";
import { motion } from "motion/react";
import Image from "next/image";
import { EyeSlash } from "flowbite-react-icons/solid";
import { Eye } from "flowbite-react-icons/outline";
import { useSectionContext } from "@/contexts/section";

const RegisterForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [isShow, setIsShow] = useState<boolean>();
  const { setSection } = useSectionContext();

  //REGEX
  const emailTest = validateEmail.test(email);
  const passwordTest = validatePassword.test(password);
  const usernameTest = validateUsername.test(username);

  const handleRegister = async () => {
    try {
      // REGEX
      if (!usernameTest) {
        setUsernameError('Username deve conter apenas letras, números e "_". ');
        return;
      }
      if (!emailTest) {
        setEmailError("Digite um email válido.");
        return;
      }
      if (!passwordTest) {
        setpasswordError("8 dígitos, uma letra \n maiúscula e um número.");
        return;
      }

      //Enviando post dos dados
      if (passwordTest && emailTest && usernameTest) {
        const response = await fetch(`${process.env.HOST}/api/user/register`, {
          method: "POST",
          body: JSON.stringify({ username, email, password }),
        });
        const json = await response.json();
        if (response.status !== 201) {
          throw new Error(json.error);
        }
        router.push("/login");
      }
    } catch (err: any) {
      err.message.toLowerCase().includes("username")
        ? setUsernameError(err.message)
        : setEmailError(err.message);
    }
  };

  useEffect(() => {
    setSection("register");
  }, []);

  return (
    <section className="text-black font-inter min-h-[76vh] bg-background01 max-h-[92.2vh] xl:min-h-[69.4vh] section-login">
      <div
        className="flex flex-col w-[350px] m-auto my-[32px] py-[24px] pb-[32px] px-[24px] bg-background02 rounded-md md:mx-[100px] md:px-[30px] md:w-[450px] md:py-[30px] lg:mt-10 lg:flex-row-reverse lg:w-[750px] lg:px-0 lg:justify-between lg:gap-0 lg:py-0 lg:mx-[80px] xl:mx-[195px] xl:w-[900px] xl:max-h-[510px]"
        style={{ boxShadow: "-2px 2px 2px #00000010" }}
      >
        <div className="flex flex-col gap-4 md:gap-5 lg:w-full lg:p-6 lg:pb-7 lg:justify-center lg:gap-2 xl:p-8 xl:pb-11 xl:gap-4">
          <div className="flex flex-col gap-4 md:gap-5 lg:gap-3 xl:gap-5">
            <h1 className="text-[20px] md:text-[20px] lg:text-[22px] xl:text-[26px] text-[#353535]">
              Registrar
            </h1>
            <p className="text-[16px] text-[#505050] md:text-[16px]">
              Seja bem-vindo ao{" "}
              <span className="text-roxominerva">Minerva!</span>
            </p>
          </div>

          <div className="flex flex-col gap-0">
            <div className={`${usernameError ? "mb-1" : "mb-2"}`}>
              <div className="text-[16px]">username</div>
              <input
                type="text"
                name="username"
                autoComplete="username"
                className="flex items-center p-2.5 border-0 bg-background01 rounded-[7px] text-[14px] w-full mt-2 md:text-[15px] md:px-4"
                placeholder={"nome de usuário"}
                value={username || ""}
                onChange={(e) => {
                  e.preventDefault();
                  setUsername(e.target.value.trim().toLowerCase());
                }}
                onFocus={() => setUsernameError("")}
              />

              {usernameError && (
                <p className="text-red-700 text-[12px] md:text-[13px] mt-2 pl-0.5">
                  {usernameError}
                </p>
              )}
            </div>

            <div className={`${emailError ? "mb-1" : "mb-2"}`}>
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

              {emailError && (
                <p className="text-red-700 text-[12px] md:text-[13px] mt-2 pl-0.5">
                  {emailError}
                </p>
              )}
            </div>

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
                  <p className="text-red-700 text-[12px] md:text-[13px]">
                    {passwordError}
                  </p>
                )}
                <p
                  className="text-[#404040] text-[12px] cursor-pointer md:text-[13px] hover:text-roxominerva text-end flex-shrink-1"
                  onClick={() => router.push("/login")}
                >
                  possui conta?
                </p>
              </div>

              <motion.button
                whileTap={{ scale: 0.99 }}
                whileHover={{ scale: 1.01 }}
                className={`bg-roxominerva text-zinc-100 py-2.5 mt-[20px] text-[14px] rounded-[7px] md:text-[16px] flex items-center justify-center hover:bg-buttonHover hover:text-zinc-100 w-full`}
                onClick={() => handleRegister()}
              >
                Registrar
              </motion.button>
            </div>
          </div>
        </div>

        <Image
          src={"/images/back-register.jpg"}
          alt="Arte de professora dando aula"
          width={600}
          height={500}
          className="hidden lg:block min-h-full w-[50%] rounded-l-md"
        />
      </div>
    </section>
  );
};

export default RegisterForm;
