import { useUserContext } from "@/contexts/userData";
import { dataMongoUser, daysAndSubjectsType } from "@/models/userModel";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "nextjs-toploader/app";

interface UpdatePlanningProps {
  daysAndSubjects: Array<daysAndSubjectsType>;
  subjectPerDay: number;
  idAluno: string;
  planningId: string;
}

export function useUpdatePlanning() {
  const { refetch, isFetching } = useUserContext();
  const router = useRouter();

  const updatePlanning = async ({
    daysAndSubjects,
    idAluno,
    planningId,
    subjectPerDay,
  }: UpdatePlanningProps) => {
    try {
      const res = await fetch(
        `${process.env.HOST}/api/planning/update_planning`,
        {
          method: "PUT",
          body: JSON.stringify({
            daysAndSubjects,
            subjectPerDay,
            idAluno,
            planningId,
          }),
        }
      );
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

  const mutate = useMutation({ mutationFn: updatePlanning });

  return mutate;
}
