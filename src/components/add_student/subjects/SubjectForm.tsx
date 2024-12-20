"use client";

import { MateriaType } from "@/models/MateriasModel";
import CheckComp from "@/components/add_student/CheckComp";
import { useState } from "react";
import { getCookie } from "cookies-next";
import useSWR from "swr";
import { useRouter } from "nextjs-toploader/app";
import { motion } from "motion/react";
import Loading from "../../layout/Loading";

const SubjectForm = ({ idAluno }: { idAluno: string }) => {
  const [checkeds, setCheckeds] = useState(Array<String>);
  const [AllCheckeds, setAllCheckeds] = useState(false);
  const [error, setError] = useState();
  const token = getCookie("authorization");
  const router = useRouter();

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

  // ADD SUBJECTS
  const fetcherAddSubjects = (url: string) =>
    fetch(`${process.env.HOST}/api/student/add_subjects`, {
      method: "PUT",
      body: JSON.stringify({ checkeds, token, idAluno }),
    })
      .then(async (res) => {
        return res;
      })
      .catch((err) => setError(err.message));

  const { data, mutate: mutateAddSubjects } = useSWR(
    `${process.env.HOST}/api/student/add_subjects`,
    fetcherAddSubjects
  );

  // ENVIANDO MATÉRIAS PARA OS ALUNOS
  const postMaterias = async () => {
    try {
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
  const onClickInput = async () => {
    document.getElementsByName("subject").forEach((subject: any) => {
      if (subject.checked) checkeds.push(subject.value);
    });
    await postMaterias();
    router.push("/home");
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
    <div className="w-full flex flex-col justify-center items-center height_pattern">
      {!subjects ? (
        <Loading />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="px-8 md:self-center rounded-lg md:px-6 md:py-5 md:w-[400px] md:border-zinc-800 md:border-2 mb-3 w-full"
        >
          <form method="POST" className="form_register">
            <h2 className="h1_form text-center">Selecione as Matérias</h2>
            <hr className="bg-zinc-800 h-0.5 border-0" />
            {/*  */}
            <div className="flex flex-col gap-2 text-[13.5px]">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-zinc-200 text-[1.18rem] pl-0.5">
                  Português
                </h3>
                <button onClick={(e) => checkAll(e)} className="text-zinc-200">
                  {AllCheckeds ? "desmarcar tudo" : "selecionar tudo"}
                </button>
              </div>
              <div className="flex flex-col gap-2">
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
                              animateComp={{ opacity: [0, 1] }}
                              transition={{ delay: i * 0.01 }}
                              key={i}
                              text={materia.nome}
                              name="subject"
                              id={materia._id!}
                              htmlFor={materia.nome}
                              value={materia._id!}
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
                              animateComp={{ opacity: [0, 1] }}
                              transition={{ delay: i * 0.01 }}
                              key={i}
                              text={materia.nome}
                              name="subject"
                              id={materia._id!}
                              htmlFor={materia.nome}
                              value={materia._id!}
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
                              animateComp={{ opacity: [0, 1] }}
                              transition={{ delay: i * 0.01 }}
                              key={i}
                              text={materia.nome}
                              name="subject"
                              id={materia._id!}
                              htmlFor={materia.nome}
                              value={materia._id!}
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
                              animateComp={{ opacity: [0, 1] }}
                              transition={{ delay: i * 0.01 }}
                              key={i}
                              text={materia.nome}
                              name="subject"
                              id={materia._id!}
                              htmlFor={materia.nome}
                              value={materia._id!}
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

            <button
              className="btn_submit_form"
              onClick={(e) => {
                e.preventDefault();
                onClickInput();
              }}
            >
              Salvar
            </button>
          </form>
        </motion.div>
      )}
    </div>
  );
};

export default SubjectForm;
