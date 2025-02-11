"use client";

import { useUserContext } from "@/contexts/userData";
import { dataMongoUser, daysAndSubjectsType } from "@/models/userModel";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "nextjs-toploader/app";

interface PostPlanningProps {
  daysAndSubjects: Array<daysAndSubjectsType>;
  idAluno: string;
  subjectPerDay: number;
}

export function useAddPlanning({}) {
  const { refetch, isFetching } = useUserContext();
  const router = useRouter();

  const postPlanning = async ({
    daysAndSubjects,
    idAluno,
    subjectPerDay,
  }: PostPlanningProps) => {
    try {
      const res = await fetch(`${process.env.HOST}/api/planning/add_planning`, {
        method: "POST",
        body: JSON.stringify({
          daysAndSubjects,
          idAluno,
          subjectPerDay,
        }),
      });
      const { user, error } = await res.json();
      if (error) {
        throw new Error(error);
      }
      const data: dataMongoUser = user;
      refetch();
      if (!isFetching) router.replace(`/planning/${idAluno}`);
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
