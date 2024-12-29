"use client";

import { AlunoObj } from "@/models/userModel";
import { useState } from "react";
import MateriaComp from "../../student/MateriaComp";
import useSWR from "swr";
import { motion } from "motion/react";
import Loading from "../../layout/Loading";
import YearAndSubject from "@/components/layout/YearAndSubject";

type Props = {
  idAluno: string;
};

const SubjectsStudentForm = ({ idAluno }: Props) => {
  const [busca, setBusca] = useState("");

  // Pegando subjects
  const fetcher = (url: string) =>
    fetch(`${process.env.HOST}/api/student/get_subjects`, {
      method: "POST",
      body: JSON.stringify({ idAluno }),
    }).then(async (res) => {
      const { aluno } = await res.json();
      return aluno;
    });

  const { data: oneStudent, isValidating } = useSWR<AlunoObj>(
    `${process.env.HOST}/api/student/get_student`,
    fetcher
  );

  return (
    <div className="flex flex-col w-full justify-center items-center height_pattern">
      {isValidating ? (
        <Loading />
      ) : (
        <div className="flex flex-col px-8 md:self-center rounded-lg md:px-6 md:py-5 md:w-[400px] md:border-zinc-800 md:border-2 mb-3 w-full">
          <div>
            <div className="flex items-center justify-between pb-2">
              <h1 className="h1_form ">Matérias</h1>
            </div>
            <div className="flex flex-col gap-2 mb-1">
              <p className="w-full bg-zinc-800 pl-2.5 h-9 rounded-lg flex flex-col justify-center items-start ">
                {
                  oneStudent?.nome
                    ?.split(" ")
                    .map(
                      (palavra) =>
                        `${palavra[0].toUpperCase()}${palavra.substring(1)} `
                    )!
                }
              </p>
              <div className="flex gap-1 w-full bg-zinc-800 p-1.5 h-[36px] pl-2.5 rounded-lg">
                {oneStudent?.preparatorio?.map((prep, i) =>
                  prep == "aplicação" ? (
                    <p key={i}>{prep[0].toUpperCase() + prep.substring(1)} </p>
                  ) : (
                    <p key={i}>{prep.toUpperCase()}</p>
                  )
                )}
              </div>
            </div>
            <div className="flex flex-col gap-0">
              <hr className="bg-zinc-800 border-none h-0.5 my-1" />
              <form action="">
                {/* BUSCA */}
                <div className="flex flex-col">
                  <div className="flex gap-2 justify-center">
                    <input
                      type="text"
                      id="buscar"
                      className="rounded-lg p-1.5 px-3 pb-[6.5px] border-2 border-roxominerva bg-inherit w-full my-1 
                      flex flex-col justify-center items-center mb-2"
                      placeholder="Pesquisar"
                      value={busca}
                      onChange={(e) => {
                        e.preventDefault();
                        setBusca(e.target.value);
                      }}
                    />
                  </div>

                  {/* RENDERIZAÇÃO CONDICIONAL PORTUGUÊS DO SEXTO ANO */}
                  {oneStudent?.materias?.filter((materia: any) => {
                    if (materia.materia === "português")
                      return materia.ordem <= 10;
                  }).length === 0 ? (
                    ""
                  ) : (
                    <div>
                      <div className="flex flex-col rounded-lg p-2 border-2 border-zinc-800 mb-3">
                        <YearAndSubject subject="português" year={6} />
                        {oneStudent?.materias
                          ?.filter((materia: any) =>
                            materia.nome
                              .toLowerCase()
                              .includes(busca.toLowerCase())
                          )
                          ?.sort((a: any, b: any) =>
                            a.ordem < b.ordem ? -1 : a.ordem > b.ordem ? 1 : 0
                          )
                          .map((objMateria: any, i) => {
                            if (objMateria.ordem <= 10) {
                              if (objMateria.materia === "português")
                                return (
                                  <motion.div
                                    animate={{ opacity: [0, 1] }}
                                    transition={{
                                      duration: 0.2,
                                      delay: i * 0.02,
                                    }}
                                    key={i}
                                  >
                                    <MateriaComp
                                      text={objMateria.nome.toUpperCase()}
                                      isChecked={objMateria.isChecked}
                                      id={objMateria._id}
                                    />
                                  </motion.div>
                                );
                            }
                          })}
                      </div>
                    </div>
                  )}

                  {/* RENDERIZAÇÃO CONDICIONAL PORTUGUÊS DO PRIMEIRO ANO */}
                  {oneStudent?.materias?.filter((materia: any) => {
                    if (materia.materia === "português")
                      return materia.ordem > 10;
                  }).length === 0 ? (
                    ""
                  ) : (
                    <div className="flex flex-col rounded-lg p-2 border-2 border-zinc-800 mb-3">
                      <YearAndSubject subject="português" year={1} />
                      {oneStudent?.materias
                        ?.filter((materia: any) =>
                          materia.nome
                            .toLowerCase()
                            .includes(busca.toLowerCase())
                        )
                        ?.sort((a: any, b: any) =>
                          a.ordem < b.ordem ? -1 : a.ordem > b.ordem ? 1 : 0
                        )
                        .map((objMateria: any, i) => {
                          if (objMateria.ordem > 10) {
                            if (objMateria.materia === "português")
                              return (
                                <motion.div
                                  animate={{ opacity: [0, 1] }}
                                  transition={{
                                    duration: 0.2,
                                    delay: i * 0.02,
                                  }}
                                  key={i}
                                >
                                  <MateriaComp
                                    text={objMateria.nome.toUpperCase()}
                                    isChecked={objMateria.isChecked}
                                    id={objMateria._id}
                                  />
                                </motion.div>
                              );
                          }
                        })}
                    </div>
                  )}

                  {/* RENDERIZAÇÃO CONDICIONAL MATEMÁTICA DO SEXTO ANO */}
                  {oneStudent?.materias?.filter((materia: any) => {
                    if (materia.materia === "matemática")
                      return materia.ordem <= 15;
                  }).length === 0 ? (
                    ""
                  ) : (
                    <div>
                      <div className="flex flex-col rounded-lg p-2 border-2 border-zinc-800 mb-3">
                        <YearAndSubject subject="matemática" year={6} />
                        {oneStudent?.materias
                          ?.filter((materia: any) =>
                            materia.nome
                              .toLowerCase()
                              .includes(busca.toLowerCase())
                          )
                          ?.sort((a: any, b: any) =>
                            a.ordem < b.ordem ? -1 : a.ordem > b.ordem ? 1 : 0
                          )
                          .map((objMateria: any, i) => {
                            if (objMateria.ordem <= 15) {
                              if (objMateria.materia === "matemática")
                                return (
                                  <motion.div
                                    animate={{ opacity: [0, 1] }}
                                    transition={{
                                      duration: 0.2,
                                      delay: i * 0.02,
                                    }}
                                    key={i}
                                  >
                                    <MateriaComp
                                      text={objMateria.nome.toUpperCase()}
                                      isChecked={objMateria.isChecked}
                                      id={objMateria._id}
                                    />
                                  </motion.div>
                                );
                            }
                          })}
                      </div>
                    </div>
                  )}

                  {/* RENDERIZAÇÃO CONDICIONAL MATEMÁTICA DO PRIMEIRO ANO */}
                  {oneStudent?.materias?.filter((materia: any) => {
                    if (materia.materia === "matemática") {
                      return materia.ordem > 15;
                    }
                  }).length === 0 ? (
                    ""
                  ) : (
                    <div className="flex flex-col rounded-lg p-2 border-2 border-zinc-800 mb-3">
                      <YearAndSubject subject="matemática" year={1} />
                      {oneStudent?.materias
                        ?.filter((materia: any) =>
                          materia.nome
                            .toLowerCase()
                            .includes(busca.toLowerCase())
                        )
                        ?.sort((a: any, b: any) =>
                          a.ordem < b.ordem ? -1 : a.ordem > b.ordem ? 1 : 0
                        )
                        .map((objMateria: any, i) => {
                          if (objMateria.ordem > 15) {
                            if (objMateria.materia === "matemática")
                              return (
                                <motion.div
                                  animate={{ opacity: [0, 1] }}
                                  transition={{
                                    duration: 0.2,
                                    delay: i * 0.02,
                                  }}
                                  key={i}
                                >
                                  <MateriaComp
                                    text={objMateria.nome.toUpperCase()}
                                    isChecked={objMateria.isChecked}
                                    id={objMateria._id}
                                  />
                                </motion.div>
                              );
                          }
                        })}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectsStudentForm;
