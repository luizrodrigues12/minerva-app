"use client";

import CheckComp from "@/components/add_student/CheckComp";
import Accordion from "@/components/layout/Accordion";
import { useUserContext } from "@/contexts/userData";
import { capitalize } from "@/utils/stringManipulation";
import { Dispatch, SetStateAction, useState } from "react";

type PlanningSubjectsProps = {
  idAluno: string;
  setError: Dispatch<SetStateAction<string>>;
};

const AddPlanningSubjects = ({ idAluno, setError }: PlanningSubjectsProps) => {
  const [allCheckeds, setAllCheckeds] = useState(false);
  const { getAluno } = useUserContext();

  const getSubjectsUnchecked = () => {
    return getAluno(idAluno).materias?.filter(
      (materia) => materia.isChecked === false
    );
  };

  const checkAll = () => {
    const mat = document.getElementsByName("subject");
    mat.forEach((des: any) =>
      allCheckeds ? (des.checked = false) : (des.checked = true)
    );
    setAllCheckeds(!allCheckeds);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center relative">
        <div className="text-[16px] md:text-[18px]">Matérias</div>
        {idAluno && (
          <div
            className="text-[12px] md:text-[14px] text-textColor absolute right-1 bottom-[-2] hover:cursor-pointer hover:brightness-110"
            onClick={() => checkAll()}
          >
            {allCheckeds ? "desmarcar tudo" : "selecionar tudo"}
          </div>
        )}
      </div>
      <div>
        {idAluno ? (
          <div className="flex flex-col  gap-1.5">
            {/* PORTUGUÊS SEXTO ANO */}
            {getSubjectsUnchecked()?.filter(
              (materia) =>
                materia.materia === "português" && materia.ordem <= 10
            ).length ? (
              <Accordion textLeft="Português" textRight="6° Ano">
                {getSubjectsUnchecked()
                  ?.filter(
                    (materia) =>
                      materia.materia === "português" && materia.ordem <= 10
                  )
                  .map((materia, i) => (
                    <CheckComp
                      key={i}
                      text={capitalize(materia.nome)}
                      name="subject"
                      value={JSON.stringify(materia)}
                      id={materia._id!}
                      setError={setError}
                    />
                  ))}
              </Accordion>
            ) : (
              <Accordion
                textLeft="Português"
                textRight="6° Ano - Concluído"
                disable
              />
            )}

            {/* PORTUGUÊS PRIMEIRO ANO */}
            {getSubjectsUnchecked()?.filter(
              (materia) => materia.materia === "português" && materia.ordem > 10
            ).length ? (
              <Accordion textLeft="Português" textRight="1° Ano">
                {getSubjectsUnchecked()
                  ?.filter(
                    (materia) =>
                      materia.materia === "português" && materia.ordem > 10
                  )
                  .map((materia, i) => (
                    <CheckComp
                      key={i}
                      text={capitalize(materia.nome)}
                      name="subject"
                      value={JSON.stringify(materia)}
                      id={materia._id!}
                      setError={setError}
                    />
                  ))}
              </Accordion>
            ) : (
              <Accordion
                textLeft="Português"
                textRight="1° Ano - Concluído"
                disable
              />
            )}

            {/* MATEMÁTICA SEXTO ANO */}
            {getSubjectsUnchecked()?.filter(
              (materia) =>
                materia.materia === "matemática" && materia.ordem <= 15
            ).length ? (
              <Accordion textLeft="Matemática" textRight="6° Ano">
                {getSubjectsUnchecked()
                  ?.filter(
                    (materia) =>
                      materia.materia === "matemática" && materia.ordem <= 15
                  )
                  .map((materia, i) => (
                    <CheckComp
                      key={i}
                      text={capitalize(materia.nome)}
                      name="subject"
                      value={JSON.stringify(materia)}
                      id={materia._id!}
                      setError={setError}
                    />
                  ))}
              </Accordion>
            ) : (
              <Accordion
                textLeft="Matemática"
                textRight="6° Ano - Concluído"
                disable
              />
            )}

            {/* MATEMÁTICA PRIMEIRO ANO */}
            {getSubjectsUnchecked()?.filter(
              (materia) =>
                materia.materia === "matemática" && materia.ordem > 15
            ).length ? (
              <Accordion textLeft="Matemática" textRight="1° Ano">
                {getSubjectsUnchecked()
                  ?.filter(
                    (materia) =>
                      materia.materia === "matemática" && materia.ordem > 15
                  )
                  .map((materia, i) => (
                    <CheckComp
                      key={i}
                      text={capitalize(materia.nome)}
                      name="subject"
                      value={JSON.stringify(materia)}
                      id={materia._id!}
                      setError={setError}
                    />
                  ))}
              </Accordion>
            ) : (
              <Accordion
                textLeft="Matemática"
                textRight="1° Ano - Concluído"
                disable
              />
            )}
          </div>
        ) : (
          <Accordion textLeft="Nenhum aluno selecionado" disable={true} />
        )}
      </div>
    </div>
  );
};

export default AddPlanningSubjects;
