"use client";

import { MouseEvent, useEffect, useState } from "react";
import CheckComp from "./CheckComp";
import { v4 as uuidv4 } from "uuid";
import SubjectForm from "./SubjectForm";
import Loading from "../layout/Loading";
import { motion } from "motion/react";
import { useAddStudent } from "@/hooks/useAddStudent";
import InputComp from "../layout/InputComp";
import { useSectionContext } from "@/contexts/section";
import Button from "../layout/Button";
import Container from "../layout/Container";

const StudentForm = () => {
  const idStudent = uuidv4();
  const [checkedsSubjects, setCheckedsSubjects] = useState<any>();
  const [checkedsPrep, setCheckedsPrep] = useState(Array<string>);
  const [nome, setNome] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState("");
  const { mutateAsync } = useAddStudent({
    idStudent,
    nome,
    checkedsPrep,
    checkedsSubjects,
  });
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
      if (subject.checked && !checkedsSubjects?.includes(subject.value))
        checkedsSubjects?.push(subject.value);
    });
  };

  const addStudent = async (e: MouseEvent<HTMLDivElement>) => {
    try {
      e.preventDefault();
      getCheckedsSubjects();
      getCheckedsPrep();

      // Verificações
      if (!nome) throw new Error("Escolha um nome válido.");
      if (checkedsPrep.length == 0)
        throw new Error("Escolha pelo menos um preparatório.");
      if (checkedsSubjects?.length == 0)
        throw new Error("Escolha pelo menos uma matéria.");

      // POSTANDO ALUNO
      setIsPosting(true);
      await mutateAsync(
        {
          idStudent: idStudent,
          nome: nome,
          checkedsPrep,
          checkedsSubjects: checkedsSubjects,
        },
        {
          onError(error) {
            throw new Error(error.message);
          },
        }
      );
    } catch (error: any) {
      setIsPosting(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    setCheckedsPrep([]);
    setCheckedsSubjects([]);
    setSection("add-student");
  }, []);

  return (
    <Container>
      <motion.div className="w-full flex flex-col font-inter text-textColor">
        {!isPosting ? (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="text-[16px] lg:text-[18px]">Nome</div>
              <InputComp
                placeholder="Nome do aluno"
                value={nome || ""}
                onChange={(e) => {
                  setNome(e.target.value);
                }}
                onFocus={() => setError("")}
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-[16px] lg:text-[18px]">Preparatório</div>
              <div className="flex flex-col gap-1.5">
                <CheckComp
                  text="APLICAÇÃO"
                  value="aplicação"
                  id="aplicação"
                  name="checkItem"
                  onClick={() => setError("")}
                  setError={setError}
                />
                <CheckComp
                  text="CPM"
                  value="cpm"
                  id="cpm"
                  name="checkItem"
                  onClick={() => setError("")}
                  setError={setError}
                />
                <CheckComp
                  text="CEMAM"
                  value="cemam"
                  id="cemam"
                  name="checkItem"
                  onClick={() => setError("")}
                  setError={setError}
                />
              </div>
            </div>

            <SubjectForm error={error} setError={setError} />

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
    </Container>
  );
};

export default StudentForm;
