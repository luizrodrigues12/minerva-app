"use client";

import { getCookie } from "cookies-next";
import { useState } from "react";
import NomePreparatorio from "./NomePreparatorio";
import Link from "next/link";
import Loading from "../layout/Loading";
import { motion } from "motion/react";
import { useAlunoData } from "@/hooks/useAlunoData";
import { useChecksMutate } from "@/hooks/useChecksMutate";
import Accordion from "../layout/Accordion";
import MateriaComp from "./MateriaComp";
import { MateriaType } from "@/models/MateriasModel";
import InfoAlunoButtons from "./InfoAlunoButtons";

const InfoAlunoComp = ({ idAluno }: { idAluno: string }) => {
  const [busca, setBusca] = useState("");
  const token = getCookie("authorization");
  const [objMateria, setObjMateria] = useState<any>();
  const { data, isFetching } = useAlunoData(idAluno, token as string);
  const { mutate } = useChecksMutate(objMateria, idAluno, token);

  // Alterando marcado ou não
  const toggleIsChecked = async (objMateria: any, e: any) => {
    e.preventDefault();
    setObjMateria(objMateria);

    mutate({ idAluno, objMateria, token });
  };

  const materiaFilterAndSorted = () => {
    return data.materias
      .sort((a: any, b: any) =>
        a.ordem < b.ordem ? -1 : a.ordem > b.ordem ? 1 : 0
      )
      .filter((materia: any) =>
        materia.nome.toLowerCase().includes(busca.toLowerCase())
      );
  };

  return (
    <div className="flex flex-col justify-center w-full height_pattern">
      {isFetching ? (
        <Loading />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col px-8 md:self-center rounded-lg md:px-6 md:py-5 md:w-[400px] md:border-zinc-800 md:border-2 gap-3 mb-3"
        >
          <div className="flex flex-col gap-3">
            {/* NOME DO ALUNO */}
            <NomePreparatorio idAluno={idAluno} oneStudent={data} />

            <div className="flex flex-col gap-0">
              <form action="">
                <div className="flex flex-col">
                  <div className="flex gap-2 justify-center">
                    <input
                      type="text"
                      id="buscar"
                      className="rounded-lg p-1.5 px-3 border-2 border-zinc-800 bg-inherit w-full mb-[12px] focus:border-zinc-800"
                      placeholder="Pesquisar"
                      value={busca}
                      onChange={(e) => {
                        e.preventDefault();
                        setBusca(e.target.value);
                      }}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    {data.materias.filter(
                      (materia: any) =>
                        materia.materia === "português" && materia.ordem <= 10
                    ).length === 0 ? (
                      ""
                    ) : (
                      <Accordion
                        textLeft="Português"
                        textRight="6° Ano"
                        classNameContent="flex flex-col px-2 bg-zinc-900 border-t-0 border-[6px] border-zinc-800 py-2 rounded-[0.6rem] gap-2"
                      >
                        {materiaFilterAndSorted().map(
                          (materia: MateriaType, i: number) => {
                            if (
                              materia.ordem <= 10 &&
                              materia.materia === "português"
                            )
                              return (
                                <MateriaComp
                                  key={i}
                                  text={materia.nome.toUpperCase()}
                                  id={materia._id!}
                                  isChecked={materia.isChecked}
                                  onClick={(e: any) =>
                                    toggleIsChecked(materia, e)
                                  }
                                />
                              );
                          }
                        )}
                      </Accordion>
                    )}

                    {data.materias.filter(
                      (materia: any) =>
                        materia.materia === "português" && materia.ordem > 10
                    ).length === 0 ? (
                      ""
                    ) : (
                      <Accordion
                        textLeft="Português"
                        textRight="1° Ano"
                        classNameContent="flex flex-col px-2 bg-zinc-900 border-t-0 border-[6px] border-zinc-800 py-2 rounded-[0.6rem] gap-2"
                      >
                        {materiaFilterAndSorted().map(
                          (materia: MateriaType, i: number) => {
                            if (
                              materia.ordem > 10 &&
                              materia.materia === "português"
                            )
                              return (
                                <MateriaComp
                                  key={i}
                                  text={materia.nome.toUpperCase()}
                                  id={materia._id!}
                                  isChecked={materia.isChecked}
                                  onClick={(e: any) =>
                                    toggleIsChecked(materia, e)
                                  }
                                />
                              );
                          }
                        )}
                      </Accordion>
                    )}

                    {data.materias.filter(
                      (materia: any) =>
                        materia.materia === "matemática" && materia.ordem <= 15
                    ).length === 0 ? (
                      ""
                    ) : (
                      <Accordion
                        textLeft="matemática"
                        textRight="6° Ano"
                        classNameContent="flex flex-col px-2 bg-zinc-900 border-t-0 border-[6px] border-zinc-800 py-2 rounded-[0.6rem] gap-2"
                      >
                        {materiaFilterAndSorted().map(
                          (materia: MateriaType, i: number) => {
                            if (
                              materia.ordem <= 15 &&
                              materia.materia === "matemática"
                            )
                              return (
                                <MateriaComp
                                  key={i}
                                  text={materia.nome.toUpperCase()}
                                  id={materia._id!}
                                  isChecked={materia.isChecked}
                                  onClick={(e: any) =>
                                    toggleIsChecked(materia, e)
                                  }
                                />
                              );
                          }
                        )}
                      </Accordion>
                    )}

                    {/* MAT 1 ANO */}
                    {data.materias.filter(
                      (materia: any) =>
                        materia.materia === "matemática" && materia.ordem > 15
                    ).length === 0 ? (
                      ""
                    ) : (
                      <Accordion
                        textLeft="matemática"
                        textRight="1° Ano"
                        classNameContent="flex flex-col px-2 bg-zinc-900 border-t-0 border-[6px] border-zinc-800 py-2 rounded-[0.6rem] gap-2"
                      >
                        {materiaFilterAndSorted().map(
                          (materia: MateriaType, i: number) => {
                            if (
                              materia.ordem > 15 &&
                              materia.materia === "matemática"
                            )
                              return (
                                <MateriaComp
                                  key={i}
                                  text={materia.nome.toUpperCase()}
                                  id={materia._id!}
                                  isChecked={materia.isChecked}
                                  onClick={(e: any) =>
                                    toggleIsChecked(materia, e)
                                  }
                                />
                              );
                          }
                        )}
                      </Accordion>
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
