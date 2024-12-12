"use client";

import { getCookie } from "cookies-next";
import { useEffect, useState, useDeferredValue } from "react";
import useUserStore from "@/stores/userStore";
import AlunosComp from "../home/AlunosComp";
import { AlunosObj } from "@/stores/userStore";
import Link from "next/link";
import { motion } from "motion/react";
import Loading from "../layout/Loading";
import { GET_ALL_STUDENTS } from "@/app/api/graphql/queries";
import { useQuery } from "@apollo/client";

const PageHome = () => {
  const [username, setUsername] = useState("");
  const { setToken } = useUserStore();
  const [busca, setBusca] = useState("");
  const buscaDeferred = useDeferredValue(busca);

  //Verificando token
  const token = getCookie("authorization");

  // PEGANDO ALUNOS
  const { data, refetch } = useQuery(GET_ALL_STUDENTS, {
    variables: { token },
  });

  useEffect(() => {
    //Pegando o username dos cookies
    const usernameCookie = getCookie("username") as string;
    setUsername(
      usernameCookie.split("")[0].toUpperCase() + usernameCookie.slice(1)
    );
    // Setando Token ZUSTAND
    setToken(token!);
    // RECARREGANDO GRAPHQL
    refetch();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center height_pattern w-full">
      {!data ? (
        <div className="flex flex-col justify-center items-center">
          <Loading />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-8 md:self-center rounded-lg md:px-6 md:py-5 md:w-[400px] md:border-zinc-800 md:border-2 flex flex-col gap-2 mb-auto "
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
          {data.alunos.length !== 0 ? (
            data.alunos
              ?.filter((aluno: AlunosObj) =>
                aluno.nome?.toLowerCase().includes(buscaDeferred.toLowerCase())
              )
              ?.sort((a: any, b: any) =>
                a.nome! < b.nome! ? -1 : a.nome! > b.nome! ? 1 : 0
              )
              .map((aluno: AlunosObj, i: number) => {
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
