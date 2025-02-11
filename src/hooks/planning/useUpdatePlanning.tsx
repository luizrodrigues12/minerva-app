import { useUserContext } from "@/contexts/userData";
import { dataMongoUser, daysAndSubjectsType } from "@/models/userModel";
import { useMutation } from "@tanstack/react-query";

interface UpdatePlanningProps {
  daysAndSubjects: Array<daysAndSubjectsType>;
  subjectPerDay: number;
  idAluno: string;
  planningId: string;
}

export function useUpdatePlanning() {
  const { refetch } = useUserContext();

  const updatePlanning = async ({
    daysAndSubjects,
    idAluno,
    planningId,
    subjectPerDay,
  }: UpdatePlanningProps) => {
    try {
      const res = await fetch(
        `${process.env.HOST}/api/student/update_planning`,
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
      refetch();
      const data: dataMongoUser = user;
      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const mutate = useMutation({ mutationFn: updatePlanning });

  return mutate;
}
