import { useUserContext } from "@/contexts/userData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { useRouter } from "nextjs-toploader/app";

const token = getCookie("authorization");

type UpdateStudentProps = {
  idAluno: string;
  nome: string;
  checkedsPrep: Array<string>;
  checkedsSubjects: any;
};

export function useUpdateStudent() {
  const queryClient = useQueryClient();
  const { refetch } = useUserContext();
  const router = useRouter();

  const tratedName = (name: string) => {
    return name
      .trim()
      .toLowerCase()
      .split(" ")
      .map(
        (palavra) => palavra.split("")[0].toUpperCase() + palavra.slice(1) + " "
      )
      .join("")
      .trim();
  };

  const updateStudent = async ({
    idAluno,
    checkedsPrep,
    checkedsSubjects,
    nome,
  }: UpdateStudentProps) => {
    const res = await fetch(`${process.env.HOST}/api/student/update_student`, {
      method: "PUT",
      body: JSON.stringify({
        token,
        idAluno,
        nome: nome ? tratedName(nome) : "",
        checkedsPrep,
        checkedsSubjects,
      }),
    });

    const { alunos } = await res.json();
    refetch();
    return alunos;
  };

  const mutate = useMutation({
    mutationFn: updateStudent,

    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["alunos-data"] });
      router.push("/home");
    },
    retry: 2,
  });

  return mutate;
}
