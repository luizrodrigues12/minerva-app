import { AlunosObj } from "@/stores/userStore";
import { FileCopy } from "flowbite-react-icons/outline";
import copy from "clipboard-copy";

type Props = {
  oneStudent: AlunosObj;
  idAluno: string;
};

const NomePreparatorio = ({ oneStudent, idAluno }: Props) => {
  return (
    <div className="flex flex-col gap-2 ">
      <div className="w-full bg-zinc-800 p-1.5 pl-2.5 rounded-lg flex justify-between ">
        <p id="nome_do_aluno">
          {
            oneStudent?.nome
              ?.split(" ")
              .map(
                (palavra) =>
                  `${palavra[0].toUpperCase()}${palavra.substring(1)} `
              )!
          }
        </p>
        <FileCopy
          color="#e4e4e7"
          className="hover:cursor-pointer"
          onClick={async () =>
            copy(`${process.env.HOST}/parents/get_subjects/${idAluno}`)
          }
        />
      </div>
      <div className="flex gap-1 w-full bg-zinc-800 p-1.5 pl-2.5 rounded-lg ">
        {oneStudent?.preparatorio?.map((prep, i) =>
          prep == "aplicação" ? (
            <p key={i}>{prep[0].toUpperCase() + prep.substring(1)} </p>
          ) : (
            <p key={i}>{prep.toUpperCase()}</p>
          )
        )}
      </div>
    </div>
  );
};

export default NomePreparatorio;
