"use client";

import { useState } from "react";
import MateriaComp from "../../student/MateriaComp";
import Loading from "../../layout/Loading";
import Accordion from "@/components/layout/Accordion";
import { useAlunoData } from "@/hooks/useAlunoData";
import { getCookie } from "cookies-next/client";
import { MateriaType } from "@/models/MateriasModel";
import { useParentsData } from "@/hooks/useParentsData";

type Props = {
  idAluno: string;
};

const SubjectsStudentForm = ({ idAluno }: Props) => {
  const token = getCookie("authorization");
  const [busca, setBusca] = useState("");
  const { data, isFetching } = useParentsData(idAluno);

  const materiaFilterAndSorted = () => {
    return data?.materias
      .sort((a: any, b: any) =>
        a.ordem < b.ordem ? -1 : a.ordem > b.ordem ? 1 : 0
      )
      .filter((materia: any) =>
        materia.nome
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(busca)
      );
  };

  console.log(busca);

  return (
    <div className="flex flex-col w-full justify-center items-center height_pattern">
      {isFetching ? (
        <Loading />
      ) : (
        <div className="flex flex-col px-8 md:self-center rounded-lg md:px-6 md:py-5 md:w-[400px] md:border-zinc-800 md:border-2 mb-3 w-full">
          <div>
            <div className="flex flex-col gap-2 mb-1">
              <p className="w-full bg-zinc-800 pl-2.5 h-9 rounded-lg flex flex-col justify-center items-start ">
                {
                  data?.nome
                    ?.split(" ")
                    .map(
                      (palavra: any) =>
                        `${palavra[0].toUpperCase()}${palavra.substring(1)} `
                    )!
                }
              </p>
              <div className="flex gap-1 w-full bg-zinc-800 p-1.5 h-[36px] pl-2.5 rounded-lg">
                {data?.preparatorio?.map((prep: any, i: number) =>
                  prep == "aplicação" ? (
                    <p key={i}>{prep[0].toUpperCase() + prep.substring(1)} </p>
                  ) : (
                    <p key={i}>{prep.toUpperCase()}</p>
                  )
                )}
              </div>
            </div>
            <div className="flex flex-col gap-0">
              <form action="">
                {/* BUSCA */}
                <div className="flex flex-col">
                  <div className="flex gap-2 justify-center">
                    <input
                      type="text"
                      id="buscar"
                      className="rounded-lg p-1.5 px-3 border-2 border-zinc-800 bg-inherit w-full 
                      placeholder:text-zinc-400 my-[10px] focus:border-zinc-800"
                      placeholder="Pesquisar"
                      value={busca}
                      onChange={(e) => {
                        e.preventDefault();
                        setBusca(
                          e.target.value
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, "")
                            .toLowerCase()
                        );
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    {data.materias.filter(
                      (materia: any) =>
                        materia.materia === "português" &&
                        materia.ordem <= 10 &&
                        materia.nome
                          .normalize("NFD")
                          .toLowerCase()
                          .includes(busca)
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
                                />
                              );
                          }
                        )}
                      </Accordion>
                    )}

                    {data.materias.filter(
                      (materia: any) =>
                        materia.materia === "português" &&
                        materia.ordem > 10 &&
                        materia.nome
                          .normalize("NFD")
                          .toLowerCase()
                          .includes(busca)
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
                                />
                              );
                          }
                        )}
                      </Accordion>
                    )}

                    {data.materias.filter(
                      (materia: any) =>
                        materia.materia === "matemática" &&
                        materia.ordem <= 15 &&
                        materia.nome
                          .normalize("NFD")
                          .toLowerCase()
                          .includes(busca)
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
                                />
                              );
                          }
                        )}
                      </Accordion>
                    )}

                    {/* MAT 1 ANO */}
                    {data.materias.filter(
                      (materia: MateriaType) =>
                        materia.materia === "matemática" &&
                        materia.ordem > 15 &&
                        materia.nome
                          .normalize("NFD")
                          .toLowerCase()
                          .includes(busca)
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
        </div>
      )}
    </div>
  );
};

export default SubjectsStudentForm;
