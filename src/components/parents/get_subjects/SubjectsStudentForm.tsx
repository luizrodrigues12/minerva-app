"use client";

import { useEffect, useState } from "react";
import InputComp from "@/components/layout/InputComp";
import Container from "@/components/layout/Container";
import NomePreparatorioParents from "@/components/parents/get_subjects/NomePreparatorioParents";
import AllSubjectsParents from "./AllSubjectsParents";
import { useParentsData } from "@/hooks/useParentsData";
import Loading from "@/components/layout/Loading";
import Image from "next/image";
import { UserCircle } from "flowbite-react-icons/outline";

type Props = {
  idAluno: string;
};

const SubjectsStudentForm = ({ idAluno }: Props) => {
  const [busca, setBusca] = useState("");
  const { data, isFetched } = useParentsData(idAluno);

  useEffect(() => {}, []);

  return (
    <Container>
      {isFetched ? (
        <div className="flex flex-col justify-center w-full">
          {data?.aluno ? (
            <div className="flex flex-col w-full rounded-lg gap-3 ">
              <div className="flex flex-col gap-4">
                {/* Info Professor */}
                <div className="flex gap-3 w-full text-textColor rounded-md">
                  {data.user.avatar ? (
                    <div className="relative">
                      <Image
                        src={data.user.avatar}
                        alt={`Avatar de ${data.user.name}`}
                        width={120}
                        height={120}
                        className="max-w-[88px] max-h-[88px] md:max-w-[94px] md:max-h-[94px] rounded-md object-cover dark:bg-[#101010] bg-background03"
                      />
                    </div>
                  ) : (
                    <div className="bg-background03 text-inputText rounded-md relative">
                      <UserCircle size={100} strokeWidth={0.5} />
                    </div>
                  )}

                  <div className="flex flex-col gap-1.5 justify-between w-full">
                    <div className="p-2.5 md:p-2.5 px-3 bg-background03 rounded-md text-[14px] md:text-[16px]">
                      {data.user.name}
                    </div>
                    <div className="p-2.5 md:p-2.5 px-3 bg-background03 rounded-md text-[14px] md:text-[16px]">
                      Professor(a)
                    </div>
                  </div>
                </div>

                {/* Info Aluno */}
                <NomePreparatorioParents
                  idAluno={idAluno}
                  aluno={data?.aluno!}
                />

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
                        <AllSubjectsParents
                          busca={busca}
                          idAluno={idAluno}
                          aluno={data?.aluno!}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-[#606060] text-center p-4 rounded-md bg-background03 w-full">
              Esse aluno não foi encontrado.
            </div>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </Container>
  );
};

export default SubjectsStudentForm;
