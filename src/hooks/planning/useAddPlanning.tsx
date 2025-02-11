"use client";

import { useUserContext } from "@/contexts/userData";
import { dataMongoUser, daysAndSubjectsType } from "@/models/userModel";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 as uuidV4 } from "uuid";

interface PostPlanningProps {
  daysAndSubjects: Array<daysAndSubjectsType>;
  idAluno: string;
  subjectPerDay: number;
}

export function useAddPlanning({}) {
  const { refetch } = useUserContext();

  const postPlanning = async ({
    daysAndSubjects,
    idAluno,
    subjectPerDay,
  }: PostPlanningProps) => {
    try {
      const res = await fetch(`${process.env.HOST}/api/student/add_planning`, {
        method: "POST",
        body: JSON.stringify({
          daysAndSubjects,
          idAluno,
          subjectPerDay,
          id: uuidV4(),
        }),
      });
      const { user, error } = await res.json();
      if (error) {
        throw new Error(error);
      }
      refetch();
      const data: dataMongoUser = user;
      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const mutate = useMutation({
    mutationFn: postPlanning,
  });

  return mutate;
}
