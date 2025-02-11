"use client";

import Button from "@/components/layout/Button";
import Container from "@/components/layout/Container";
import { useUserContext } from "@/contexts/userData";
import { allMonths, withZeroOrNot } from "@/utils/months";
import { ArrowRight } from "flowbite-react-icons/outline";
import React, { useEffect, useState } from "react";
import PlanningPDF from "./PlanningPDF";
import { PlanningObj } from "@/models/userModel";
import { useRouter } from "nextjs-toploader/app";
import { useDeletePlanning } from "@/hooks/planning/useDeletePlanning";
import Modal from "@/components/layout/Modal";
import Loading from "@/components/layout/Loading";

const AllPlannings = ({ idAluno }: { idAluno: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState("");
  const [planning, setPlanning] = useState<PlanningObj>();
  const router = useRouter();
  const { getAluno } = useUserContext();
  const { mutateAsync, data } = useDeletePlanning();
  const aluno = getAluno(idAluno);

  const sortedPlanning = aluno.planning?.sort(
    (a, b) => a.daysAndSubjects[0].month! - b.daysAndSubjects[0].month!
  );

  const deletePlanning = async ({
    idAluno,
    planningId,
  }: {
    idAluno: string;
    planningId: string;
  }) => {
    setIsPosting(true);
    const data = await mutateAsync({ idAluno, planningId });
    if (data.length !== 0) {
      setIsPosting(false);
    }
    setIsOpenDelete(false);
  };

  return (
    <Container>
      {!isPosting ? (
        <div className="flex flex-col gap-2">
          <div className="text-[16px] md:text-[18px] bg-background03 p-2.5 px-4 rounded-md text-center text-textColor tracking-wide">
            {aluno.nome}
          </div>
          {sortedPlanning?.map((planning, i) => (
            <div
              key={i}
              className="flex flex-col gap-2.5 py-2.5 px-3 bg-background03 rounded-md text-textColor"
            >
              <div className="flex items-center justify-between px-1 text-[14px] md:text-[16px]">
                <div className="flex gap-[2.5px]">
                  <div>
                    {allMonths[planning.daysAndSubjects[0].month - 1].name}
                  </div>
                  <div>/</div>
                  <div>{`${planning.year}`}</div>
                </div>
                <div className="flex gap-1.5 items-center">
                  <div>
                    {withZeroOrNot(planning.daysAndSubjects[0].date)}/
                    {withZeroOrNot(planning.daysAndSubjects[0].month)}
                  </div>
                  -
                  <div className="flex gap-1">
                    {withZeroOrNot(
                      planning.daysAndSubjects[
                        planning.daysAndSubjects.length - 1
                      ].date
                    )}
                    /{withZeroOrNot(planning.daysAndSubjects[0].month)}
                  </div>
                </div>
              </div>
              <div className="flex justify-between w-full gap-2 md:gap-2 p-2 bg-background01 rounded-md">
                <Button
                  whileHover={{ scale: 1 }}
                  whileTap={{ scale: 0.97, transition: { duration: 0.01 } }}
                  className="!text-[12px] md:!text-[14px] w-full !px-4 !bg-background02 dark:!bg-background03 brightness-110 hover:brightness-[1.06] dark:hover:brightness-[1.02] text-textColor"
                  onClick={() => {
                    setPlanning(planning);
                    setIsOpen(true);
                  }}
                >
                  Abrir
                </Button>
                <Button
                  whileHover={{ scale: 1 }}
                  whileTap={{ scale: 0.97, transition: { duration: 0.01 } }}
                  className="!text-[12px] md:!text-[14px] w-full !px-4 !bg-background02 dark:!bg-background03 brightness-110 hover:brightness-[1.06] dark:hover:brightness-[1.02] text-textColor"
                  onClick={() => {
                    router.push(`/planning/edit-planning/${idAluno}/${i}`);
                  }}
                >
                  Editar
                </Button>
                <Button
                  whileHover={{ scale: 1 }}
                  whileTap={{ scale: 0.97, transition: { duration: 0.01 } }}
                  className="!text-[12px] md:!text-[14px] w-full !px-4 !bg-background02 dark:!bg-background03 brightness-110 hover:brightness-[1.06] dark:hover:brightness-[1.02] text-textColor"
                  onClick={() => {
                    setIsOpenDelete(true);
                    setPlanning(planning);
                  }}
                >
                  Excluir
                </Button>
              </div>
            </div>
          ))}

          {isOpen && (
            <PlanningPDF
              daysAndSubjects={planning?.daysAndSubjects!}
              idAluno={idAluno}
              setError={setError}
              setIsOpen={setIsOpen}
              subjectPerDay={planning?.subjectPerDay!}
              setIsPosting={() => {}}
            />
          )}

          {isOpenDelete && (
            <Modal className="flex flex-col gap-2" setIsOpen={setIsOpenDelete}>
              <div className="rounded-md p-3 bg-background02 text-center">
                Certifique-se de que realmente desejas excluir esse
                planejamento, pois essa ação é irreversível.
              </div>
              <Button
                whileHover={{ scale: 1 }}
                className="!bg-errorButton"
                onClick={() => {
                  deletePlanning({ idAluno, planningId: planning?.id! });
                }}
              >
                Excluir
              </Button>
            </Modal>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </Container>
  );
};

export default AllPlannings;
