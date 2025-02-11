"use client";

import CheckComp from "@/components/add_student/CheckComp";
import Accordion from "@/components/layout/Accordion";
import { useUserContext } from "@/contexts/userData";
import { MateriaType } from "@/models/MateriasModel";
import { PlanningObj } from "@/models/userModel";
import { capitalize } from "@/utils/stringManipulation";
import { Dispatch, SetStateAction, useState } from "react";

type PlanningSubjectsProps = {
  idAluno: string;
  setError: Dispatch<SetStateAction<string>>;
  planning?: PlanningObj;
};

const AddPlanningSubjects = ({
  idAluno,
  setError,
  planning,
}: PlanningSubjectsProps) => {
  const [allCheckeds, setAllCheckeds] = useState(false);
  const { getAluno } = useUserContext();
  const aluno = getAluno(idAluno);

  const getSubjects = () => {
    const subjectsUncheckeds = aluno.materias?.filter(
      (materia) => materia.isChecked === false
    );
    return subjectsUncheckeds;
  };

  const checkAll = () => {
    const mat = document.getElementsByName("subject");
    mat.forEach((des: any) =>
      allCheckeds ? (des.checked = false) : (des.checked = true)
    );
    setAllCheckeds(!allCheckeds);
  };

  const getAllSelectedsSubjects = () => {
    let allSubjects: Array<MateriaType> = [];
    const getAllSubjects = planning?.daysAndSubjects.map((daysAndSubj, i) => {
      daysAndSubj.subjects.map((subj) => allSubjects.push(subj));
    });
    return allSubjects;
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
            {getSubjects()?.filter(
              (materia) =>
                materia.materia === "português" && materia.ordem <= 10
            ).length ? (
              <Accordion textLeft="Português" textRight="6° Ano">
                {getSubjects()
                  ?.filter(
                    (materia) =>
                      materia.materia === "português" && materia.ordem <= 10
                  )
                  .map((materia, i) => (
                    <CheckComp
                      text={capitalize(materia.nome)}
                      key={i}
                      name="subject"
                      value={JSON.stringify(materia)}
                      id={materia._id!}
                      setError={setError}
                      defaultChecked={
                        planning
                          ? getAllSelectedsSubjects()
                              .map((subj) => subj._id)
                              .includes(materia._id)
                          : false
                      }
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
            {getSubjects()?.filter(
              (materia) => materia.materia === "português" && materia.ordem > 10
            ).length ? (
              <Accordion textLeft="Português" textRight="1° Ano">
                {getSubjects()
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
                      defaultChecked={
                        planning
                          ? getAllSelectedsSubjects()
                              .map((subj) => subj._id)
                              .includes(materia._id)
                          : false
                      }
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
            {getSubjects()?.filter(
              (materia) =>
                materia.materia === "matemática" && materia.ordem <= 15
            ).length ? (
              <Accordion textLeft="Matemática" textRight="6° Ano">
                {getSubjects()
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
                      defaultChecked={
                        planning
                          ? getAllSelectedsSubjects()
                              .map((subj) => subj._id)
                              .includes(materia._id)
                          : false
                      }
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
            {getSubjects()?.filter(
              (materia) =>
                materia.materia === "matemática" && materia.ordem > 15
            ).length ? (
              <Accordion textLeft="Matemática" textRight="1° Ano">
                {getSubjects()
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
                      defaultChecked={
                        planning
                          ? getAllSelectedsSubjects()
                              .map((subj) => subj._id)
                              .includes(materia._id)
                          : false
                      }
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
