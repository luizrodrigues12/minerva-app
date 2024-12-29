"use client";

import CheckComp from "@/components/add_student/CheckComp";
import { useEffect, useState } from "react";
import { useRouter } from "nextjs-toploader/app";
import { motion } from "motion/react";
import { useAddStudent } from "@/hooks/useAddStudent";
import { MateriaType } from "@/models/MateriasModel";

interface Props {
  idAluno: string;
  nomeAluno: string;
  subjects: Array<MateriaType>;
}

const SubjectForm = ({ idAluno, nomeAluno, subjects }: Props) => {
  const [checkedsSubjects, setCheckedsSubjects] = useState(Array<String>);
  const [AllCheckeds, setAllCheckeds] = useState(false);
  const [checkedsPrep, setCheckedsPrep] = useState(Array<string>);
  const [error, setError] = useState();
  const router = useRouter();
  const { mutate } = useAddStudent(
    idAluno,
    nomeAluno,
    checkedsPrep,
    checkedsSubjects
  );

  const getCheckedsPrep = () => {
    try {
      document.getElementsByName("checkItem").forEach((check: any) => {
        if (check.checked && !checkedsPrep.includes(check.value)) {
          checkedsPrep.push(check.value);
        }
      });
    } catch (error: any) {
      setError(error.message);
    }
  };

  const getCheckedsSubjects = () => {
    document.getElementsByName("subject").forEach((subject: any) => {
      if (subject.checked) checkedsSubjects.push(subject.value);
    });
  };

  const onClickInput = async () => {
    try {
      getCheckedsSubjects();
      getCheckedsPrep();

      // Verificações
      if (!nomeAluno) throw new Error("Escolha um nome válido.");
      if (checkedsPrep.length == 0) throw new Error("Escolha um preparatório.");
      if (checkedsSubjects.length == 0)
        throw new Error("Escolha pelo menos uma matéria.");

      // POSTANDO ALUNO
      mutate({ idStudent: idAluno, nomeAluno, checkedsPrep, checkedsSubjects });
      router.push("/home");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const checkAll = (e: any) => {
    e.preventDefault();
    const mat = document.getElementsByName("subject");
    mat.forEach((des: any) =>
      AllCheckeds ? (des.checked = false) : (des.checked = true)
    );
    setAllCheckeds(!AllCheckeds);
  };

  useEffect(() => {
    setCheckedsPrep([]);
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center ">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="md:self-center rounded-lg md:w-[400px] mb-3 w-full md:px-8"
      >
        <hr className="bg-zinc-800 border-0 h-0.5 my-2" />
        <div className="form_register">
          <div className="flex justify-between">
            <h2 className="text-xl font-medium tracking-wide py-1 px-1 text-zinc-200">
              Matérias
            </h2>
            <div className="flex items-center justify-between">
              <button onClick={(e) => checkAll(e)} className="text-zinc-200">
                {AllCheckeds ? "desmarcar tudo" : "selecionar tudo"}
              </button>
            </div>
          </div>
          {/*  */}
          <div className="flex flex-col gap-2 text-[14px]">
            <div className="flex flex-col gap-3">
              {/* PORTUGUÊS DO 6 ANO  */}

              <div className="flex flex-col gap-2 rounded-lg p-2 border-2 border-zinc-800">
                <div className="flex justify-between items-center font-medium text-zinc-200">
                  <p className=" text-[1rem] md:text-[0.9rem] pl-2">6° Ano</p>
                  <p className="text-[0.9rem] pr-1.5">Português</p>
                </div>

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
                            transition={{ delay: 0, duration: 0.2 }}
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
                <div className="flex justify-between items-center font-medium text-zinc-200">
                  <p className=" text-[1rem] md:text-[0.9rem] pl-2">1° Ano</p>
                  <p className="text-[0.9rem] pr-1.5">Português</p>
                </div>
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
                            transition={{ delay: 0 }}
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
              {/* MATEMÁTICA DO 6 ANO */}
              <div className="flex flex-col gap-2 rounded-lg p-2 border-2 border-zinc-800">
                <div className="flex justify-between items-center font-medium text-zinc-200">
                  <p className=" text-[1rem] md:text-[0.9rem] pl-2">6° Ano</p>
                  <p className="text-[0.9rem] pr-1.5">Matemática</p>
                </div>
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
                            transition={{ delay: 0 }}
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
                <div className="flex justify-between items-center font-medium text-zinc-200">
                  <p className=" text-[1rem] md:text-[0.9rem] pl-2">1° Ano</p>
                  <p className="text-[0.9rem] pr-1.5">Matemática</p>
                </div>
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
                            transition={{ delay: 0 }}
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
            className="bg-roxominerva rounded-lg text-[16px] p-2 my-2 md:p-[7px] text-zinc-100;"
            onClick={(e) => {
              e.preventDefault();
              onClickInput();
            }}
          >
            Salvar
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SubjectForm;
