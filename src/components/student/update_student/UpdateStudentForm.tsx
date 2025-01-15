"use client";

import { MouseEvent, useEffect, useState } from "react";
import CheckComp from "../../add_student/CheckComp";
import { getCookie } from "cookies-next";
import useSWR from "swr";
import Loading from "../../layout/Loading";
import { motion } from "motion/react";
import InputComp from "@/components/layout/InputComp";
import Container from "@/components/layout/Container";
import Button from "@/components/layout/Button";
import SubjectForm from "@/components/add_student/SubjectForm";
import { useUpdateStudent } from "@/hooks/useUpdateStudent";
import { useSectionContext } from "@/contexts/section";
import { useUserContext } from "@/contexts/userData";
import SubjectFormUpdate from "./SubjectUpdateForm";

const UpdateStudentForm = ({ idAluno }: { idAluno: string }) => {
  const [nome, setNome] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [checkedsSubjects, setCheckedsSubjects] = useState(Array<String>);
  const [checkedsPrep, setCheckedsPrep] = useState(Array<string>);
  const [error, setError] = useState<string>();
  const { setSection } = useSectionContext();
  const { getAluno } = useUserContext();
  const aluno = getAluno(idAluno);
  const { data: alunos, mutate } = useUpdateStudent({
    idAluno,
    nome,
    checkedsPrep,
    checkedsSubjects,
  });

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
      if (subject.checked && !checkedsSubjects.includes(subject.value))
        checkedsSubjects.push(subject.value);
    });
  };

  const updateStudent = async (e: MouseEvent<HTMLDivElement>) => {
    try {
      e.preventDefault();
      getCheckedsSubjects();
      getCheckedsPrep();

      setIsPosting(true);
      mutate({ idAluno, nome, checkedsPrep, checkedsSubjects });
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    setCheckedsPrep([]);
    setCheckedsSubjects([]);
    setSection("update-student");
  }, []);

  return (
    <Container className="text-black">
      {!isPosting ? (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="text-[16px] md:text-[18px]">Nome</div>
            <InputComp
              placeholder={aluno.nome}
              className="!mt-0"
              value={nome || ""}
              onChange={(e) => {
                setNome(e.target.value);
              }}
              onFocus={() => setError("")}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-[16px] md:text-[18px]">Preparatório</div>
            <div className="flex flex-col gap-1.5">
              <CheckComp
                text="APLICAÇÃO"
                value="aplicação"
                name="checkItem"
                defaultChecked={aluno.preparatorio?.includes("aplicação")}
              />
              <CheckComp
                text="CPM"
                value="cpm"
                name="checkItem"
                defaultChecked={aluno.preparatorio?.includes("cpm")}
              />
              <CheckComp
                text="CEMAM"
                value="cemam"
                name="checkItem"
                defaultChecked={aluno.preparatorio?.includes("cemam")}
              />
            </div>
          </div>

          <SubjectFormUpdate error={error} idAluno={idAluno} />

          <Button
            whileHover={{ scale: 1.003 }}
            whileTap={{ scale: 1 }}
            animated={false}
            className="py-2.5"
            onClick={(e) => updateStudent(e)}
          >
            Atualizar
          </Button>
        </div>
      ) : (
        <Loading />
      )}
    </Container>
  );
};

export default UpdateStudentForm;
