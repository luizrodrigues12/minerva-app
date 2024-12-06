"use client";

import { getCookie } from "cookies-next";
import { useEffect, useState, useDeferredValue } from "react";
import useUserStore from "@/stores/userStore";
import AlunosComp from "../home/AlunosComp";
import { AlunosObj } from "@/stores/userStore";
import Link from "next/link";
import useSWR from "swr";
import { Spinner } from "flowbite-react";
import { motion } from "motion/react";

const PageHome = () => {
  const [username, setUsername] = useState("");
  const { setToken } = useUserStore();
  const [busca, setBusca] = useState("");
  const buscaDeferred = useDeferredValue(busca);
  const [dadosAlunos, setDadosAlunos] = useState<Array<AlunosObj>>();

  //Verificando token
  const token = getCookie("authorization");

  const getAlunos = async () => {
    const res = await fetch(`${process.env.HOST}/api/student/get_students`, {
      method: "POST",
      body: JSON.stringify({ token: token }),
    });
    const { alunos } = await res.json();
    setDadosAlunos(alunos);
  };

  // PEGANDO ALUNOS
  // const fetcher = (url: string) =>
  //   fetch(`${process.env.HOST}/api/student/get_students`, {
  //     method: "POST",
  //     body: JSON.stringify({ token: token }),
  //   }).then(async (res) => {
  //     const { alunos } = await res.json();
  //     return alunos;
  //   });

  // const { data: alunosData, mutate } = useSWR<Array<AlunosObj>>(
  //   `${process.env.HOST}/api/student/get_students`,
  //   fetcher
  // );

  useEffect(() => {
    //Pegando o username dos cookies
    const usernameCookie = getCookie("username") as string;
    setUsername(
      usernameCookie.split("")[0].toUpperCase() + usernameCookie.slice(1)
    );
    // mutate(); RETIRAR SE DER ERRADO
    // Setando Token ZUSTAND
    setToken(token!);
    getAlunos();
  }, []);

  return (
    <div className="px-8 md:self-center rounded-lg md:px-6 md:py-5 md:w-[400px] md:border-zinc-800 md:border-2 flex flex-col gap-2">
      {!dadosAlunos ? (
        <div className="flex flex-col justify-center items-center py-10">
          <Spinner />
        </div>
      ) : (
        <motion.div
          animate={{ opacity: [0, 1] }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-2"
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
          {dadosAlunos?.length !== 0 ? (
            dadosAlunos
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
