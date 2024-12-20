"use client";

import { getCookie } from "cookies-next";
import { useState, useDeferredValue } from "react";
import AlunosComp from "./AlunosComp";
import Link from "next/link";
import { motion } from "motion/react";
import Loading from "../layout/Loading";
import useGetAlunos from "@/hooks/useGetAlunos";

const PageHome = () => {
  const [busca, setBusca] = useState("");
  const buscaDeferred = useDeferredValue(busca);
  const token = getCookie("authorization");
  const { data: alunosData, isFetching } = useGetAlunos(token as string);

  return (
    <div className="flex flex-col justify-center items-center height_pattern w-full">
      {isFetching ? (
        <div className="flex flex-col justify-center items-center">
          <Loading />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-8 md:self-center rounded-lg md:px-6 md:py-5 md:w-[400px] md:border-zinc-800 md:border-2 flex flex-col gap-2 mb-auto w-full"
        >
          {/* SISTEMA DE BUSCA */}
          <div className="flex gap-2 justify-center items-center">
            <input
              type="text"
              id="buscar"
              className="rounded-lg p-1.5 px-3 border-2 border-roxominerva bg-inherit w-full mt-0"
              placeholder="Pesquisar"
              value={busca}
              onChange={(e) => {
                e.preventDefault();
                setBusca(e.target.value);
              }}
            />
            <Link
              href="/add_student"
              className=" bg-roxominerva flex items-center rounded-md p-[15px] h-10 text-zinc-100"
            >
              Adicionar
            </Link>
          </div>
          {/* RENDERIZANDO NOMES EM ORDEM ALFABÉTICA */}
          {alunosData?.length !== 0 ? (
            alunosData
              ?.filter((aluno) =>
                aluno.nome?.toLowerCase().includes(buscaDeferred.toLowerCase())
              )
              ?.sort((a, b) =>
                a.nome! < b.nome! ? -1 : a.nome! > b.nome! ? 1 : 0
              )
              .map((aluno, i) => {
                if (aluno.nome && !(aluno.materias?.length === 0))
                  return (
                    <div key={i}>
                      <AlunosComp idAluno={aluno.idAluno!} text={aluno.nome!} />
                    </div>
                  );
              })
          ) : (
            <p className=" w-full p-2 border-2 border-zinc-800 flex  rounded-lg text-zinc-500  justify-center items-center">
              Nenhum aluno cadastrado.
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default PageHome;
