"use client";

import Container from "@/components/layout/Container";
import SelectMonth from "@/components/layout/SelectMonth";
import SelectStudent from "@/components/layout/SelectStudent";
import { useSectionContext } from "@/contexts/section";
import {
  DateType,
  getDaysAndSubjectsFinal,
  getDaysOfMonth,
} from "@/utils/months";
import React, { useEffect, useState } from "react";
import AddPlanningSubjects from "./AddPlanningSubjects";
import SelectWeekDays from "./SelectWeekDays";
import Button from "@/components/layout/Button";
import DatesPlace from "./DatesPlace";
import { MateriaType } from "@/models/MateriasModel";
import PlanningPDF from "./PlanningPDF";

export interface daysAndSubjectsType {
  date: number;
  day: string;
  month: number;
  subjects: Array<MateriaType>;
}

const AddPlanningForm = () => {
  const [error, setError] = useState("");
  const [aluno, setAluno] = useState("Escolha um aluno");
  const [idAluno, setIdAluno] = useState("");
  const [checkedsSubj, setCheckedsSubj] = useState<Array<string>>();
  const [monthNumber, setMonthNumber] = useState(0);
  const [monthName, setMonthName] = useState("Escolha um mês");
  const [monthDays, setMonthDays] = useState(0);
  const [checkedsDays, setcheckedsDays] = useState<Array<string>>();
  const [initialDate, setInitialDate] = useState(0);
  const [finalDate, setFinalDate] = useState(0);
  const [subjectPerDay, setSubjectPerDay] = useState(0);
  const [alternateSubjects, setAlternateSubjects] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [daysAndSubjects, setDaysAndSubjects] =
    useState<Array<daysAndSubjectsType>>();
  const { setSection } = useSectionContext();

  const daysOfMonth = getDaysOfMonth({
    monthNumber,
    finalDate,
    initialDate,
  });

  const getCheckedsSubjects = () => {
    document.getElementsByName("subject").forEach((subject: any) => {
      if (subject.checked && !checkedsSubj?.includes(subject.value))
        checkedsSubj?.push(subject.value);
      return;
    });
    setCheckedsSubj([]);
  };

  const getCheckedsDays = () => {
    const weekDays = document.querySelectorAll("#week-day");
    weekDays.forEach((day: any) => {
      if (day.checked && !checkedsDays?.includes(day.value))
        checkedsDays?.push(day.value);
      return;
    });
    setcheckedsDays([]);
  };

  const getSelectedDaysOfMonth = () => {
    const daysSelecteds: Array<DateType | undefined> = daysOfMonth.filter(
      (day) => checkedsDays?.includes(day?.day!)
    );
    return daysSelecteds;
  };

  const submitForm = () => {
    try {
      const completeDate: Array<daysAndSubjectsType> = getDaysAndSubjectsFinal({
        getCheckedsDays,
        getCheckedsSubjects,
        getSelectedDaysOfMonth,
        idAluno,
        checkedsSubj: checkedsSubj!,
        monthDays,
        checkedsDays: checkedsDays!,
        initialDate,
        finalDate,
        subjectPerDay,
        setError,
        alternateSubjects,
        setIsOpen,
      })!;

      setDaysAndSubjects(completeDate);
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    setCheckedsSubj([]);
    setcheckedsDays([]);
    setSection("planning");
  }, []);

  return (
    <Container>
      <div className="text-textColor flex flex-col gap-4">
        <SelectStudent
          setOption={setAluno}
          setValue={setIdAluno}
          value={idAluno}
          option={aluno}
          setError={setError}
        />

        <AddPlanningSubjects idAluno={idAluno} setError={setError} />

        <SelectMonth
          setMonthName={setMonthName}
          monthName={monthName}
          setMonthDays={setMonthDays}
          monthDays={monthDays}
          setMonthNumber={setMonthNumber}
          setError={setError}
        />

        <SelectWeekDays setError={setError} />

        {monthDays > 0 && (
          <DatesPlace
            setError={setError}
            finalDate={finalDate}
            setFinalDate={setFinalDate}
            initialDate={initialDate}
            setInitialDate={setInitialDate}
            monthDays={monthDays}
            setSubjectPerDay={setSubjectPerDay}
            subjectPerDay={subjectPerDay}
          />
        )}

        <div className="flex gap-1.5 items-center">
          <input
            type="checkbox"
            className="size-[18px] rounded-sm checked:outline-none focus:outline-none focus:ring-offset-0 focus:ring-0 cursor-pointer checked:!bg-roxominerva"
            id="alternate-subjects"
            onClick={() => setAlternateSubjects(!alternateSubjects)}
          />
          <p className="text-[14px] md:text-[16px]">
            Alternar entre Português e Matemática.
          </p>
        </div>

        {error && (
          <p className="text-[14px] py-0.5 text-center text-errorColor">
            {error}
          </p>
        )}

        {isOpen && (
          <PlanningPDF
            daysAndSubjects={daysAndSubjects!}
            idAluno={idAluno}
            setIsOpen={setIsOpen}
            subjectPerDay={subjectPerDay}
            monthNumber={monthNumber}
          />
        )}

        <Button
          onClick={() => {
            setError("");
            submitForm();
          }}
        >
          Criar Planejamento
        </Button>
      </div>
    </Container>
  );
};

export default AddPlanningForm;
