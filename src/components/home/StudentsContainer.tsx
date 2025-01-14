import { useUserContext } from "@/contexts/userData";
import Button from "../layout/Button";
import InputComp from "../layout/InputComp";
import AlunosComp from "./AlunosComp";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";
import Container from "../layout/Container";

const StudentsContainer = () => {
  const [busca, setBusca] = useState("");
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
    <Container>
      <div className="flex flex-col gap-1.5 w-full">
        <div className="flex gap-2">
          <InputComp
            isSearch={true}
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
          <div className="text-[#606060] flex items-center justify-center bg-background03 p-4 rounded-md">
            Nenhum aluno cadastrado.
          </div>
        )}
      </div>
    </Container>
  );
};

export default StudentsContainer;
