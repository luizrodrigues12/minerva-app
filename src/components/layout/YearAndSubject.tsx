import React from "react";

type Props = {
  year: number;
  subject: string;
};

const YearAndSubject = ({ year, subject }: Props) => {
  return (
    <div className="flex justify-between items-center font-medium text-zinc-200 pb-1">
      <p className=" text-[1rem] md:text-[0.9rem] pl-2">{year}° Ano</p>
      <p className="text-[0.9rem] pr-1.5">
        {subject.split("")[0].toUpperCase() + subject.slice(1)}
      </p>
    </div>
  );
};

export default YearAndSubject;
