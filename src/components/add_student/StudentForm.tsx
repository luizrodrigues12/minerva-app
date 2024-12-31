"use client";

import { useEffect, useState } from "react";
import CheckComp from "./CheckComp";
import { v4 as uuidv4 } from "uuid";
import SubjectForm from "./SubjectForm";
import { useGetSubjects } from "@/hooks/useGetSubjects";
import Loading from "../layout/Loading";
import { motion } from "motion/react";
import { useAddStudent } from "@/hooks/useAddStudent";
import { useRouter } from "nextjs-toploader/app";

const StudentForm = () => {
  const router = useRouter();
  const idStudent = uuidv4();
  const [checkedsSubjects, setCheckedsSubjects] = useState(Array<String>);
  const [checkedsPrep, setCheckedsPrep] = useState(Array<string>);
  const [nomeAluno, setNomeAluno] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState();
  const { data: subjects, isFetching } = useGetSubjects();
  const { mutate } = useAddStudent(
    idStudent,
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

  const onClickInput = async (e: any) => {
    try {
      e.preventDefault();
      getCheckedsSubjects();
      getCheckedsPrep();

      // Verificações
      if (!nomeAluno) throw new Error("Escolha um nome válido.");
      if (checkedsPrep.length == 0) throw new Error("Escolha um preparatório.");
      if (checkedsSubjects.length == 0)
        throw new Error("Escolha pelo menos uma matéria.");

      // POSTANDO ALUNO
      mutate({
        idStudent: idStudent,
        nomeAluno,
        checkedsPrep,
        checkedsSubjects: checkedsSubjects,
      });

      router.push("/home");
      setIsPosting(true);
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    setCheckedsPrep([]);
    setCheckedsSubjects([]);
  }, []);

  return (
    <div className="w-full height_pattern flex flex-col justify-center">
      {isFetching || isPosting ? (
        <Loading />
      ) : (
        <motion.div
          animate={{ opacity: [0, 1] }}
          transition={{ duration: 0.2 }}
          className="px-8 md:self-center rounded-lg md:px-6 md:py-5 md:w-[400px] md:border-zinc-800 md:border-2"
        >
          <form
            method="POST"
            className="flex flex-col justify-center md:self-center text-[14px]"
          >
            <h2 className="h1_form mb-2">Adicionar Aluno</h2>
            <div className="container_check flex flex-col gap-1.5">
              <input
                type="text"
                name="nome"
                id="nome_aluno"
                placeholder="Nome do aluno"
                className="input_email_username !border-zinc-800 placeholder:text-zinc-400 "
                autoComplete="off"
                onChange={(e) => {
                  e.preventDefault();
                  setNomeAluno(e.target.value);
                }}
              />

              <h2 className="text-xl tracking-wide py-2 px-1 text-zinc-200">
                Preparatório
              </h2>
              <CheckComp
                animateComp={{ opacity: [0, 1] }}
                transition={{ duration: 0.1 }}
                text="Aplicação"
                name="checkItem"
                id="aplicacao"
                htmlFor="aplicacao"
                value="aplicação"
              />
              <CheckComp
                animateComp={{ opacity: [0, 1] }}
                transition={{ duration: 0 }}
                text="CPM"
                name="checkItem"
                id="cpm"
                htmlFor="cpm"
                value="cpm"
              />
              <CheckComp
                animateComp={{ opacity: [0, 1] }}
                transition={{ duration: 0 }}
                text="CEMAM"
                name="checkItem"
                id="cemam"
                htmlFor="cemam"
                value="cemam"
              />
            </div>

            <SubjectForm
              idAluno={idStudent}
              nomeAluno={nomeAluno}
              subjects={subjects!}
              error={error}
            />

            <div className="py-0 w-full">
              <motion.button
                whileTap={{ scale: 1 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.02 } }}
                className="bg-backButton rounded-lg tracking-wide text-[16px] p-2 text-textButton w-full hover:bg-backButtonHover hover:text-textButtonHover py-2.5"
                onClick={(e) => {
                  e.preventDefault();
                  onClickInput(e);
                }}
              >
                ADICIONAR
              </motion.button>
            </div>
          </form>
        </motion.div>
      )}
    </div>
  );
};

export default StudentForm;
