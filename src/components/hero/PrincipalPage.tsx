"use client";

import { useSectionContext } from "@/contexts/section";
import { motion } from "motion/react";
import Image from "next/image";
import { useRouter } from "nextjs-toploader/app";
import { useEffect } from "react";
import Button from "../layout/Button";

const PrincipalPage = () => {
  const router = useRouter();
  const { setSection } = useSectionContext();

  useEffect(() => {
    setSection("home");
  }, []);

  return (
    <section className="container-home flex items-start justify-between w-full font-inter min-h-[76vh] md:pl-[100px] md:min-h-[76vh] lg:pl-[80px] xl:pl-[195px] xl:min-h-[69.4vh]">
      <div className="flex flex-col items-start pl-8 justify-center h-full text-black my-[32px] gap-7 md:bg-background02 md:mt-[16px] md:p-[35px] md:rounded-[7px] md:shadow-xl lg:flex-row lg:w-[700px] lg:my-[40px] xl:flex-row xl:w-[830px] xl:justify-between xl:my-[40px]">
        <div className="flex flex-col gap-7 items-start lg:gap-[30px] xl:gap-[40px]">
          <h2 className="font-dancing text-[34px] leading-9 md:text-[46px] md:leading-[50px] lg:text-[40px] lg:leading-[45px] xl:text-[55px] xl:leading-[60px]">
            Precisando facilitar <br /> seus planejamentos?
          </h2>

          <div className="self-start">
            <p className="text-[#202020] text-[16px] w-[230px] font-inter md:text-[16px] md:w-[300px] text-left lg:w-[250px] xl:text-[18px] xl:w-[280px]">
              Experimente automatizar esse processo adicionando seus alunos ao{" "}
              <span className="font-interMedium">Minerva</span>.
            </p>
          </div>

          <div className="flex gap-2 xl:gap-3">
            <div className="flex flex-col gap-2 xl:gap-3">
              <Button
                className="py-[9px] md:py-[9.3px] xl:py-[12.5px]"
                onClick={() => router.push("/login")}
              >
                LOGIN
              </Button>
              <Button
                className="py-[9px] md:py-[9.3px] xl:py-[12.5px]"
                onClick={() => router.push("/register")}
              >
                REGISTER
              </Button>
            </div>
            <Button className="px-2" onClick={() => router.push("/home")}>
              <Image
                src={"/images/logo.png"}
                alt="Logo Minerva"
                width={100}
                height={100}
                className="size-[72px] xl:size-[90px]"
              />
            </Button>
          </div>
        </div>

        <div
          className="container-phone w-[245px] h-[160px] bg-zinc-100 border-[6px] border-[#000000] rounded-[10px] md:w-[90%] md:h-[200px] lg:w-[300px] lg:h-[309px] xl:w-[300px] xl:h-[395px] md:self-start lg:self-center"
          style={{ boxShadow: "2px 2px 6px #00000030" }}
        ></div>
      </div>
    </section>
  );
};

export default PrincipalPage;
