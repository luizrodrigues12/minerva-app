"use client";

import React, { useState } from "react";
import MateriaComp from "./MateriaComp";
import Accordion from "../layout/Accordion";
import { useUserContext } from "@/contexts/userData";
import { useChecksMutate } from "@/hooks/useChecksMutate";
import { MateriaType } from "@/models/MateriasModel";
import { capitalize } from "@/utils/stringManipulation";

type AllSubjectsProps = {
  idAluno: string;
  busca: string;
};

const AllSubjects = ({ idAluno, busca }: AllSubjectsProps) => {
  const { user, getAluno } = useUserContext();
  const [objMateria, setObjMateria] = useState<any>();
  const { mutate } = useChecksMutate(objMateria, idAluno, user.token);

  const toggleIsChecked = async (objMateria: any, e: any) => {
    e.preventDefault();
    setObjMateria(objMateria);
    mutate({ idAluno, objMateria, token: user.token! });
  };

  const materiaFilteredAndSorted = () => {
    return getAluno(idAluno)
      ?.materias?.sort((a: any, b: any) =>
        a.ordem < b.ordem ? -1 : a.ordem > b.ordem ? 1 : 0
      )
      .filter((materia: any) =>
        materia.nome.toLowerCase().includes(busca.toLowerCase())
      );
  };

  return (
    <div className="flex flex-col gap-1.5">
      {materiaFilteredAndSorted()?.filter(
        (materia) => materia.ordem <= 10 && materia.materia === "português"
      ).length === 0 ? (
        ""
      ) : (
        <Accordion textLeft="Português" textRight="6° Ano">
          {materiaFilteredAndSorted()?.map(
            (materia: MateriaType, i: number) => {
              if (materia.ordem <= 10 && materia.materia === "português")
                return (
                  <MateriaComp
                    key={i}
                    text={capitalize(materia.nome)}
                    id={materia._id!}
                    isChecked={materia.isChecked}
                    isParentPage={false}
                    onClick={(e: any) => toggleIsChecked(materia, e)}
                  />
                );
            }
          )}
        </Accordion>
      )}

      {materiaFilteredAndSorted()?.filter(
        (materia) => materia.ordem > 10 && materia.materia === "português"
      ).length === 0 ? (
        ""
      ) : (
        <Accordion textLeft="Português" textRight="1° Ano">
          {materiaFilteredAndSorted()?.map(
            (materia: MateriaType, i: number) => {
              if (materia.ordem > 10 && materia.materia === "português")
                return (
                  <MateriaComp
                    key={i}
                    text={capitalize(materia.nome)}
                    id={materia._id!}
                    isChecked={materia.isChecked}
                    isParentPage={false}
                    onClick={(e: any) => toggleIsChecked(materia, e)}
                  />
                );
            }
          )}
        </Accordion>
      )}

      {materiaFilteredAndSorted()?.filter(
        (materia) => materia.ordem <= 15 && materia.materia === "matemática"
      ).length === 0 ? (
        ""
      ) : (
        <Accordion textLeft="matemática" textRight="6° Ano">
          {materiaFilteredAndSorted()?.map(
            (materia: MateriaType, i: number) => {
              if (materia.ordem <= 15 && materia.materia === "matemática")
                return (
                  <MateriaComp
                    key={i}
                    text={capitalize(materia.nome)}
                    id={materia._id!}
                    isChecked={materia.isChecked}
                    isParentPage={false}
                    onClick={(e: any) => toggleIsChecked(materia, e)}
                  />
                );
            }
          )}
        </Accordion>
      )}

      {/* MAT 1 ANO */}
      {materiaFilteredAndSorted()?.filter(
        (materia) => materia.ordem > 15 && materia.materia === "matemática"
      ).length === 0 ? (
        ""
      ) : (
        <Accordion textLeft="matemática" textRight="1° Ano">
          {materiaFilteredAndSorted()?.map(
            (materia: MateriaType, i: number) => {
              if (materia.ordem > 15 && materia.materia === "matemática")
                return (
                  <MateriaComp
                    key={i}
                    text={capitalize(materia.nome)}
                    id={materia._id!}
                    isChecked={materia.isChecked}
                    isParentPage={false}
                    onClick={(e: any) => toggleIsChecked(materia, e)}
                  />
                );
            }
          )}
        </Accordion>
      )}
    </div>
  );
};

export default AllSubjects;
