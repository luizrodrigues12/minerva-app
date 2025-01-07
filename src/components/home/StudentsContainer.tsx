import { useUserContext } from "@/contexts/userData";
import Button from "../layout/Button";
import InputComp from "../layout/InputComp";
import AlunosComp from "./AlunosComp";
import { useDeferredValue, useState } from "react";

const StudentsContainer = () => {
  const [busca, setBusca] = useState("");
  const buscaDeferred = useDeferredValue(busca);
  const { user } = useUserContext();

  return (
    <div className="flex flex-col gap-2 p-8 w-[570px]">
      <div className="flex gap-2">
        <InputComp placeholder="Pesquisar" className="!mt-0 " />
        <Button className="px-[21.5px] font-inter">Adicionar</Button>
      </div>
      <div className="flex flex-col gap-2">
        {user.alunos?.map((aluno, i) => (
          <AlunosComp key={i} idAluno={aluno.idAluno!} name={aluno.nome!} />
        ))}
      </div>
    </div>
  );
};

export default StudentsContainer;
