import { capitalize } from "@/utils/stringManipulation";
import React, { Dispatch, RefObject, SetStateAction } from "react";
import { daysAndSubjectsType } from "./AddPlanningForm";
import { allMonths } from "@/utils/months";

interface DocumentPDFProps {
  daysAndSubjects: Array<daysAndSubjectsType>;
  subjectPerDay: number;
  idAluno: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  monthNumber: number;
  ref: RefObject<null>;
}

const DocumentPDF = ({
  idAluno,
  daysAndSubjects,
  monthNumber,
  setIsOpen,
  subjectPerDay,
  ref,
}: DocumentPDFProps) => {
  return (
    <div
      ref={ref}
      className=" flex flex-col gap-2 text-[11px] md:text-[14px] p-2 text-black relative"
    >
      <div className="flex w-full justify-between items-center p-2 px-3 md:p-4 md:px-3 rounded-md font-parkinsans-normal text-[26px] md:text-[32px] leading-[24px] md:leading-[28px] bg-[#4f47a8] text-[#ececec]">
        <div className="">{allMonths[monthNumber].name}</div>
        <div className="">{new Date().getFullYear()}</div>
      </div>
      <div
        className={`grid gap-2`}
        style={{
          gridTemplateColumns: "repeat(3, 1fr)",
        }}
      >
        {daysAndSubjects.map((daysAndSub, i) => (
          <div key={i} className="border-[2px] border-[#151515] rounded-md ">
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

              <hr className="border-0 h-[2px] bg-[#202020]" />

              <div className="flex flex-col gap-0.5 justify-center p-2 pt-0">
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
  );
};

export default DocumentPDF;
