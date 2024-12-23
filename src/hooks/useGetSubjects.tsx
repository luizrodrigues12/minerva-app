import { MateriaType } from "@/models/MateriasModel";
import { useQuery } from "@tanstack/react-query";

export function useGetSubjects() {
  const getSubjects = async () => {
    const res = await fetch(`${process.env.HOST}/api/subject/get_subjects`, {
      method: "GET",
    });
    const { materias } = await res.json();
    return materias;
  };

  const query = useQuery<Array<MateriaType>>({
    queryFn: getSubjects,
    queryKey: ["subjects-data"],
  });

  return query;
}
