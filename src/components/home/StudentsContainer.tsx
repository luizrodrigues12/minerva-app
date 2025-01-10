import { useUserContext } from "@/contexts/userData";
import Button from "../layout/Button";
import InputComp from "../layout/InputComp";
import AlunosComp from "./AlunosComp";
import { useDeferredValue, useState } from "react";
import { useRouter } from "nextjs-toploader/app";

const StudentsContainer = () => {
  const [busca, setBusca] = useState("");
  const buscaDeferred = useDeferredValue(busca);
  const { user } = useUserContext();
  const router = useRouter();

  const studentsFilteredsAndSorteds = () => {
    return user.alunos
      ?.filter((aluno) =>
        aluno.nome?.toLowerCase().includes(busca.toLowerCase())
      )
      ?.sort((a, b) => (a?.nome! < b?.nome! ? -1 : 1));
  };

  return (
    <div>
      <div className="flex flex-col gap-1.5 w-full p-6 py-2 md:py-4 lg:p-6 xl:p-6 2xl:p-8">
        <div className="flex gap-2">
          <InputComp
            placeholder="Pesquisar"
            value={busca || ""}
            className="!mt-0"
            onChange={(e) => {
              setBusca(e.target.value);
            }}
          />
          <Button
            className="px-[25px] font-inter shadow-sm"
            onClick={() => {
              router.push("/add_student");
            }}
          >
            Adicionar
          </Button>
        </div>

        {user.alunos?.length! > 0 ? (
          <div className="flex flex-col gap-1.5">
            {studentsFilteredsAndSorteds()?.map((aluno, i) => (
              <AlunosComp key={i} idAluno={aluno.idAluno!} name={aluno.nome!} />
            ))}
          </div>
        ) : (
          <div className="text-[#404040] flex items-center justify-center bg-background01 p-4 rounded-md">
            Nenhum aluno cadastrado.
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentsContainer;
