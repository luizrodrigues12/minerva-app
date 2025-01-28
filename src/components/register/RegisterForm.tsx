"use client";

import { useEffect, useState } from "react";
import { useRouter } from "nextjs-toploader/app";
import { validateEmail, validatePassword } from "@/utils/regex";
import Image from "next/image";
import { useSectionContext } from "@/contexts/section";
import Button from "../layout/Button";
import Loading from "../layout/Loading";
import InputComp from "../layout/InputComp";
import EyeComp from "../layout/EyeComp";
import Link from "next/link";

const RegisterForm = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const { setSection } = useSectionContext();

  //REGEX
  const emailTest = validateEmail.test(email);
  const passwordTest = validatePassword.test(password);

  const handleRegister = async () => {
    const permissionInput: any = document.querySelector("#permission");

    try {
      // REGEX
      if (!name) {
        setNameError("Digite seu nome.");
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
      if (!permissionInput.checked) {
        setpasswordError("Concorde com termos de uso e privacidade.");
        return;
      }

      //Enviando post dos dados
      if (passwordTest && emailTest && name) {
        setIsPosting(true);
        const response = await fetch(`${process.env.HOST}/api/user/register`, {
          method: "POST",
          body: JSON.stringify({ name, email, password }),
        });
        const { error } = await response.json();
        if (error) {
          setIsPosting(false);
          throw new Error(error);
        }
        router.push("/login");
      }
    } catch (err: any) {
      err.message.toLowerCase().includes("nome")
        ? setNameError(err.message)
        : setEmailError(err.message);
    }
  };

  useEffect(() => {
    setSection("register");
  }, []);

  return (
    <section
      className="text-black font-inter min-h-[76vh] bg-background01 max-h-[92.2vh] xl:min-h-[69.4vh] section-login
    py-[32px] lg:py-[40px] light"
    >
      <div
        className="flex flex-col w-[90%] m-auto py-[24px] pb-[28px] px-[24px] bg-background03 rounded-md md:mx-[100px] md:px-[30px] md:w-[450px] md:py-[30px] lg:flex-row-reverse lg:w-[750px] lg:px-0 lg:justify-between lg:gap-0 lg:py-0 lg:mx-[60px] xl:mx-[100px] xl:w-[900px] xl:max-h-[510px] 2xl:mx-[300px]"
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
            <div className={`${nameError ? "mb-1" : "mb-2"}`}>
              <div className="text-[16px]">nome</div>
              <InputComp
                type="text"
                name="name"
                autoComplete="name"
                className="!bg-background02 mt-2"
                placeholder={"digite seu nome"}
                value={name || ""}
                onChange={(e) => {
                  e.preventDefault();
                  setName(e.target.value);
                }}
                onFocus={() => setNameError("")}
              />

              {nameError && (
                <p className="text-red-700 text-[12px] md:text-[13px] mt-2 pl-0.5">
                  {nameError}
                </p>
              )}
            </div>

            <div className={`${emailError ? "mb-1" : "mb-2"}`}>
              <div className="text-[16px]">email</div>
              <InputComp
                type="email"
                name="email"
                autoComplete="email"
                className="!bg-background02 mt-2"
                placeholder={"digite seu email"}
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

            <div className="flex flex-col">
              <div className="text-[16px]">senha</div>
              <div className="flex relative">
                <InputComp
                  type={isShow ? "text" : "password"}
                  id="input-password"
                  name="password"
                  value={password || ""}
                  className="!bg-background02 mt-2"
                  placeholder={"digite sua senha"}
                  onChange={(e) => setPassword(e.target.value.trim())}
                  onFocus={() => setpasswordError("")}
                />
                <EyeComp isShow={isShow} setIsShow={setIsShow} />
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

              <div className="flex gap-1 items-center mt-2.5 ">
                <input
                  type="checkbox"
                  className="size-4 rounded-sm checked:outline-none focus:outline-none focus:ring-offset-0 focus:ring-0 cursor-pointer"
                  id="permission"
                  onChange={() => setpasswordError("")}
                />
                <p className="text-[12px] md:text-[13px]">
                  Concordo com{" "}
                  <Link
                    href={"/terms-of-use"}
                    className="text-roxominerva hover:text-black"
                  >
                    termos de uso
                  </Link>{" "}
                  e{" "}
                  <Link
                    href={"/privacy"}
                    className="text-roxominerva hover:text-black"
                  >
                    privacidade
                  </Link>
                  .
                </p>
              </div>

              <Button className="py-2.5 mt-4" onClick={handleRegister}>
                Registrar
              </Button>
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

      {isPosting && <Loading />}
    </section>
  );
};

export default RegisterForm;
