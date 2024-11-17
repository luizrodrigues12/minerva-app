"use client";

import { AlunosObj } from "@/stores/userStore";
import { useEffect, useState } from "react";
import MateriaComp from "./MateriaComp";
import { Refresh } from "flowbite-react-icons/outline";
import { redirect } from "next/navigation";

type Props = {
  idAluno: string;
};

const SubjectsStudentForm = ({ idAluno }: Props) => {
  const [oneStudent, setOneStudent] = useState<AlunosObj>();
  const [busca, setBusca] = useState("");

  useEffect(() => {
    getSubjectsStudent();
  }, []);

  const getSubjectsStudent = async () => {
    const result = await fetch(`${process.env.HOST}/api/student/get_subjects`, {
      method: "POST",
      body: JSON.stringify({ idAluno }),
    });
    const { aluno } = await result.json();
    setOneStudent(aluno);
  };

  return (
    <div className="flex flex-col px-8 md:self-center rounded-lg md:px-6 md:py-5 md:w-[400px] md:border-zinc-800 md:border-2 mb-3">
      <div className="flex items-center justify-between pb-2">
        <h1 className="h1_form ">Matérias</h1>
        <Refresh
          size={22}
          color={"#e4e4e7"}
          onClick={() => window.location.reload()}
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="w-full bg-zinc-800 p-1.5 pl-2.5 rounded-lg ">
          {
            oneStudent?.nome
              ?.split(" ")
              .map(
                (palavra) =>
                  `${palavra[0].toUpperCase()}${palavra.substring(1)} `
              )!
          }
        </p>
        <div className="flex gap-1 w-full bg-zinc-800 p-1.5 pl-2.5 rounded-lg mb-2">
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
                className="rounded-lg p-1.5 px-3 border-2 border-roxominerva bg-inherit w-full my-1"
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
              if (materia.materia === "português") return materia.ordem <= 10;
            }).length === 0 ? (
              ""
            ) : (
              <div>
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
                            />
                          );
                      }
                    })}
                </div>
              </div>
            )}

            {/* RENDERIZAÇÃO CONDICIONAL PORTUGUÊS DO PRIMEIRO ANO */}
            {oneStudent?.materias?.filter((materia: any) => {
              if (materia.materia === "português") return materia.ordem > 10;
            }).length === 0 ? (
              ""
            ) : (
              <div className="flex flex-col rounded-lg p-2 border-2 border-zinc-800 mb-3">
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
                          />
                        );
                    }
                  })}
              </div>
            )}

            {/* RENDERIZAÇÃO CONDICIONAL MATEMÁTICA DO SEXTO ANO */}
            {oneStudent?.materias?.filter((materia: any) => {
              if (materia.materia === "matemática") return materia.ordem <= 15;
            }).length === 0 ? (
              ""
            ) : (
              <div>
                <h2 className="font-medium text-zinc-200 text-[1.18rem] pl-0.5 py-1.5">
                  Matemática
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
                      if (objMateria.ordem <= 15) {
                        if (objMateria.materia === "matemática")
                          return (
                            <MateriaComp
                              key={i}
                              text={objMateria.nome.toUpperCase()}
                              isChecked={objMateria.isChecked}
                              id={objMateria._id}
                            />
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

export default SubjectsStudentForm;
