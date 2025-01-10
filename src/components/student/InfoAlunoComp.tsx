"use client";

import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import NomePreparatorio from "./NomePreparatorio";
import Loading from "../layout/Loading";
import { motion } from "motion/react";
import { useChecksMutate } from "@/hooks/useChecksMutate";
import Accordion from "../layout/Accordion";
import MateriaComp from "./MateriaComp";
import { MateriaType } from "@/models/MateriasModel";
import { useUserContext } from "@/contexts/userData";
import InputComp from "../layout/InputComp";
import { useRouter } from "nextjs-toploader/app";

const InfoAlunoComp = ({ idAluno }: { idAluno: string }) => {
  const [busca, setBusca] = useState("");
  const token = getCookie("authorization");
  const [objMateria, setObjMateria] = useState<any>();
  const { user } = useUserContext();
  const { mutate } = useChecksMutate(objMateria, idAluno, token);
  const router = useRouter();
  const alunos = user.alunos?.filter((aluno) => aluno.idAluno === idAluno);
  const aluno = alunos![0];

  // Alterando marcado ou não
  const toggleIsChecked = async (objMateria: any, e: any) => {
    e.preventDefault();
    setObjMateria(objMateria);

    mutate({ idAluno, objMateria, token });
  };

  const getAluno = () => {
    const aluno = user.alunos?.filter((aluno) => aluno.idAluno === idAluno)[0];
    return aluno;
  };

  const materiaFilteredAndSorted = () => {
    return getAluno()
      ?.materias?.sort((a: any, b: any) =>
        a.ordem < b.ordem ? -1 : a.ordem > b.ordem ? 1 : 0
      )
      .filter((materia: any) =>
        materia.nome.toLowerCase().includes(busca.toLowerCase())
      );
  };

  useEffect(() => {
    if (!aluno) {
      router.replace("/home");
    }
  }, []);

  return (
    <div className="flex flex-col justify-center w-full p-6 py-2 md:py-4 lg:p-6 xl:p-6 2xl:p-8">
      {!aluno ? (
        <Loading />
      ) : (
        <div className="flex flex-col w-full rounded-lg gap-3 ">
          <div className="flex flex-col gap-4">
            {/* NOME DO ALUNO */}
            <NomePreparatorio idAluno={idAluno} />

            <div className="flex flex-col gap-0">
              <div className="flex flex-col gap-4">
                <InputComp
                  type="text"
                  placeholder="Assuntos, matérias, etc."
                  value={busca}
                  onChange={(e) => {
                    setBusca(e.target.value);
                  }}
                  className="!mt-0"
                />
                <div className="flex flex-col gap-1.5">
                  <div className="flex flex-col gap-1.5">
                    {getAluno()?.materias?.filter(
                      (materia: any) =>
                        materia.materia === "português" && materia.ordem <= 10
                    ).length === 0 ? (
                      ""
                    ) : (
                      <Accordion
                        textLeft="Português"
                        textRight="6° Ano"
                        classNameContent="flex flex-col p-2 rounded-[0.6rem] gap-2 bg-background02 border-[6px] md:border-[12px] md:rounded-[1rem] md:border-t-0 border-t-0"
                      >
                        {materiaFilteredAndSorted()?.map(
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

                    {getAluno()?.materias?.filter(
                      (materia: any) =>
                        materia.materia === "português" && materia.ordem > 10
                    ).length === 0 ? (
                      ""
                    ) : (
                      <Accordion
                        textLeft="Português"
                        textRight="1° Ano"
                        classNameContent="flex flex-col p-2 rounded-[0.6rem] gap-2 bg-background02 border-[6px] md:border-[12px] md:rounded-[1rem] md:border-t-0 border-t-0"
                      >
                        {materiaFilteredAndSorted()?.map(
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

                    {getAluno()?.materias?.filter(
                      (materia: any) =>
                        materia.materia === "matemática" && materia.ordem <= 15
                    ).length === 0 ? (
                      ""
                    ) : (
                      <Accordion
                        textLeft="matemática"
                        textRight="6° Ano"
                        classNameContent="flex flex-col p-2 rounded-[0.6rem] gap-2 bg-background02 border-[6px] md:border-[12px] md:rounded-[1rem] md:border-t-0 border-t-0"
                      >
                        {materiaFilteredAndSorted()?.map(
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
                    {getAluno()?.materias?.filter(
                      (materia: any) =>
                        materia.materia === "matemática" && materia.ordem > 15
                    ).length === 0 ? (
                      ""
                    ) : (
                      <Accordion
                        textLeft="matemática"
                        textRight="1° Ano"
                        classNameContent="flex flex-col p-2 rounded-[0.6rem] gap-2 bg-background02 border-[6px] md:border-[12px] md:rounded-[1rem] md:border-t-0 border-t-0"
                      >
                        {materiaFilteredAndSorted()?.map(
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoAlunoComp;
