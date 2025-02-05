import { AngleDown, AngleUp } from "flowbite-react-icons/outline";
import { Dispatch, SetStateAction, useState } from "react";
import InputComp from "./InputComp";
import { useUserContext } from "@/contexts/userData";

type SelectProps = {
  setOption: Dispatch<SetStateAction<string>>;
  option: string;
  setValue: Dispatch<SetStateAction<string>>;
  value: string;
};

const SelectStudent = ({ value, setValue, setOption, option }: SelectProps) => {
  const [busca, setBusca] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useUserContext();

  const filteredStudents = user.alunos
    ?.sort((a, b) => (a?.nome! < b?.nome! ? -1 : 1))
    .filter((aluno) =>
      aluno.nome?.toLowerCase().includes(busca.toLocaleLowerCase())
    );

  return (
    <div className="rounded-md relative">
      <div
        className="rounded-md bg-background03 flex justify-between items-center cursor-pointer hover:brightness-95"
        onClick={() => setIsOpen(!isOpen)}
      >
        <InputComp
          className="placeholder:text-textColor cursor-pointer"
          placeholder={option}
          value={busca || ""}
          onChange={(e) => setBusca(e.target.value)}
        />
        {isOpen ? (
          <div className="px-3">
            <AngleUp className="text-corIcones " />
          </div>
        ) : (
          <div className="px-3">
            <AngleDown className="text-corIcones " />
          </div>
        )}
      </div>
      {isOpen && (
        <div className="flex flex-col bg-background03 mt-1 rounded-md absolute z-[2] w-full max-h-[153px] md:max-h-[165px] overflow-y-scroll overflow-hidden scroll-style">
          {filteredStudents?.map((aluno, i) => (
            <div
              key={i}
              className={`flex items-center py-2 hover:bg-background03Hover cursor-pointer text-[14px] md:text-[16px] ${
                i === filteredStudents.length! - 1
                  ? "border-0 pb-2.5"
                  : "border-b-[1px] border-borderColor"
              }`}
              onClick={() => {
                setOption(aluno.nome!);
                setValue(aluno.idAluno!);
                setBusca("");
                setIsOpen(false);
              }}
            >
              <option key={i} className="px-3 text-[14px] md:text-[16px]">
                {aluno.nome}
              </option>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectStudent;
