import { daysAndSubjectsType } from "@/components/planning/add-planning/AddPlanningForm";
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
  month: number;
}

interface GetDaysProps {
  monthNumber: number;
  initialDate: number;
  finalDate: number;
}

type DistributeSubjectsProps = {
  selectedDaysOfMonth: Array<DateType>;
  subjects: Array<MateriaType>;
  subjectPerDay: number;
  alternateSubjects: boolean;
};

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
      return { ...date, day: "Domingo" };
    } else if (date.day === "Mon") {
      return { ...date, day: "Segunda-feira" };
    } else if (date.day === "Tue") {
      return { ...date, day: "Terça-feira" };
    } else if (date.day === "Wed") {
      return { ...date, day: "Quarta-feira" };
    } else if (date.day === "Thu") {
      return { ...date, day: "Quinta-feira" };
    } else if (date.day === "Fri") {
      return { ...date, day: "Sexta-feira" };
    } else if (date.day === "Sat") {
      return { ...date, day: "Sábado" };
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
  alternateSubjects: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
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
  alternateSubjects = false,
  setIsOpen,
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
    if (checkedsSubj.length > subjectPerDay * selectedDaysOfMonth.length)
      throw new Error(
        `Matérias por dia precisa ser maior que ${Math.round(
          checkedsSubj.length / selectedDaysOfMonth.length
        )}.`
      );

    //Tranformando Matérias Json em Objeto
    const subjectsParsed: Array<MateriaType> = [];
    checkedsSubj.map((subj) => subjectsParsed.push(JSON.parse(subj)));

    const subjectsPortuguese = subjectsParsed.filter(
      (subj) => subj.materia === "português"
    );

    const subjectsMath = subjectsParsed.filter(
      (subj) => subj.materia === "matemática"
    );

    if (alternateSubjects && subjectsPortuguese.length === 0) {
      throw new Error("Nenhum matéria de Português selecionada.");
    } else if (alternateSubjects && subjectsMath.length === 0) {
      throw new Error("Nenhum matéria de Matemática selecionada.");
    }

    setIsOpen(true);
    return distributeSubjects({
      selectedDaysOfMonth: selectedDaysOfMonth as Array<DateType>,
      subjects: subjectsParsed,
      subjectPerDay,
      alternateSubjects,
    });
  } catch (error: any) {
    setError(error.message);
  }
};

function distributeSubjects({
  selectedDaysOfMonth,
  subjects,
  subjectPerDay,
  alternateSubjects = false,
}: DistributeSubjectsProps) {
  // Ordena as matérias pela chave 'ordem'
  const subjectsArray = [...subjects];

  // Se for necessário alternar entre matérias, separamos as listas
  let portuguesSubjects = subjectsArray.filter(
    (sub) => sub.materia === "português"
  );
  let matematicaSubjects = subjectsArray.filter(
    (sub) => sub.materia === "matemática"
  );

  let subjectIndex = 0;
  let totalSubjects = subjectsArray.length;
  let portuguesIndex = 0,
    matematicaIndex = 0;

  return selectedDaysOfMonth
    .map((day) => {
      // Caso acabem as matérias, subjects recebem array vazio
      if (subjectIndex >= totalSubjects) return { ...day, subjects: [] };

      let subjectsForTheDay = [];

      if (alternateSubjects) {
        // Alterna entre português e matemática
        for (let i = 0; i < subjectPerDay; i++) {
          if (i % 2 === 0 && portuguesIndex < portuguesSubjects.length) {
            subjectsForTheDay.push(portuguesSubjects[portuguesIndex++]);
          } else if (matematicaIndex < matematicaSubjects.length) {
            subjectsForTheDay.push(matematicaSubjects[matematicaIndex++]);
          }
        }
      } else {
        // Seleciona matérias na sequência original
        subjectsForTheDay = subjectsArray.slice(
          subjectIndex,
          subjectIndex + subjectPerDay
        );
        subjectIndex += subjectsForTheDay.length;
      }

      const completeData: daysAndSubjectsType = {
        ...day,
        subjects: subjectsForTheDay,
      };

      return completeData;
    })
    .filter((day) => day.subjects.length > 0); // Remove dias sem matérias
}
