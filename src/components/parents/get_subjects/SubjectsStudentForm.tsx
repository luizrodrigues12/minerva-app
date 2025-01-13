"use client";

import { useState } from "react";
import Loading from "../../layout/Loading";
import { useParentsData } from "@/hooks/useParentsData";
import AllSubjects from "@/components/student/AllSubjects";
import InputComp from "@/components/layout/InputComp";
import NomePreparatorio from "@/components/student/NomePreparatorio";
import Container from "@/components/layout/Container";

type Props = {
  idAluno: string;
};

const SubjectsStudentForm = ({ idAluno }: Props) => {
  const [busca, setBusca] = useState("");
  const { data: aluno } = useParentsData(idAluno);

  return (
    <Container>
      {!aluno ? (
        <Loading />
      ) : (
        <div className="flex flex-col justify-center w-full">
          <div className="flex flex-col w-full rounded-lg gap-3 ">
            <div className="flex flex-col gap-4">
              {/* NOME DO ALUNO */}
              <NomePreparatorio idAluno={idAluno} />

              <div className="flex flex-col gap-0">
                <div className="flex flex-col gap-4">
                  <InputComp
                    isSearch={true}
                    type="text"
                    placeholder="Buscar por assuntos"
                    value={busca}
                    onChange={(e) => {
                      setBusca(e.target.value);
                    }}
                    className="!mt-0"
                  />
                  <div className="flex flex-col gap-1.5">
                    <div className="flex flex-col gap-1.5">
                      <AllSubjects
                        busca={busca}
                        idAluno={idAluno}
                        isParentPage={true}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default SubjectsStudentForm;
