"use client";

import { capitalize } from "@/utils/stringManipulation";
import { daysAndSubjectsType } from "./AddPlanningForm";
import { allMonths } from "@/utils/months";
import { useUserContext } from "@/contexts/userData";
import Button from "@/components/layout/Button";
import { useReactToPrint } from "react-to-print";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { AlunoObj } from "@/models/userModel";

interface PlanningPDFProps {
  daysAndSubjects: Array<daysAndSubjectsType>;
  subjectPerDay: number;
  idAluno: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  monthNumber: number;
}

interface gridDaysAndSubjectsProps {
  width: number;
  numberOfSubjects: number;
  daysAndSubjects: Array<daysAndSubjectsType>;
  subjectPerDay: number;
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
  const numberOfSubjects = daysAndSubjects.length;
  const printRef = useRef(null);
  const nomeAlunoPDF = aluno.nome
    ?.toLowerCase()
    .split(" ")
    .join("-")
    .replace("á", "a")
    .replace("é", "e");

  const downloadPdf = useReactToPrint({
    contentRef: printRef,
    documentTitle: `planning-${nomeAlunoPDF}`,
  });

  useEffect(() => {
    if (window !== undefined) {
      setWidth(innerWidth);
    }
  }, [setWidth]);

  return (
    <div className="flex flex-col gap-3 modal w-[95%] max-h-[80%] bg-white overflow-y-scroll overflow-hidden  rounded-md md:w-[480px] lg:w-[700px] xl:w-[700px] scroll-style">
      <div
        ref={printRef}
        className="flex flex-col justify-between text-[11px] md:text-[14px] pb-0 text-black"
      >
        <div className="flex justify-between items-center font-parkinsans-normal text-[26px] md:text-[32px] leading-[24px] md:leading-[28px] bg-[#4f47a8] text-[#ececec] p-2 px-3 md:p-4 md:px-3 m-2 md:m-4 mb-0 md:mb-0 rounded-md print:mx-[16px] print:mt-[16px]">
          <p>{allMonths[monthNumber].name}</p>
          <p>{new Date().getFullYear()}</p>
        </div>

        {gridsDaysAndSubjects({
          width,
          daysAndSubjects,
          numberOfSubjects,
          subjectPerDay,
        })}

        {buttonsFooterPdf({ aluno })}
      </div>

      <div className="flex gap-2 p-2 pt-0 md:p-4 md:pt-0 justify-between text-[14px] md:text-[16px]">
        <Button
          className="w-full !bg-black"
          onClick={() => {
            downloadPdf();
          }}
        >
          Download
        </Button>
        <Button className="w-full !bg-black" onClick={() => setIsOpen(false)}>
          Fechar
        </Button>
      </div>
    </div>
  );
};

const gridsDaysAndSubjects = ({
  width,
  numberOfSubjects,
  daysAndSubjects,
  subjectPerDay,
}: gridDaysAndSubjectsProps) => {
  return (
    <div
      className="grid gap-x-2 columns-print m-2 md:m-4 my-0 md:my-0 print:mx-[16px]"
      style={{
        gridTemplateColumns:
          width >= 1024
            ? `repeat(${numberOfSubjects > 2 ? 3 : 2}, 1fr)`
            : "repeat(2, 1fr)",
      }}
    >
      {daysAndSubjects.map((daysAndSub, i) => (
        <div key={i} className="border-[2px] border-[#151515] mt-2 rounded-md">
          <div className="flex flex-col gap-1">
            <div className="flex justify-between p-2 pb-0 pt-1">
              <div className="">{daysAndSub.day}</div>
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

            <div className="flex flex-col gap-[1px] justify-center p-2 pt-0 border-t-[1.5px] border-black">
              {daysAndSub.subjects.map((subject, i) => (
                <div key={i} className={`${i === 0 ? "mt-1" : "mt-0"}`}>
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
  );
};

const buttonsFooterPdf = ({ aluno }: { aluno: AlunoObj }) => {
  return (
    <div className="font-interMedium hidden w-full mt-2 justify-self-end border-[#202020] items-center gap-2 show-on-print text-[14px] md:text-[16px] print:text-[14px] bg-[#5950bb] print:mx-0 print:mb-[16px]">
      <div className="flex gap-2 justify-evenly w-full text-[#ffffff] p-2.5 border-y-2 border-[#202020]">
        <a
          href={`https://minerva-gamma.vercel.app/parents/get_subjects/${aluno.idAluno}`}
          className="p-2 px-3 rounded-md border-2 bg-[#695edd] border-black shadow-md text-center"
        >
          Situação do Aluno
        </a>

        <a
          href={`https://minerva-gamma.vercel.app/`}
          className="p-2 px-3 rounded-md border-2 bg-[#695edd] border-black shadow-md text-center"
        >
          Gerar Planejamento
        </a>
      </div>
    </div>
  );
};

export default PlanningPDF;
