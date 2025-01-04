import React from "react";

const Footer = () => {
  return (
    <div className="w-full px-8 h-[16vh] bg-[#202020] text-zinc-300 flex items-center justify-center text-[12px] gap-[10px] ">
      <div className="flex w-full gap-5 justify-between">
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
      </div>
    </div>
  );
};

export default Footer;
