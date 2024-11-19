import { AlunosObj } from "@/stores/userStore";
import MateriaComp from "./MateriaComp";

type Props = {
  oneStudent: AlunosObj;
  busca: string;
  materiaAno: "mat6" | "mat1";
  toggleIsChecked: (objMateria: any, e: any) => Promise<void>;
};

const MateriasMatematica = ({
  oneStudent,
  busca,
  materiaAno,
  toggleIsChecked,
}: Props) => {
  return (
    <div>
      <div>
        {/* PORTUGUÊS DO SEXTO ANO */}
        <h2 className="font-medium text-zinc-200 text-[1.18rem] pl-0.5 py-1.5">
          Matemática
        </h2>
        <div className="flex flex-col rounded-lg p-2 border-2 border-zinc-800 mb-3">
          <p className="font-medium text-zinc-200 text-[1rem] md:text-[0.9rem] pl-2">
            {materiaAno === "mat6" ? "6° Ano" : "1° Ano"}
          </p>
          {oneStudent?.materias
            ?.filter((materia: any) =>
              materia.nome.toLowerCase().includes(busca.toLowerCase())
            )
            ?.sort((a: any, b: any) =>
              a.ordem < b.ordem ? -1 : a.ordem > b.ordem ? 1 : 0
            )
            .map((objMateria: any, i) => {
              if (
                materiaAno === "mat6"
                  ? objMateria.ordem <= 15
                  : objMateria.ordem > 15
              ) {
                if (objMateria.materia === "matemática")
                  return (
                    <MateriaComp
                      key={i}
                      text={objMateria.nome.toUpperCase()}
                      isChecked={objMateria.isChecked}
                      id={objMateria._id}
                      onClick={(e: any) => toggleIsChecked(objMateria, e)}
                    />
                  );
              }
            })}
        </div>
      </div>
    </div>
  );
};

export default MateriasMatematica;
