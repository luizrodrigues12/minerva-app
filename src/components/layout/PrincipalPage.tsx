"use client";

import Container from "@/components/layout/Container";
import Image from "next/image";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";

const PrincipalPage = () => {
  const router = useRouter();
  return (
    <section className="w-full min-h-screen flex flex-col justify-start items-center foto-professora">
      <Container className="px-5 md:p-0">
        <div className="self-center min-h-full w-full flex flex-col md:flex-row justify-center items-center gap-2 my-6 mt-8 md:gap-5 2xl:gap-10 md:mt-20 lg:mt-16 lg:gap-10 xl:justify-start">
          <div className="flex flex-col gap-4 w-[340px] md:w-[250px] lg:w-[280px] md:self-start md:pt-3 md:gap-4 lg:gap-5 ">
            <div className="flex flex-col gap-3 lg:gap-4">
              <motion.h1
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="font-handlee tracking-wide text-zinc-200 text-[55px] leading-[0.6em] md:text-[68px] md:leading-[0.7em] lg:text-[80px]"
              >
                Minerva
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                className="font-parkinsans-normal text-[15px] w-[70%] md:text-[16px] md:w-[250px] lg:text-[19px] lg:w-[290px] xl:text-[19px] xl:w-[300px]"
              >
                Gerencie seus planejamentos com mais facilidade.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.9 }}
              className="hidden self-start md:w-[234px] flex-col justify-center items-center gap-2 px-0.5 pb-6 md:flex lg:flex-col lg:w-full"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1 }}
                style={{ boxShadow: "0 0 10px #00000040" }}
                className="w-full p-2 rounded-lg bg-[#4f47a8ea] text-zinc-200 text-center hover:cursor-pointer hover:bg-[#4f47a8]"
                onClick={() => router.push("/login")}
              >
                Entrar
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1 }}
                style={{ boxShadow: "0 0 10px #00000040" }}
                className="w-full p-2 rounded-lg bg-[#4f47a8ea] text-zinc-200 text-center hover:cursor-pointer hover:bg-[#4f47a8]"
                onClick={() => router.push("/register")}
              >
                Criar Conta
              </motion.div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.9 }}
            className="mt-2 rounded-lg"
          >
            <Image
              src={"https://i.ibb.co/MBhvJ1D/minerva-01.jpg"}
              quality={80}
              alt="Foto minerva"
              id="foto-minerva"
              width={800}
              height={800}
              className="rounded-lg box-foto-minerva w-[340px] md:w-[480px]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 1.2 }}
            className="self-center flex w-[340px] justify-center items-center gap-2 px-0.5 pb-6 pt-2 md:hidden"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1 }}
              style={{ boxShadow: "0 0 10px #00000040" }}
              className="w-full p-2 rounded-lg bg-[#4f47a8ea] text-zinc-200 text-center hover:cursor-pointer hover:bg-[#4f47a8]"
              onClick={() => router.push("/login")}
            >
              Entrar
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1 }}
              style={{ boxShadow: "0 0 10px #00000040" }}
              className="w-full p-2 rounded-lg bg-[#4f47a8ea] text-zinc-200 text-center hover:cursor-pointer hover:bg-[#4f47a8]"
              onClick={() => router.push("/register")}
            >
              Criar Conta
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default PrincipalPage;
