"use client";

import { MateriaType } from "@/models/MateriasModel";
import CheckComp from "@/components/addStudent/CheckComp";
import { useState } from "react";
import { getCookie } from "cookies-next";
import useUserStore from "@/stores/userStore";
import useSWR from "swr";
import { Spinner } from "flowbite-react";

const SubjectForm = ({ idAluno }: { idAluno: string }) => {
  const useUser = useUserStore();
  const [checkeds, setCheckeds] = useState(Array<String>);
  const [isChecked, setIsChecked] = useState(false);
  const [AllCheckeds, setAllCheckeds] = useState(false);
  const [error, setError] = useState();
  const token = getCookie("authorization");

  // GET todas as matérias
  const fetcher = (url: string) =>
    fetch(`${process.env.HOST}/api/subject/get_subjects`, {
      method: "GET",
    })
      .then(async (res) => {
        const { materias } = await res.json();
        return materias;
      })
      .catch((err) => setError(err.message));

  const { data: subjects, mutate: mutateGetAllSubjects } = useSWR<
    Array<MateriaType>
  >(`${process.env.HOST}/api/subject/get_subjects`, fetcher);

  // ENVIANDO MATÉRIAS PARA OS ALUNOS
  const postMaterias = async () => {
    try {
      // VERIFICANDO SE MATÉRIA FOI SELECIONADA
      if (checkeds.length === 0)
        throw new Error("Selecione pelo menos uma matéria.");

      // POSTANDO MATÉRIAS NOS ALUNOS
      await fetch(`${process.env.HOST}/api/student/add_subjects`, {
        method: "PUT",
        body: JSON.stringify({ checkeds, token, idAluno }),
      })
        .then(async (res) => {
          return res;
        })
        .catch((err) => setError(err.message));
    } catch (error: any) {
      setError(error.message);
    }
  };

  // Função pra saber quais estão marcados
  const onClickInput = () => {
    document.getElementsByName("subject").forEach((subject: any) => {
      if (subject.checked) checkeds.push(subject.value);
    });
    postMaterias();

    window.location.href = `${process.env.HOST}/home`;
  };

  const checkAll = (e: any) => {
    e.preventDefault();

    const mat = document.getElementsByName("subject");
    mat.forEach((des: any) =>
      AllCheckeds ? (des.checked = false) : (des.checked = true)
    );
    setAllCheckeds(!AllCheckeds);
  };

  return (
    <div className="px-8 md:self-center rounded-lg md:px-6 md:py-5 md:w-[400px] md:border-zinc-800 md:border-2 mb-3">
      <form method="POST" className="form_register">
        <h2 className="h1_form text-center">Selecione as Matérias</h2>
        <hr className="bg-zinc-800 h-0.5 border-0" />
        {!subjects ? (
          <div className="flex flex-col justify-center items-center py-10">
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col gap-2 text-[13.5px]">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-zinc-200 text-[1.18rem] pl-0.5">
                Português
              </h3>
              <button onClick={(e) => checkAll(e)} className="text-zinc-200">
                {AllCheckeds ? "desmarcar tudo" : "selecionar tudo"}
              </button>
            </div>
            <div>
              {/* PORTUGUÊS DO 6 ANO  */}
              <div className="flex flex-col gap-2 rounded-lg p-2 border-2 border-zinc-800">
                <p className="font-medium text-zinc-200 text-[1rem] md:text-[0.9rem] pl-2">
                  6° Ano
                </p>
                {subjects
                  ?.sort((a, b) =>
                    a.ordem < b.ordem ? -1 : a.ordem > b.ordem ? 1 : 0
                  )
                  .map((materia, i) => {
                    if (materia.ordem <= 10) {
                      if (materia.materia === "português") {
                        return (
                          <CheckComp
                            key={i}
                            text={materia.nome}
                            name="subject"
                            id={materia._id!}
                            htmlFor={materia.nome}
                            value={materia._id!}
                            isChecked={isChecked}
                          />
                        );
                      }
                    }
                  })}
              </div>
              {/* PORTUGUÊS DO 1 ANO */}
              <div className="flex flex-col gap-2 rounded-lg p-2 border-2 border-zinc-800">
                <p className="font-medium text-zinc-200 text-[1rem] md:text-[0.9rem] pl-2">
                  1° Ano
                </p>
                {subjects
                  ?.sort((a, b) =>
                    a.ordem < b.ordem ? -1 : a.ordem > b.ordem ? 1 : 0
                  )
                  .map((materia, i) => {
                    if (materia.ordem > 10) {
                      if (materia.materia === "português") {
                        return (
                          <CheckComp
                            key={i}
                            text={materia.nome}
                            name="subject"
                            id={materia._id!}
                            htmlFor={materia.nome}
                            value={materia._id!}
                            isChecked={isChecked}
                          />
                        );
                      }
                    }
                  })}
              </div>
              <h3 className="font-medium text-zinc-200 text-[1.18rem] pl-0.5">
                Matemática
              </h3>
              {/* MATEMÁTICA DO 6 ANO */}
              <div className="flex flex-col gap-2 rounded-lg p-2 border-2 border-zinc-800">
                <p className="font-medium text-zinc-200 text-[1rem] md:text-[0.9rem] pl-2">
                  6° Ano
                </p>
                {subjects
                  ?.sort((a, b) =>
                    a.ordem < b.ordem ? -1 : a.ordem > b.ordem ? 1 : 0
                  )
                  .map((materia, i) => {
                    if (materia.ordem <= 15) {
                      if (materia.materia === "matemática") {
                        return (
                          <CheckComp
                            key={i}
                            text={materia.nome}
                            name="subject"
                            id={materia._id!}
                            htmlFor={materia.nome}
                            value={materia._id!}
                            isChecked={isChecked}
                          />
                        );
                      }
                    }
                  })}
              </div>
              {/* MATEMÁTICA DO 1 ANO */}
              <div className="flex flex-col gap-2 rounded-lg p-2 border-2 border-zinc-800">
                <p className="font-medium text-zinc-200 text-[1rem] md:text-[0.9rem] pl-2">
                  1° Ano
                </p>
                {subjects
                  ?.sort((a, b) =>
                    a.ordem < b.ordem ? -1 : a.ordem > b.ordem ? 1 : 0
                  )
                  .map((materia, i) => {
                    if (materia.ordem > 15) {
                      if (materia.materia === "matemática") {
                        return (
                          <CheckComp
                            key={i}
                            text={materia.nome}
                            name="subject"
                            id={materia._id!}
                            htmlFor={materia.nome}
                            value={materia._id!}
                            isChecked={isChecked}
                          />
                        );
                      }
                    }
                  })}
              </div>
            </div>
            {error ? (
              <p className="text-[14px] py-0.5 bg-zinc-900 text-center text-[#FAA139]">
                {error}
              </p>
            ) : (
              ""
            )}
          </div>
        )}

        <button
          className="btn_submit_form"
          onClick={(e) => {
            e.preventDefault();
            onClickInput();
            useUser.emptyStateChecks();
          }}
        >
          Salvar
        </button>
      </form>
    </div>
  );
};

export default SubjectForm;
