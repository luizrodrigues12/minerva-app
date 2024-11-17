"use client";

import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { AlunosObj } from "@/stores/userStore";
import MateriaComp from "./MateriaComp";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileCopy } from "flowbite-react-icons/outline";

import copy from "clipboard-copy";

const InfoAlunoComp = ({ idAluno }: { idAluno: string }) => {
  const router = useRouter();
  const [oneStudent, setOneStudent] = useState<AlunosObj>();
  const [checkeds, setCheckeds] = useState(Array<string>);
  const [sextoPort, setSextoPort] = useState(false);
  const [sextoMat, setSextoMat] = useState(false);
  const [primeiroPort, setPrimeiroPort] = useState(false);
  const [primeiroMat, setPrimeiroMat] = useState(false);

  const [busca, setBusca] = useState("");
  const token = getCookie("authorization");

  // GET dados do aluno
  const getOneStudent = async () => {
    const result = await fetch(`${process.env.HOST}/api/student/get_student`, {
      method: "POST",
      body: JSON.stringify({ idAluno: idAluno, token: token }),
    });
    // Pegando aluno do return
    const { aluno } = await result.json();
    setOneStudent(aluno[0]);
  };

  const toggleIsChecked = async (objMateria: any, e: any) => {
    e.preventDefault();
    const result = await fetch(
      `${process.env.HOST}/api/student/toggle_checked`,
      {
        method: "PUT",
        body: JSON.stringify({ objMateria, idAluno, token, checkeds }),
      }
    );

    window.location.reload();
  };

  useEffect(() => {
    getOneStudent();
  }, []);

  return (
    <div className="flex flex-col px-8 md:self-center rounded-lg md:px-6 md:py-5 md:w-[400px] md:border-zinc-800 md:border-2 gap-3 mb-3">
      <div className="flex items-center justify-between">
        <h1 className="h1_form">Matérias</h1>
        <ArrowLeft
          size={22}
          color={"#e4e4e7"}
          onClick={() => router.push("/home")}
        />
      </div>
      {/* NOME DO ALUNO */}
      <div className="flex flex-col gap-2 ">
        <div className="w-full bg-zinc-800 p-1.5 pl-2.5 rounded-lg flex justify-between ">
          <p id="nome_do_aluno">
            {
              oneStudent?.nome
                ?.split(" ")
                .map(
                  (palavra) =>
                    `${palavra[0].toUpperCase()}${palavra.substring(1)} `
                )!
            }
          </p>
          <FileCopy
            color="#e4e4e7"
            className="hover:cursor-pointer"
            onClick={async () =>
              copy(`${process.env.HOST}/parents/get_subjects/${idAluno}`)
            }
          />
        </div>
        <div className="flex gap-1 w-full bg-zinc-800 p-1.5 pl-2.5 rounded-lg ">
          {oneStudent?.preparatorio?.map((prep, i) =>
            prep == "aplicação" ? (
              <p key={i}>{prep[0].toUpperCase() + prep.substring(1)} </p>
            ) : (
              <p key={i}>{prep.toUpperCase()}</p>
            )
          )}
        </div>
      </div>
      <div className="w-full flex gap-2">
        {/* BOTÕES */}
        <Link
          href={`/student/update_student/${idAluno}`}
          className="flex items-center justify-center rounded-lg text-[13px] font-medium p-1.5 w-full md:p-[7px] text-zinc-200 bg-roxominerva tracking-wider"
        >
          EDITAR
        </Link>
        <Link
          href={`/student/delete_student/${idAluno}`}
          className="flex items-center justify-center rounded-lg text-[13px] font-medium p-1.5 w-full md:p-[7px] text-zinc-200 bg-[#961f17de] tracking-wider"
        >
          APAGAR
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
            {oneStudent?.materias?.filter((materia: any) => {
              if (materia.materia === "português") return materia.ordem <= 10;
            }).length === 0 ? (
              ""
            ) : (
              <div>
                {/* PORTUGUÊS DO SEXTO ANO */}
                <h2 className="font-medium text-zinc-200 text-[1.18rem] pl-0.5 py-1.5">
                  Português
                </h2>
                <div className="flex flex-col rounded-lg p-2 border-2 border-zinc-800 mb-3">
                  <p className="font-medium text-zinc-200 text-[1rem] md:text-[0.9rem] pl-2">
                    6° Ano
                  </p>
                  {oneStudent?.materias
                    ?.filter((materia: any) =>
                      materia.nome.toLowerCase().includes(busca.toLowerCase())
                    )
                    ?.sort((a: any, b: any) =>
                      a.ordem < b.ordem ? -1 : a.ordem > b.ordem ? 1 : 0
                    )
                    .map((objMateria: any, i) => {
                      if (objMateria.ordem <= 10) {
                        if (objMateria.materia === "português")
                          return (
                            <MateriaComp
                              key={i}
                              text={objMateria.nome.toUpperCase()}
                              isChecked={objMateria.isChecked}
                              id={objMateria._id}
                              onClick={(e: any) => {
                                // Setando checked nos box
                                toggleIsChecked(objMateria, e);
                              }}
                            />
                          );
                      }
                    })}
                </div>
              </div>
            )}

            {/* RENDERIZAÇÃO CONDICIONAL*/}
            {oneStudent?.materias?.filter((materia: any) => {
              if (materia.materia === "português") return materia.ordem > 10;
            }).length === 0 ? (
              ""
            ) : (
              <div className="flex flex-col rounded-lg p-2 border-2 border-zinc-800 mb-3">
                {/* PORTUGUÊS DO PRIMEIRO ANO */}
                <p className="font-medium text-zinc-200 text-[1rem] md:text-[0.9rem] pl-2">
                  1° Ano
                </p>
                {oneStudent?.materias
                  ?.filter((materia: any) =>
                    materia.nome.toLowerCase().includes(busca.toLowerCase())
                  )
                  ?.sort((a: any, b: any) =>
                    a.ordem < b.ordem ? -1 : a.ordem > b.ordem ? 1 : 0
                  )
                  .map((objMateria: any, i) => {
                    if (objMateria.ordem > 10) {
                      if (objMateria.materia === "português")
                        return (
                          <MateriaComp
                            key={i}
                            text={objMateria.nome.toUpperCase()}
                            isChecked={objMateria.isChecked}
                            id={objMateria._id}
                            onClick={(e: any) => {
                              // Setando checked nos box
                              toggleIsChecked(objMateria, e);
                            }}
                          />
                        );
                    }
                  })}
              </div>
            )}

            {/* RENDERIZAÇÃO CONDICIONAL DO SEXTO ANO */}
            {oneStudent?.materias?.filter((materia: any) => {
              if (materia.materia === "matemática") return materia.ordem <= 15;
            }).length === 0 ? (
              ""
            ) : (
              <div>
                {/* MATEMÁTICA DO 6 ANO */}
                <h2 className="font-medium text-zinc-200 text-[1.18rem] pl-0.5 py-1.5">
                  Matemática
                </h2>
                <div className="flex flex-col rounded-lg p-2 border-2 border-zinc-800 mb-3">
                  {/* MATEMÁTICA DO SEXTO ANO */}

                  <p className="font-medium text-zinc-200 text-[1rem] md:text-[0.9rem] pl-2">
                    6° Ano
                  </p>
                  {oneStudent?.materias
                    ?.filter((materia: any) =>
                      materia.nome.toLowerCase().includes(busca.toLowerCase())
                    )
                    ?.sort((a: any, b: any) =>
                      a.ordem < b.ordem ? -1 : a.ordem > b.ordem ? 1 : 0
                    )
                    .map((objMateria: any, i) => {
                      if (objMateria.ordem <= 15) {
                        if (objMateria.materia === "matemática")
                          return (
                            <MateriaComp
                              key={i}
                              text={objMateria.nome.toUpperCase()}
                              isChecked={objMateria.isChecked}
                              id={objMateria._id}
                              onClick={(e: any) => {
                                // Setando checked nos box
                                toggleIsChecked(objMateria, e);
                              }}
                            />
                          );
                      }
                    })}
                </div>
              </div>
            )}

            {/* RENDERIZAÇÃO CONDICIONAL DO PRIMEIRO ANO */}
            {oneStudent?.materias?.filter((materia: any) => {
              if (materia.materia === "matemática") {
                return materia.ordem > 15;
              }
            }).length === 0 ? (
              ""
            ) : (
              <div className="flex flex-col rounded-lg p-2 border-2 border-zinc-800 mb-3">
                {/* MATEMÁTICA DO Primeiro ANO */}

                <p className="font-medium text-zinc-200 text-[1rem] md:text-[0.9rem] pl-2">
                  1° Ano
                </p>
                {oneStudent?.materias
                  ?.filter((materia: any) =>
                    materia.nome.toLowerCase().includes(busca.toLowerCase())
                  )
                  ?.sort((a: any, b: any) =>
                    a.ordem < b.ordem ? -1 : a.ordem > b.ordem ? 1 : 0
                  )
                  .map((objMateria: any, i) => {
                    if (objMateria.ordem > 15) {
                      if (objMateria.materia === "matemática")
                        return (
                          <MateriaComp
                            key={i}
                            text={objMateria.nome.toUpperCase()}
                            isChecked={objMateria.isChecked}
                            id={objMateria._id}
                            onClick={(e: any) => {
                              // Setando checked nos box
                              toggleIsChecked(objMateria, e);
                            }}
                          />
                        );
                    }
                  })}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default InfoAlunoComp;
