"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import Loading from "@/components/layout/Loading";
import Button from "@/components/layout/Button";
import { useUserContext } from "@/contexts/userData";
import Container from "@/components/layout/Container";
import { useDeleteStudent } from "@/hooks/useDeleteStudent";

const DeleteStudentComp = ({ idAluno }: { idAluno: string }) => {
  const router = useRouter();
  const { mutate } = useDeleteStudent();
  const { getAluno } = useUserContext();
  const [isPosting, setIsPosting] = useState(false);
  const aluno = getAluno(idAluno);
  const [error, setError] = useState("");

  const deleteStudent = async () => {
    setIsPosting(true);
    mutate(
      { idAluno },
      {
        onError(error) {
          setError(error.message);
        },
      }
    );
  };

  useEffect(() => {
    if (!aluno) {
      router.replace("/home");
    }
  }, []);

  return (
    <Container>
      <div className="w-full flex flex-col">
        {isPosting || !aluno ? (
          <Loading />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className=" md:self-center rounded-lg w-full"
          >
            <div className="flex flex-col justify-center gap-2">
              <div className="flex flex-col gap-4 text-textColor">
                <div className="flex flex-col gap-2">
                  <h3 className="text-[16px] md:text-[18px]">Username</h3>
                  <div className="bg-background03 p-2.5 px-3 rounded-md text-[14px] md:text-[16px]">
                    {aluno.nome}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-[16px] md:text-[18px]">
                    Preparatório(s)
                  </h3>
                  <div className="bg-background03 p-2.5 px-3 rounded-md text-[14px] md:text-[16px]">
                    {aluno.preparatorio?.map((prep: any, i: any) =>
                      prep == "aplicação"
                        ? prep[0].toUpperCase() + prep.substring(1) + " "
                        : prep.toUpperCase() + " "
                    )}
                  </div>

                  <div className="bg-background03 p-3 rounded-md text-[14px] md:text-[16px]">
                    Certifique-se de que realmente desejas remover esse aluno,
                    pois essa ação é irreversível.
                  </div>
                </div>

                {error && (
                  <p className="text-[12px] md:text-[14px] text-errorColor text-center">
                    {error}
                  </p>
                )}

                <Button
                  className="bg-errorButton"
                  onClick={() => {
                    deleteStudent();
                    setError("");
                  }}
                >
                  Remover Aluno
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </Container>
  );
};

export default DeleteStudentComp;
