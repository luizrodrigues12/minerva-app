"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useRouter } from "nextjs-toploader/app";

const PrincipalPage = () => {
  const router = useRouter();
  return (
    <section className="container-home flex items-start justify-between w-full font-inter min-h-[76vh] md:pl-[100px] md:min-h-[76vh]">
      <div className="flex flex-col items-start pl-8 justify-center h-full text-black mt-[32px] gap-7 md:bg-background02 md:mt-[16px] md:p-[35px] md:items-center md:rounded-[7px] md:shadow-lg">
        <h2 className="font-dancing text-[34px] leading-9 md:text-[46px] md:leading-[50px]">
          Precisando facilitar <br /> seus planejamentos?
        </h2>

        <div className="self-center">
          <p className="text-[#202020] text-[16px] w-[230px] font-inter md:text-[16px] md:w-[300px] text-center ">
            Experimente automatizar esse processo adicionando seus alunos ao{" "}
            <span className="font-interMedium">Minerva</span>.
          </p>
        </div>

        <div className="flex gap-2">
          <div className="flex flex-col gap-2">
            <motion.div
              whileTap={{ scale: 0.95 }}
              className="bg-roxominerva h-[38px] px-10 flex items-center justify-center text-[14px] text-buttonText rounded-[4px] hover:bg-buttonHover hover:text-zinc-100 md:h-[40px]"
              style={{ boxShadow: "-2px 2px 5px #00000030" }}
              onClick={() => router.push("/register")}
            >
              REGISTER
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.95 }}
              className="bg-roxominerva h-[38px] px-10 flex items-center justify-center text-[14px] text-buttonText rounded-[4px] hover:bg-buttonHover hover:text-zinc-100"
              style={{ boxShadow: "-2px 2px 5px #00000030" }}
              onClick={() => router.push("/login")}
            >
              LOGIN
            </motion.div>
          </div>
          <motion.div
            whileTap={{ scale: 0.95 }}
            className="h-[86px] bg-roxominerva w-[86px] rounded-[4px] flex items-center justify-center hover:bg-buttonHover hover:text-zinc-100"
            style={{ boxShadow: "-2px 2px 5px #00000030" }}
            onClick={() => router.push("/home")}
          >
            <Image
              src={"/images/logo.png"}
              alt="Logo Minerva"
              width={72}
              height={72}
            />
          </motion.div>
        </div>

        <motion.div className="container-phone w-[240px] h-[160px] bg-zinc-100 border-[6px] border-black rounded-[10px] md:w-[90%] md:h-[200px] "></motion.div>
      </div>
    </section>
  );
};

export default PrincipalPage;
