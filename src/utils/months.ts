import { MateriaType } from "@/models/MateriasModel";
import { Dispatch } from "react";

export const allMonths = [
  { name: "Janeiro", dias: 31 },
  { name: "Fevereiro", dias: 28 },
  { name: "Março", dias: 31 },
  { name: "Abril", dias: 30 },
  { name: "Maio", dias: 31 },
  { name: "Junho", dias: 30 },
  { name: "Julho", dias: 31 },
  { name: "Agosto", dias: 31 },
  { name: "Setembro", dias: 30 },
  { name: "Outubro", dias: 31 },
  { name: "Novembro", dias: 30 },
  { name: "Dezembro", dias: 31 },
];

export interface DateType {
  date: number;
  day: string;
}

interface GetDaysProps {
  monthNumber: number;
  initialDate: number;
  finalDate: number;
}

interface SubjectType {
  name: string;
  ordem: number;
}

interface daysAndSubjectsType {
  date: number;
  day: string;
  subjects: Array<SubjectType>;
}

export const getDaysOfMonth = ({
  monthNumber,
  initialDate,
  finalDate,
}: GetDaysProps) => {
  const year = new Date().getFullYear();
  const daysOfMonth: Array<DateType> = [];

  for (let i = initialDate; i <= finalDate; i++) {
    const data = new Date(year, monthNumber, i);
    const date = data.getDate();
    const day = data.toString().split(" ")[0];
    const completeDate = { date, day, month: monthNumber + 1 };
    daysOfMonth.push(completeDate);
  }

  return daysOfMonth.map((date) => {
    if (date.day === "Sun") {
      return { ...date, day: "Dom" };
    } else if (date.day === "Mon") {
      return { ...date, day: "Seg" };
    } else if (date.day === "Tue") {
      return { ...date, day: "Ter" };
    } else if (date.day === "Wed") {
      return { ...date, day: "Qua" };
    } else if (date.day === "Thu") {
      return { ...date, day: "Qui" };
    } else if (date.day === "Fri") {
      return { ...date, day: "Sex" };
    } else if (date.day === "Sat") {
      return { ...date, day: "Sáb" };
    }
  });
};

interface getDaysAndSubjectsProps {
  getCheckedsDays: () => void;
  getCheckedsSubjects: () => void;
  getSelectedDaysOfMonth: () => (DateType | undefined)[];
  idAluno: string;
  checkedsSubj: string[];
  monthDays: number;
  checkedsDays: string[];
  initialDate: number;
  finalDate: number;
  subjectPerDay: number;
  setError: Dispatch<React.SetStateAction<string>>;
}

export const getDaysAndSubjectsFinal = ({
  getCheckedsDays,
  getCheckedsSubjects,
  getSelectedDaysOfMonth,
  idAluno,
  checkedsSubj,
  monthDays,
  checkedsDays,
  initialDate,
  finalDate,
  subjectPerDay,
  setError,
}: getDaysAndSubjectsProps) => {
  try {
    getCheckedsDays();
    getCheckedsSubjects();
    const selectedDaysOfMonth = getSelectedDaysOfMonth();

    if (!idAluno) throw new Error("Escolha algum aluno.");
    if (!checkedsSubj?.length) throw new Error("Selecione alguma matéria.");
    if (!monthDays) throw new Error("Selecione algum mês.");
    if (!checkedsDays?.length)
      throw new Error("Selecione algum dia da semana.");
    if (!initialDate) throw new Error("Digite uma data inicial.");
    if (!finalDate) throw new Error("Digite uma data final.");
    if (finalDate > monthDays)
      throw new Error(`A data final deve estar entre 1 e ${monthDays}.`);
    if (!subjectPerDay)
      throw new Error("Digite quantas matérias ensinará por dia.");
    if (subjectPerDay > checkedsSubj.length)
      throw new Error(`"Matérias por dia" maior que a quantidade marcada.`);
    if (!selectedDaysOfMonth.length)
      throw new Error("Esses dias não existem nesse intervalo.");

    const daysAndSubjects: Array<daysAndSubjectsType> = [];

    for (let i = 0; i < selectedDaysOfMonth.length; i++) {
      const subjectParsed: MateriaType = JSON.parse(checkedsSubj[i]);
      const date = selectedDaysOfMonth[i];
      const subjects: Array<SubjectType> = [];

      const result = {
        date: date?.date!,
        day: date?.day!,
        subjects: [{ name: subjectParsed.nome, ordem: subjectParsed.ordem }],
      };
      daysAndSubjects.push(result);
    }

    return daysAndSubjects;
  } catch (error: any) {
    setError(error.message);
  }
};
