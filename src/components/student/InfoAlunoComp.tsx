"use client";

import { useEffect, useState } from "react";
import NomePreparatorio from "./NomePreparatorio";
import Loading from "../layout/Loading";
import { useUserContext } from "@/contexts/userData";
import InputComp from "../layout/InputComp";
import { useRouter } from "nextjs-toploader/app";
import AllSubjects from "./AllSubjects";
import Button from "../layout/Button";
import Container from "../layout/Container";

const InfoAlunoComp = ({ idAluno }: { idAluno: string }) => {
  const [busca, setBusca] = useState("");
  const { user, getAluno } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (!getAluno(idAluno)) {
      router.replace("/home");
    }
  }, []);

  return (
    <Container>
      {!getAluno(idAluno) ? (
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
                    type="text"
                    placeholder="Buscar por assuntos"
                    value={busca}
                    onChange={(e) => {
                      setBusca(e.target.value);
                    }}
                    className="!mt-0"
                    isSearch={true}
                  />
                  <div className="flex flex-col gap-1.5">
                    <div className="flex flex-col gap-1.5">
                      <AllSubjects busca={busca} idAluno={idAluno} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex gap-2">
              <Button
                className="w-full"
                onClick={() =>
                  router.push(`/student/delete_student/${idAluno}`)
                }
              >
                Remover
              </Button>
              <Button
                onClick={() =>
                  router.push(`/student/update_student/${idAluno}`)
                }
                className="w-full"
              >
                Editar
              </Button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default InfoAlunoComp;
