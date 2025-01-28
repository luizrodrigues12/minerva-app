"use client";

import { useSectionContext } from "@/contexts/section";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const { section } = useSectionContext();

  return (
    <>
      {section === "login" || section === "register" || section === "home" ? (
        <footer className="w-full px-6 h-[16vh] bg-[#202020] text-zinc-300 flex items-center justify-center text-[12px] gap-[10px] md:h-[14vh] md:px-[100px] lg:px-[60px] xl:px-[100px] xl:h-[20vh] xl:text-[14px] 2xl:px-[300px]">
          <div className="flex w-full gap-10 justify-start md:gap-[60px] xl:gap-[100px]">
            <div className="flex flex-col gap-[5px]">
              <p className="text-[#9E9E9E]">navegação</p>
              <ul className="flex flex-col gap-1">
                <li>alunos</li>
                <li>planejamentos</li>
                <li>perfil</li>
              </ul>
            </div>

            <div className="flex flex-col gap-[5px]">
              <p className="text-[#9E9E9E]">contate-nos</p>
              <ul className="flex flex-col gap-1">
                <li>minerva.atendimento@gmail.com</li>
                <li>@minervareforco</li>
              </ul>
            </div>

            <div className="flex-col gap-[5px] hidden md:flex">
              <p className="text-[#9E9E9E]">políticas</p>
              <ul className="flex flex-col gap-1">
                <li>
                  <Link href={"/privacy"}>privacidade</Link>
                </li>
                <li>
                  <Link href={"/terms-of-use"}>termos de uso</Link>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      ) : (
        " "
      )}
    </>
  );
};

export default Footer;
