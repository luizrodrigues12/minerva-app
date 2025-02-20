import { useUserContext } from "@/contexts/userData";
import Button from "../layout/Button";
import InputComp from "../layout/InputComp";
import AlunosComp from "./AlunosComp";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";
import Container from "../layout/Container";

type StudentsProps = {
  isPlanning?: boolean;
};

const StudentsContainer = ({ isPlanning = false }: StudentsProps) => {
  const [busca, setBusca] = useState("");
  const { user } = useUserContext();
  const router = useRouter();

  const studentsFilteredsAndSorteds = () => {
    const alunosFilterded = user.alunos
      ?.filter((aluno) =>
        aluno.nome?.toLowerCase().includes(busca.toLowerCase())
      )
      ?.sort((a, b) => (a?.nome! < b?.nome! ? -1 : 1));
    if (isPlanning) {
      return alunosFilterded?.filter((aluno) => aluno.planning?.length! > 0);
    }
    return alunosFilterded;
  };

  return (
    <Container>
      <div className="flex flex-col gap-1.5 w-full">
        <div className="flex">
          <InputComp
            isSearch={true}
            placeholder="Pesquisar"
            value={busca || ""}
            className="!w-full"
            onChange={(e) => {
              setBusca(e.target.value);
            }}
          />
          {!isPlanning ? (
            <Button
              className="px-[25px] font-inter shadow-sm ml-2 !min-h-full"
              onClick={() => {
                router.push("/add_student");
              }}
            >
              Adicionar
            </Button>
          ) : (
            <div>
              {user.alunos?.length! > 0 && (
                <Button
                  className="px-[30.5px] font-inter shadow-sm ml-2 h-full"
                  onClick={() => {
                    router.push("/planning/add-planning");
                  }}
                >
                  Planejar
                </Button>
              )}
            </div>
          )}
        </div>

        {user.alunos?.length! > 0 ? (
          <div className="flex flex-col gap-1.5">
            {studentsFilteredsAndSorteds()?.map((aluno, i) => (
              <AlunosComp
                isPlanning={isPlanning}
                key={i}
                idAluno={aluno.idAluno!}
                name={aluno.nome!}
              />
            ))}
          </div>
        ) : (
          <div>
            {!isPlanning ? (
              <div className="text-inputText flex items-center justify-center bg-background03 p-4 rounded-md text-[14px] md:text-[16px]">
                Nenhum aluno cadastrado.
              </div>
            ) : (
              <div className="text-inputText flex items-center justify-center bg-background03 p-4 rounded-md text-[14px] md:text-[16px]">
                Adicione pelo menos um aluno antes de planejar.
              </div>
            )}
          </div>
        )}

        {isPlanning &&
          user.alunos?.length! > 0 &&
          user.alunos?.filter((aluno) => aluno.planning?.length! > 0).length ==
            0 && (
            <div className="text-inputText flex items-center justify-center bg-background03 p-4 rounded-md text-[14px] md:text-[16px] mt-[-6px]">
              Nenhum planejamento gerado.
            </div>
          )}
      </div>
    </Container>
  );
};

export default StudentsContainer;
