"use client";

import { useState } from "react";
import CheckComp from "./CheckComp";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "nextjs-toploader/app";
import SubjectForm from "./subjects/SubjectForm";
import { useGetSubjects } from "@/hooks/useGetSubjects";
import Loading from "../layout/Loading";
import { motion } from "motion/react";

const StudentForm = () => {
  const idStudent = uuidv4();
  const [nomeAluno, setNomeAluno] = useState("");
  const { data: subjects, isFetching } = useGetSubjects();

  return (
    <div className="w-full height_pattern flex flex-col justify-center">
      {isFetching ? (
        <Loading />
      ) : (
        <motion.div
          animate={{ opacity: [0, 1] }}
          transition={{ duration: 0.2 }}
          className="px-8 md:self-center rounded-lg md:px-6 md:py-5 md:w-[400px] md:border-zinc-800 md:border-2"
        >
          <form method="POST" className="form_student text-[14px]">
            <h2 className="h1_form">Adicionar Aluno</h2>
            <div className="container_check flex flex-col gap-2">
              <input
                type="text"
                name="nome"
                id="nome_aluno"
                placeholder="Nome do aluno"
                className="input_email_username"
                autoComplete="off"
                onChange={(e) => {
                  e.preventDefault();
                  setNomeAluno(e.target.value);
                }}
              />

              <h2 className="text-xl font-medium tracking-wide py-1 px-1 text-zinc-200">
                Preparatório
              </h2>
              <CheckComp
                animateComp={{ opacity: [0, 1] }}
                transition={{ duration: 0 }}
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
            />
          </form>
        </motion.div>
      )}
    </div>
  );
};

export default StudentForm;
