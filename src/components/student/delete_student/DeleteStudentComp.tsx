"use client";

import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { motion } from "motion/react";
import Loading from "@/components/layout/Loading";
import Button from "@/components/layout/Button";
import { useUserContext } from "@/contexts/userData";
import Container from "@/components/layout/Container";

const DeleteStudentComp = ({ idAluno }: { idAluno: string }) => {
  const router = useRouter();
  const token = getCookie("authorization");
  const { getAluno } = useUserContext();
  const [isPosting, setIsPosting] = useState(false);
  const aluno = getAluno(idAluno);

  const deleteStudent = async () => {
    setIsPosting(true);
    const result = await fetch(
      `${process.env.HOST}/api/student/delete_student/`,
      {
        method: "DELETE",
        body: JSON.stringify({ token: token, idAluno: idAluno }),
      }
    );
    window.location.href = "/home";
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

                <Button
                  className="!bg-red-800 hover:!bg-[#a51e1e]"
                  onClick={() => deleteStudent()}
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
