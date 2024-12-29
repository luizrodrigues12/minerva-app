import { AlunoObj } from "@/models/userModel";
import MateriaComp from "./MateriaComp";
import YearAndSubject from "../layout/YearAndSubject";

type Props = {
  oneStudent: AlunoObj;
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

        <div className="flex flex-col rounded-lg p-2 border-2 border-zinc-800  mb-3">
          <YearAndSubject
            subject="matemática"
            year={materiaAno === "mat6" ? 6 : 1}
          />

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
                    <div key={i}>
                      <MateriaComp
                        text={objMateria.nome.toUpperCase()}
                        isChecked={objMateria.isChecked}
                        id={objMateria._id}
                        onClick={(e: any) => {
                          e.preventDefault();
                          toggleIsChecked(objMateria, e);
                        }}
                      />
                    </div>
                  );
              }
            })}
        </div>
      </div>
    </div>
  );
};

export default MateriasMatematica;
