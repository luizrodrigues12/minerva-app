"use client";

import { MouseEvent, useEffect, useState } from "react";
import CheckComp from "./CheckComp";
import { v4 as uuidv4 } from "uuid";
import SubjectForm from "./SubjectForm";
import Loading from "../layout/Loading";
import { motion } from "motion/react";
import { useAddStudent } from "@/hooks/useAddStudent";
import { useRouter } from "nextjs-toploader/app";
import InputComp from "../layout/InputComp";
import { useSectionContext } from "@/contexts/section";
import Button from "../layout/Button";

const StudentForm = () => {
  const router = useRouter();
  const idStudent = uuidv4();
  const [checkedsSubjects, setCheckedsSubjects] = useState(Array<String>);
  const [checkedsPrep, setCheckedsPrep] = useState(Array<string>);
  const [nome, setNome] = useState("");
  const [error, setError] = useState("");
  const { mutate, isPending, isSuccess } = useAddStudent(
    idStudent,
    nome,
    checkedsPrep,
    checkedsSubjects
  );
  const { setSection } = useSectionContext();

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

  const addStudent = async (e: MouseEvent<HTMLDivElement>) => {
    try {
      e.preventDefault();
      getCheckedsSubjects();
      getCheckedsPrep();

      // Verificações
      if (!nome) throw new Error("Escolha um nome válido.");
      if (checkedsPrep.length == 0) throw new Error("Escolha um preparatório.");
      if (checkedsSubjects.length == 0)
        throw new Error("Escolha pelo menos uma matéria.");

      // POSTANDO ALUNO

      mutate({
        idStudent: idStudent,
        nome: primeirasMaiusculas(nome),
        checkedsPrep,
        checkedsSubjects: checkedsSubjects,
      });
    } catch (error: any) {
      setError(error.message);
    }
  };

  const primeirasMaiusculas = (texto: string) => {
    return texto
      .trim()
      .toLowerCase()
      .split(" ")
      .map((palavra) => palavra.split("")[0].toUpperCase() + palavra.slice(1))
      .join(" ");
  };

  useEffect(() => {
    setCheckedsPrep([]);
    setCheckedsSubjects([]);
    setSection("add-student");
  }, []);

  return (
    <motion.div className="p-4 py-2 w-full flex flex-col font-inter text-black md:px-4 md:py-4 lg:p-6">
      {!isPending ? (
        <div className="flex flex-col md:p-4 lg:p-6 lg:pt-4 gap-3 rounded-md text-[16px] md:border-2 md:border-borderColor">
          <div className="flex flex-col gap-3">
            <div className="text-[18px]">Adicionar Aluno</div>
            <InputComp
              placeholder="Nome do aluno"
              className="!mt-0"
              value={nome || ""}
              onChange={(e) => {
                setNome(e.target.value);
              }}
              onFocus={() => setError("")}
            />
          </div>

          <div className="flex flex-col gap-3">
            <div className="text-[18px]">Preparatório</div>
            <CheckComp text="APLICAÇÃO" name="checkItem" />
            <CheckComp text="CPM" name="checkItem" />
            <CheckComp text="CEMAM" name="checkItem" />
          </div>

          <SubjectForm error={error} />

          <Button
            whileHover={{ scale: 1.005 }}
            whileTap={{ scale: 1 }}
            animated={false}
            className="py-2.5"
            onClick={(e) => addStudent(e)}
          >
            Adicionar
          </Button>
        </div>
      ) : (
        <Loading />
      )}
    </motion.div>
  );
};

export default StudentForm;
