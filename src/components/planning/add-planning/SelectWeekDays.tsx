"use client";

import { Dispatch, SetStateAction, useState } from "react";

type SelectWeeksProps = {
  setError: Dispatch<SetStateAction<string>>;
};

const SelectWeekDays = ({ setError }: SelectWeeksProps) => {
  const [allDaysCheckeds, setAllDaysCheckeds] = useState(false);

  const checkAllDays = () => {
    const days = document.querySelectorAll("#week-day");
    days.forEach((day: any) =>
      allDaysCheckeds ? (day.checked = false) : (day.checked = true)
    );
    setAllDaysCheckeds(!allDaysCheckeds);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex relative">
        <div className="text-[16px] md:text-[18px]">Dias de Aula</div>
        <div
          className="text-[12px] md:text-[14px] text-textColor absolute right-1 bottom-[-2] hover:cursor-pointer hover:brightness-110"
          onClick={() => checkAllDays()}
        >
          {allDaysCheckeds ? "desmarcar tudo" : "selecionar tudo"}
        </div>
      </div>
      <div className="flex items-center justify-center md:justify-start rounded-md gap-2 bg-background03 px-3 py-2 ">
        <input
          type="checkbox"
          id="week-day"
          value="Dom"
          className="rounded-full size-8 bg-background03 flex justify-center items-center after:content-['D'] after:text-textColor checked:!bg-roxominerva checked:after:content-none cursor-pointer hover:bg-roxominerva focus:ring-offset-0 focus:ring-0 border-0"
          onClick={() => setError("")}
        />

        <input
          type="checkbox"
          id="week-day"
          value="Seg"
          className="rounded-full size-8 bg-background03 flex justify-center items-center after:content-['S'] after:text-textColor checked:!bg-roxominerva checked:after:content-none cursor-pointer hover:bg-roxominerva focus:ring-offset-0 focus:ring-0 border-0"
          onClick={() => setError("")}
        />

        <input
          type="checkbox"
          id="week-day"
          value="Ter"
          className="rounded-full size-8 bg-background03 flex justify-center items-center after:content-['T'] after:text-textColor checked:!bg-roxominerva checked:after:content-none cursor-pointer hover:bg-roxominerva focus:ring-offset-0 focus:ring-0 border-0"
          onClick={() => setError("")}
        />

        <input
          type="checkbox"
          id="week-day"
          value="Qua"
          className="rounded-full size-8 bg-background03 flex justify-center items-center after:content-['Q'] after:text-textColor checked:!bg-roxominerva checked:after:content-none cursor-pointer hover:bg-roxominerva focus:ring-offset-0 focus:ring-0 border-0"
          onClick={() => setError("")}
        />

        <input
          type="checkbox"
          id="week-day"
          value="Qui"
          className="rounded-full size-8 bg-background03 flex justify-center items-center after:content-['Q'] after:text-textColor checked:!bg-roxominerva checked:after:content-none cursor-pointer hover:bg-roxominerva focus:ring-offset-0 focus:ring-0 border-0"
          onClick={() => setError("")}
        />

        <input
          type="checkbox"
          id="week-day"
          value="Sex"
          className="rounded-full size-8 bg-background03 flex justify-center items-center after:content-['S'] after:text-textColor checked:!bg-roxominerva checked:after:content-none cursor-pointer hover:bg-roxominerva focus:ring-offset-0 focus:ring-0 border-0"
          onClick={() => setError("")}
        />

        <input
          type="checkbox"
          id="week-day"
          value="Sáb"
          className="rounded-full size-8 bg-background03 flex justify-center items-center after:content-['S'] after:text-textColor checked:!bg-roxominerva checked:after:content-none cursor-pointer hover:bg-roxominerva focus:ring-offset-0 focus:ring-0 border-0"
          onClick={() => setError("")}
        />
      </div>
    </div>
  );
};

export default SelectWeekDays;
