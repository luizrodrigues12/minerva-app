"use client";

import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { AlunosObj } from "@/stores/userStore";
import MateriaComp from "./MateriaComp";
import { FileCopy } from "flowbite-react-icons/outline";

import copy from "clipboard-copy";
import MateriasPortugues from "./MateriasPortugues";
import MateriasMatematica from "./MateriasMatematica";
import NomePreparatorio from "./NomePreparatorio";
import useSWR from "swr";
import { Spinner } from "flowbite-react";
import Link from "next/link";

const InfoAlunoComp = ({ idAluno }: { idAluno: string }) => {
  const [checkeds, setCheckeds] = useState(Array<string>);
  const [busca, setBusca] = useState("");
  const token = getCookie("authorization");

  // Pegando dados do aluno
  const fetcher = (url: string) =>
    fetch(`${process.env.HOST}/api/student/get_student`, {
      method: "POST",
      body: JSON.stringify({ idAluno: idAluno, token: token }),
    }).then(async (res) => {
      const { aluno } = await res.json();
      return aluno[0];
    });

  const { data: aluno, mutate } = useSWR(
    `${process.env.HOST}/api/student/get_student`,
    fetcher
  );

  const toggleIsChecked = async (objMateria: any, e: any) => {
    e.preventDefault();
    const result = await fetch(
      `${process.env.HOST}/api/student/toggle_checked`,
      {
        method: "PUT",
        body: JSON.stringify({ objMateria, idAluno, token, checkeds }),
      }
    );

    mutate(`${process.env.HOST}/api/student/toggle_checked`);
  };

  return (
    <div className="flex flex-col px-8 md:self-center rounded-lg md:px-6 md:py-5 md:w-[400px] md:border-zinc-800 md:border-2 gap-3 mb-3">
      {!aluno ? (
        <div className="flex flex-col justify-center items-center w-full h-screen">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h1 className="h1_form">Matérias</h1>
          </div>
          {/* NOME DO ALUNO */}
          <NomePreparatorio idAluno={idAluno} oneStudent={aluno!} />
          <div className="w-full flex gap-2">
            {/* BOTÕES */}
            <Link
              prefetch
              href={`/student/update_student/${idAluno}`}
              className="flex items-center justify-center rounded-lg text-[13px] font-medium p-1.5 w-full md:p-[7px] text-zinc-200 bg-roxominerva tracking-wider"
            >
              EDITAR
            </Link>
            <Link
              prefetch
              href={`/student/delete_student/${idAluno}`}
              className="flex items-center justify-center rounded-lg text-[13px] font-medium p-1.5 w-full md:p-[7px] text-zinc-200 bg-[#961f17de] tracking-wider"
            >
              <div>APAGAR</div>
            </Link>
          </div>
          <div className="flex flex-col gap-0">
            <hr className="bg-zinc-800 border-none h-0.5 my-1" />
            <form action="">
              <div className="flex flex-col">
                <div className="flex gap-2 justify-center">
                  <input
                    type="text"
                    id="buscar"
                    className="rounded-lg p-1.5 px-3 border-2 border-roxominerva bg-inherit w-full my-1"
                    placeholder="Pesquisar"
                    value={busca}
                    onChange={(e) => {
                      e.preventDefault();
                      setBusca(e.target.value);
                    }}
                  />
                </div>

                {/* RENDERIZAÇÃO CONDICIONAL DO SEXTO ANO */}
                {aluno?.materias?.filter((materia: any) => {
                  if (materia.materia === "português")
                    return materia.ordem <= 10;
                }).length === 0 ? (
                  ""
                ) : (
                  <MateriasPortugues
                    busca={busca}
                    materiaAno="port6"
                    oneStudent={aluno!}
                    toggleIsChecked={toggleIsChecked}
                  />
                )}

                {/* RENDERIZAÇÃO CONDICIONAL*/}
                {aluno?.materias?.filter((materia: any) => {
                  if (materia.materia === "português")
                    return materia.ordem > 10;
                }).length === 0 ? (
                  ""
                ) : (
                  <MateriasPortugues
                    busca={busca}
                    materiaAno="port1"
                    oneStudent={aluno!}
                    toggleIsChecked={toggleIsChecked}
                  />
                )}

                {/* RENDERIZAÇÃO CONDICIONAL DO SEXTO ANO */}
                {aluno?.materias?.filter((materia: any) => {
                  if (materia.materia === "matemática")
                    return materia.ordem <= 15;
                }).length === 0 ? (
                  ""
                ) : (
                  <MateriasMatematica
                    busca={busca}
                    materiaAno="mat6"
                    oneStudent={aluno!}
                    toggleIsChecked={toggleIsChecked}
                  />
                )}

                {/* RENDERIZAÇÃO CONDICIONAL DO PRIMEIRO ANO */}
                {aluno?.materias?.filter((materia: any) => {
                  if (materia.materia === "matemática") {
                    return materia.ordem > 15;
                  }
                }).length === 0 ? (
                  ""
                ) : (
                  <MateriasMatematica
                    busca={busca}
                    materiaAno="mat1"
                    oneStudent={aluno!}
                    toggleIsChecked={toggleIsChecked}
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoAlunoComp;
