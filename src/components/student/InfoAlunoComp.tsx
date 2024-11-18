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

const InfoAlunoComp = ({ idAluno }: { idAluno: string }) => {
  const [oneStudent, setOneStudent] = useState<AlunosObj>();
  const [checkeds, setCheckeds] = useState(Array<string>);
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
      </div>
      {/* NOME DO ALUNO */}
      <NomePreparatorio idAluno={idAluno} oneStudent={oneStudent!} />
      <div className="w-full flex gap-2">
        {/* BOTÕES */}
        <div
          onClick={() =>
            (window.location.href = `/student/update_student/${idAluno}`)
          }
          className="flex items-center justify-center rounded-lg text-[13px] font-medium p-1.5 w-full md:p-[7px] text-zinc-200 bg-roxominerva tracking-wider"
        >
          EDITAR
        </div>
        <div
          onClick={() =>
            (window.location.href = `/student/delete_student/${idAluno}`)
          }
          className="flex items-center justify-center rounded-lg text-[13px] font-medium p-1.5 w-full md:p-[7px] text-zinc-200 bg-[#961f17de] tracking-wider"
        >
          APAGAR
        </div>
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
              <MateriasPortugues
                busca={busca}
                materiaAno="port6"
                oneStudent={oneStudent!}
                toggleIsChecked={toggleIsChecked}
              />
            )}

            {/* RENDERIZAÇÃO CONDICIONAL*/}
            {oneStudent?.materias?.filter((materia: any) => {
              if (materia.materia === "português") return materia.ordem > 10;
            }).length === 0 ? (
              ""
            ) : (
              <MateriasPortugues
                busca={busca}
                materiaAno="port1"
                oneStudent={oneStudent!}
                toggleIsChecked={toggleIsChecked}
              />
            )}

            {/* RENDERIZAÇÃO CONDICIONAL DO SEXTO ANO */}
            {oneStudent?.materias?.filter((materia: any) => {
              if (materia.materia === "matemática") return materia.ordem <= 15;
            }).length === 0 ? (
              ""
            ) : (
              <MateriasMatematica
                busca={busca}
                materiaAno="mat6"
                oneStudent={oneStudent!}
                toggleIsChecked={toggleIsChecked}
              />
            )}

            {/* RENDERIZAÇÃO CONDICIONAL DO PRIMEIRO ANO */}
            {oneStudent?.materias?.filter((materia: any) => {
              if (materia.materia === "matemática") {
                return materia.ordem > 15;
              }
            }).length === 0 ? (
              ""
            ) : (
              <MateriasMatematica
                busca={busca}
                materiaAno="mat1"
                oneStudent={oneStudent!}
                toggleIsChecked={toggleIsChecked}
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default InfoAlunoComp;
