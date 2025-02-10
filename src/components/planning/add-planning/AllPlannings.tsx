"use client";

import Button from "@/components/layout/Button";
import Container from "@/components/layout/Container";
import { useUserContext } from "@/contexts/userData";
import { allMonths, withZeroOrNot } from "@/utils/months";
import { ArrowRight } from "flowbite-react-icons/outline";
import React, { useState } from "react";
import PlanningPDF from "./PlanningPDF";
import { PlanningObj } from "@/models/userModel";

const AllPlannings = ({ idAluno }: { idAluno: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [planning, setPlanning] = useState<PlanningObj>();
  const { user, getAluno } = useUserContext();
  const aluno = getAluno(idAluno);

  return (
    <Container>
      <div className="flex flex-col gap-3">
        <div className="text-[16px] md:text-[18px] bg-background03 p-2.5 px-4 rounded-md text-center text-textColor tracking-wide">
          {aluno.nome}
        </div>
        {aluno.planning?.map((planning, i) => (
          <div
            key={i}
            className="flex flex-col gap-2 py-2.5 px-3 bg-background03 rounded-md text-textColor"
          >
            <div className="flex items-center justify-between px-1">
              <div className="flex gap-[2.5px]">
                <div>
                  {allMonths[planning.daysAndSubjects[0].month - 1].name}
                </div>
                <div>/</div>
                <div>{`${planning.year}`}</div>
              </div>
              <div className="flex gap-1.5 items-center">
                <div>
                  {withZeroOrNot(planning.daysAndSubjects[0].date)}/
                  {withZeroOrNot(planning.daysAndSubjects[0].month)}
                </div>
                -
                <div className="flex gap-1">
                  {withZeroOrNot(
                    planning.daysAndSubjects[
                      planning.daysAndSubjects.length - 1
                    ].date
                  )}
                  /{withZeroOrNot(planning.daysAndSubjects[0].month)}
                </div>
              </div>
            </div>
            <div className="flex justify-between w-full gap-2 md:gap-2 p-2 bg-background01 rounded-md">
              <Button
                whileHover={{ scale: 1 }}
                whileTap={{ scale: 0.97, transition: { duration: 0.01 } }}
                className="!text-[12px] md:!text-[14px] w-full !px-4 !bg-background02 dark:!bg-background03 brightness-110 hover:brightness-[1.06] dark:hover:brightness-[1.02] text-textColor"
                onClick={() => {
                  setPlanning(planning);
                  setIsOpen(true);
                }}
              >
                Abrir
              </Button>
              <Button
                whileHover={{ scale: 1 }}
                whileTap={{ scale: 0.97, transition: { duration: 0.01 } }}
                className="!text-[12px] md:!text-[14px] w-full !px-4 !bg-background02 dark:!bg-background03 brightness-110 hover:brightness-[1.06] dark:hover:brightness-[1.02] text-textColor"
              >
                Editar
              </Button>
              <Button
                whileHover={{ scale: 1 }}
                whileTap={{ scale: 0.97, transition: { duration: 0.01 } }}
                className="!text-[12px] md:!text-[14px] w-full !px-4 !bg-background02 dark:!bg-background03 brightness-110 hover:brightness-[1.06] dark:hover:brightness-[1.02] text-textColor"
              >
                Excluir
              </Button>
            </div>
          </div>
        ))}

        {isOpen && (
          <PlanningPDF
            daysAndSubjects={planning?.daysAndSubjects!}
            idAluno={idAluno}
            setError={setError}
            setIsOpen={setIsOpen}
            subjectPerDay={planning?.subjectPerDay!}
          />
        )}
      </div>
    </Container>
  );
};

export default AllPlannings;
