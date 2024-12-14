"use client";

import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import MateriasPortugues from "./MateriasPortugues";
import MateriasMatematica from "./MateriasMatematica";
import NomePreparatorio from "./NomePreparatorio";
import Link from "next/link";
import Loading from "../layout/Loading";
import { motion } from "motion/react";
import { useAlunoData } from "@/hooks/useAlunoData";
import { useChecksMutate } from "@/hooks/useChecksMutate";

const InfoAlunoComp = ({ idAluno }: { idAluno: string }) => {
  const [busca, setBusca] = useState("");
  const token = getCookie("authorization");
  const [objMateria, setObjMateria] = useState<any>();
  const { data, isLoading, isFetching, refetch } = useAlunoData(
    idAluno,
    token as string
  );
  const { mutate } = useChecksMutate(objMateria, idAluno, token);

  // Alterando marcado ou não
  const toggleIsChecked = async (objMateria: any, e: any) => {
    e.preventDefault();
    setObjMateria(objMateria);

    mutate({ idAluno, objMateria, token });
  };

  useEffect(() => {}, []);

  return (
    <div className="flex flex-col justify-center w-full height_pattern">
      {isLoading ? (
        <Loading />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col px-8 md:self-center rounded-lg md:px-6 md:py-5 md:w-[400px] md:border-zinc-800 md:border-2 gap-3 mb-3 "
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h1 className="h1_form">Matérias</h1>
            </div>
            {/* NOME DO ALUNO */}
            <NomePreparatorio idAluno={idAluno} oneStudent={data} />
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

                  <div>
                    {/* RENDERIZAÇÃO CONDICIONAL DO SEXTO ANO */}
                    {data?.materias?.filter((materia: any) => {
                      if (materia.materia === "português")
                        return materia.ordem <= 10;
                    }).length === 0 ? (
                      ""
                    ) : (
                      <MateriasPortugues
                        busca={busca}
                        materiaAno="port6"
                        oneStudent={data}
                        toggleIsChecked={toggleIsChecked}
                      />
                    )}
                    {/* RENDERIZAÇÃO CONDICIONAL*/}
                    {data?.materias?.filter((materia: any) => {
                      if (materia.materia === "português")
                        return materia.ordem > 10;
                    }).length === 0 ? (
                      ""
                    ) : (
                      <MateriasPortugues
                        busca={busca}
                        materiaAno="port1"
                        oneStudent={data}
                        toggleIsChecked={toggleIsChecked}
                      />
                    )}
                    {/* RENDERIZAÇÃO CONDICIONAL DO SEXTO ANO */}
                    {data?.materias?.filter((materia: any) => {
                      if (materia.materia === "matemática")
                        return materia.ordem <= 15;
                    }).length === 0 ? (
                      ""
                    ) : (
                      <MateriasMatematica
                        busca={busca}
                        materiaAno="mat6"
                        oneStudent={data}
                        toggleIsChecked={toggleIsChecked}
                      />
                    )}
                    {/* RENDERIZAÇÃO CONDICIONAL DO PRIMEIRO ANO */}
                    {data?.materias?.filter((materia: any) => {
                      if (materia.materia === "matemática") {
                        return materia.ordem > 15;
                      }
                    }).length === 0 ? (
                      ""
                    ) : (
                      <MateriasMatematica
                        busca={busca}
                        materiaAno="mat1"
                        oneStudent={data}
                        toggleIsChecked={toggleIsChecked}
                      />
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default InfoAlunoComp;
