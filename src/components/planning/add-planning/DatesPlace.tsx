import InputComp from "@/components/layout/InputComp";
import React, { Dispatch } from "react";

interface DatesPlaceProps {
  setError: Dispatch<React.SetStateAction<string>>;
  monthDays: number;
  initialDate: number;
  setInitialDate: Dispatch<React.SetStateAction<number>>;
  subjectPerDay: number;
  setSubjectPerDay: Dispatch<React.SetStateAction<number>>;
  finalDate: number;
  setFinalDate: Dispatch<React.SetStateAction<number>>;
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
}: DatesPlaceProps) => {
  return (
    <div className="flex gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-[16px] md:text-[18px] text-center">
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
        <div className="text-[16px] md:text-[18px] text-center">Data Final</div>
        <InputComp
          className=" text-center !px-0"
          placeholder={`Entre 1 e ${monthDays}`}
          value={finalDate || ""}
          onChange={(e) => setFinalDate(Number(e.target.value))}
          onFocus={() => setError("")}
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-[16px] md:text-[18px] text-center">
          Matérias por Dia
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
