"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSectionContext } from "@/contexts/section";
import { useRouter } from "nextjs-toploader/app";
import Button from "../layout/Button";
import Loading from "../layout/Loading";
import InputComp from "../layout/InputComp";
import EyeComp from "../layout/EyeComp";

const LoginForm = () => {
  // State com os dados
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const { setSection } = useSectionContext();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      if (!email) {
        setEmailError("Digite um email válido!");
        return;
      }
      if (!password) {
        setpasswordError("Digite uma senha válida.");
        return;
      }

      //Enviando post dos dados
      setIsPosting(true);
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
      setIsPosting(false);
      err.message.toLowerCase().includes("senha")
        ? setpasswordError(err.message)
        : setEmailError(err.message);
    }
  };

  useEffect(() => {
    setSection("login");
  }, []);

  return (
    <section className="flex flex-col items-center md:items-start text-black font-inter min-h-[76vh] bg-background01 max-h-[92.2vh] xl:min-h-[69.4vh] section-login py-[32px] lg:py-[40px] light">
      <div
        className="flex flex-col w-[90%] py-[24px] pb-[32px] px-6 bg-background03 border-borderColor rounded-md md:mx-[100px] md:px-[35px] md:w-[450px] md:pb-10 lg:mt-0 lg:flex-row-reverse lg:w-[750px] lg:px-0 lg:justify-between lg:gap-0 lg:py-0 lg:mx-[60px] xl:mx-[100px] xl:w-[900px] 2xl:mx-[300px]"
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
              <InputComp
                type="email"
                name="email"
                autoComplete="email"
                placeholder={"digite seu email"}
                className="!bg-background02"
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

            <div className={"mb-0"}>
              <div className="text-[16px]">senha</div>
              <div className="flex relative">
                <InputComp
                  type={isShow ? "text" : "password"}
                  id="input-password"
                  name="password"
                  value={password || ""}
                  className="!bg-background02"
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

              <Button className="py-2.5 mt-[20px]" onClick={handleLogin}>
                Login
              </Button>
            </div>
          </div>
        </div>

        <Image
          src={"/images/back-login.jpg"}
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

export default LoginForm;
