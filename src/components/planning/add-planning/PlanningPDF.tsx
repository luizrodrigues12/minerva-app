"use client";

import { capitalize } from "@/utils/stringManipulation";
import { daysAndSubjectsType } from "./AddPlanningForm";
import { allMonths } from "@/utils/months";
import { useUserContext } from "@/contexts/userData";
import Button from "@/components/layout/Button";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface PlanningPDFProps {
  daysAndSubjects: Array<daysAndSubjectsType>;
  subjectPerDay: number;
  idAluno: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  monthNumber: number;
}

const PlanningPDF = ({
  daysAndSubjects,
  idAluno,
  setIsOpen,
  subjectPerDay,
  monthNumber,
}: PlanningPDFProps) => {
  const [width, setWidth] = useState(0);
  const { getAluno } = useUserContext();
  const aluno = getAluno(idAluno);

  const getDaysCheckeds = () => {
    const daysOne: Array<string> = [];
    daysAndSubjects.map((daysAndSubj) => {
      if (!daysOne.includes(daysAndSubj.day)) daysOne.push(daysAndSubj.day);
    });
    return daysOne;
  };

  const numberOfSubjects = daysAndSubjects.length;

  useEffect(() => {
    if (window !== undefined) {
      setWidth(innerWidth);
    }
  }, [setWidth]);

  return (
    <div className="flex flex-col gap-3 modal w-[95%] max-h-[80%] bg-[#e9e6e2] p-2 overflow-y-scroll overflow-hidden  rounded-md md:p-4 md:w-[480px] lg:w-[700px] xl:w-[700px] scroll-style">
      <div className=" flex flex-col gap-2 text-[11px] md:text-[14px] text-black relative">
        <div className="flex w-full justify-between font-inter text-[13px] md:text-[16px] pt-2">
          <div className="text-[30px] font-handlee leading-[22px] pb-1">
            Planejamento - {allMonths[monthNumber].name}
          </div>
          <div className="flex items-end">{aluno.nome}</div>
        </div>
        <div
          className={`grid gap-2`}
          style={{
            gridTemplateColumns:
              width >= 1024
                ? `repeat(${numberOfSubjects > 2 ? 3 : 2}, 1fr)`
                : "repeat(2, 1fr)",
          }}
        >
          {daysAndSubjects.map((daysAndSub, i) => (
            <div key={i} className="p-2 border-[2px] border-[#151515] ">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between ">
                  <div className="font-parkinsans-normal">{daysAndSub.day}</div>
                  <div className="flex">
                    <p>
                      {daysAndSub.date > 9
                        ? daysAndSub.date
                        : `0${daysAndSub.date}`}
                    </p>
                    /
                    <p>
                      {daysAndSub.month > 9
                        ? daysAndSub.month
                        : `0${daysAndSub.month}`}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-0.5 justify-center">
                  {daysAndSub.subjects.map((subject, i) => (
                    <div key={i}>
                      {subjectPerDay > 1
                        ? `${i + 1}. ${capitalize(subject.nome)}${
                            i === daysAndSub.subjects.length - 1 ? "." : ";"
                          }`
                        : `${capitalize(subject.nome)}.`}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2 justify-between">
        <Button className="w-full !bg-black">Download</Button>
        <Button className="w-full !bg-black" onClick={() => setIsOpen(false)}>
          Fechar
        </Button>
      </div>
    </div>
  );
};

export default PlanningPDF;
