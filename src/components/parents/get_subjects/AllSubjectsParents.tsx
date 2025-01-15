"use client";

import { MateriaType } from "@/models/MateriasModel";
import Accordion from "@/components/layout/Accordion";
import MateriaComp from "@/components/student/MateriaComp";
import { AlunoObj } from "@/models/userModel";

type AllSubjectsProps = {
  idAluno: string;
  busca: string;
  aluno: AlunoObj;
};

const AllSubjectsParents = ({ idAluno, busca, aluno }: AllSubjectsProps) => {
  const materiaFilteredAndSorted = () => {
    return aluno?.materias
      ?.sort((a: any, b: any) =>
        a.ordem < b.ordem ? -1 : a.ordem > b.ordem ? 1 : 0
      )
      .filter((materia: any) =>
        materia.nome.toLowerCase().includes(busca.toLowerCase())
      );
  };

  return (
    <div>
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
                      text={materia.nome.toUpperCase()}
                      id={materia._id!}
                      isChecked={materia.isChecked}
                      isParentPage={true}
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
                      text={materia.nome.toUpperCase()}
                      id={materia._id!}
                      isChecked={materia.isChecked}
                      isParentPage={true}
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
                      text={materia.nome.toUpperCase()}
                      id={materia._id!}
                      isChecked={materia.isChecked}
                      isParentPage={true}
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
                      text={materia.nome.toUpperCase()}
                      id={materia._id!}
                      isChecked={materia.isChecked}
                      isParentPage={true}
                    />
                  );
              }
            )}
          </Accordion>
        )}
      </div>
    </div>
  );
};

export default AllSubjectsParents;
