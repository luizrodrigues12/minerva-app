"use client";

import { useEffect, useState } from "react";
import InputComp from "@/components/layout/InputComp";
import Container from "@/components/layout/Container";
import NomePreparatorioParents from "@/components/parents/get_subjects/NomePreparatorioParents";
import AllSubjectsParents from "./AllSubjectsParents";
import { useParentsData } from "@/hooks/useParentsData";
import Loading from "@/components/layout/Loading";

type Props = {
  idAluno: string;
};

const SubjectsStudentForm = ({ idAluno }: Props) => {
  const [busca, setBusca] = useState("");
  const { data: aluno, refetch, isFetched } = useParentsData(idAluno);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <Container>
      {isFetched ? (
        <div className="flex flex-col justify-center w-full">
          <div className="flex flex-col w-full rounded-lg gap-3 ">
            <div className="flex flex-col gap-4">
              {/* NOME DO ALUNO */}
              <NomePreparatorioParents idAluno={idAluno} aluno={aluno!} />
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
                      <AllSubjectsParents busca={busca} idAluno={idAluno} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </Container>
  );
};

export default SubjectsStudentForm;
