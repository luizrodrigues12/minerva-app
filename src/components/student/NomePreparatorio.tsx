import { AlunoObj } from "@/models/userModel";
import { FileCopy } from "flowbite-react-icons/outline";
import copy from "clipboard-copy";

type Props = {
  oneStudent: AlunoObj;
  idAluno: string;
};

const NomePreparatorio = ({ oneStudent, idAluno }: Props) => {
  return (
    <div className="flex flex-col gap-2 text-textwhite w-full">
      <div className="w-full bg-zinc-800 py-5 px-2.5 h-[36px] rounded-lg flex justify-between items-center">
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
      <div className="flex gap-1 w-full items-center bg-zinc-800 py-5 h-[36px] pl-2.5 rounded-lg tracking-wide ">
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
