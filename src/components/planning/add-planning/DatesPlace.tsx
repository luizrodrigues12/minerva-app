import InputComp from "@/components/layout/InputComp";
import { PlanningObj } from "@/models/userModel";
import React, { Dispatch, useEffect } from "react";

interface DatesPlaceProps {
  setError: Dispatch<React.SetStateAction<string>>;
  monthDays: number;
  initialDate: number;
  setInitialDate: Dispatch<React.SetStateAction<number>>;
  subjectPerDay: number;
  setSubjectPerDay: Dispatch<React.SetStateAction<number>>;
  finalDate: number;
  setFinalDate: Dispatch<React.SetStateAction<number>>;
  planning?: PlanningObj;
}

const DatesPlace = ({
  setError,
  monthDays,
  initialDate,
  setInitialDate,
  subjectPerDay,
  setSubjectPerDay,
  finalDate,
  setFinalDate,
  planning,
}: DatesPlaceProps) => {
  const settedFinalDate =
    planning?.daysAndSubjects[planning.daysAndSubjects.length - 1].date!;
  const settedInitialDate = planning?.daysAndSubjects[0].date!;

  useEffect(() => {
    if (planning) {
      setInitialDate(settedInitialDate);
      setFinalDate(settedFinalDate);
      setSubjectPerDay(planning.subjectPerDay);
    }
  }, []);

  return (
    <div className="flex justify-between gap-2 md:gap-8 lg:gap-2 2xl:gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-[14px] md:text-[16px] text-center">
          Data Inicial
        </div>
        <InputComp
          className=" text-center !px-0"
          placeholder={`Entre 1 e ${monthDays}`}
          value={initialDate || ""}
          onChange={(e) => setInitialDate(Number(e.target.value))}
          onFocus={() => setError("")}
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-[14px] md:text-[16px] text-center">Data Final</div>
        <InputComp
          className=" text-center !px-0"
          placeholder={`Entre 1 e ${monthDays}`}
          value={finalDate || ""}
          onChange={(e) => setFinalDate(Number(e.target.value))}
          onFocus={() => setError("")}
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-[14px] md:text-[16px] text-center">
          Matérias por dia
        </div>
        <InputComp
          className="text-center !px-0"
          placeholder={`Quantas?`}
          value={subjectPerDay || ""}
          onChange={(e) => setSubjectPerDay(Number(e.target.value))}
          onFocus={() => setError("")}
        />
      </div>
    </div>
  );
};

export default DatesPlace;
