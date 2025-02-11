"use client";

import Container from "@/components/layout/Container";
import SelectMonth from "@/components/layout/SelectMonth";
import { useSectionContext } from "@/contexts/section";
import {
  allMonths,
  DateType,
  getDaysAndSubjectsFinal,
  getDaysOfMonth,
} from "@/utils/months";
import React, { useEffect, useState } from "react";
import Button from "@/components/layout/Button";
import { daysAndSubjectsType } from "@/models/userModel";
import AddPlanningSubjects from "../../add-planning/AddPlanningSubjects";
import SelectWeekDays from "../../add-planning/SelectWeekDays";
import DatesPlace from "../../add-planning/DatesPlace";
import PlanningPDF from "../../add-planning/PlanningPDF";
import { useUserContext } from "@/contexts/userData";
import Loading from "@/components/layout/Loading";
import { MateriaType } from "@/models/MateriasModel";

interface EditPlanningProps {
  idAlunoParam: string;
  numberPlanning: number;
}

const EditPlanningForm = ({
  numberPlanning,
  idAlunoParam,
}: EditPlanningProps) => {
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState("");
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
  const { getAluno } = useUserContext();
  const aluno = getAluno(idAlunoParam);
  const planning = aluno.planning![numberPlanning];

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

  const getAllSelectedsSubjects = () => {
    let allSubjects: Array<MateriaType> = [];
    planning?.daysAndSubjects.map((daysAndSubj, i) => {
      daysAndSubj.subjects.map((subj) => allSubjects.push(subj));
    });
    return allSubjects;
  };

  useEffect(() => {
    setCheckedsSubj([]);
    setcheckedsDays([]);
    setMonthName(allMonths[planning.daysAndSubjects[0].month - 1].name);
    setMonthDays(allMonths[planning.daysAndSubjects[0].month - 1].dias);
    setMonthNumber(planning.daysAndSubjects[0].month - 1);
    setIdAluno(idAlunoParam);
    setSection("planning");
  }, []);

  return (
    <Container>
      {!isPosting ? (
        <div className="text-textColor flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="text-[16px] md:text-[18px]">Aluno</div>
            <div className="p-3 bg-background03 rounded-md">{aluno.nome}</div>
          </div>

          <AddPlanningSubjects
            idAluno={idAlunoParam}
            planning={planning}
            setError={setError}
          />

          <SelectMonth
            setMonthName={setMonthName}
            monthName={monthName}
            setMonthDays={setMonthDays}
            monthDays={monthDays}
            setMonthNumber={setMonthNumber}
            setError={setError}
          />

          <SelectWeekDays planning={planning} setError={setError} />

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
              planning={planning}
            />
          )}

          <div className="flex gap-1.5 items-center">
            <input
              type="checkbox"
              className="size-[18px] rounded-sm checked:outline-none focus:outline-none focus:ring-offset-0 focus:ring-0 cursor-pointer checked:!bg-roxominerva"
              id="alternate-subjects"
              onClick={() => setAlternateSubjects(!alternateSubjects)}
              defaultChecked={
                getAllSelectedsSubjects()[0].materia === "português" &&
                getAllSelectedsSubjects()[1].materia === "matemática"
              }
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
              setError={setError}
              daysAndSubjects={daysAndSubjects!}
              idAluno={idAluno}
              setIsOpen={setIsOpen}
              subjectPerDay={subjectPerDay}
              planningId={planning.id}
              setIsPosting={setIsPosting}
            />
          )}

          <Button
            onClick={() => {
              setError("");
              submitForm();
            }}
          >
            Visualizar Planejamento
          </Button>
        </div>
      ) : (
        <Loading />
      )}
    </Container>
  );
};

export default EditPlanningForm;
