"use client";

import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { motion } from "motion/react";
import Loading from "@/components/layout/Loading";
import Button from "@/components/layout/Button";
import { useUserContext } from "@/contexts/userData";

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
    <div className="w-full flex flex-col">
      {isPosting || !aluno ? (
        <Loading />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className=" md:self-center rounded-lg w-full p-6 py-2 md:py-4 lg:p-6 xl:p-8"
        >
          <div className="flex flex-col justify-center gap-2">
            <div className="flex flex-col gap-2">
              <h3 className="text-[18px] text-black">Username</h3>
              <div className="bg-background01 p-2 text-[#404040] px-3 rounded-md">
                {aluno.nome}
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-[18px] text-black mb-1">Preparatório(s)</h3>
                <div className="bg-background01 p-2 text-[#404040] px-3 rounded-md">
                  {aluno.preparatorio?.map((prep: any, i: any) =>
                    prep == "aplicação"
                      ? prep[0].toUpperCase() + prep.substring(1) + " "
                      : prep.toUpperCase() + " "
                  )}
                </div>
              </div>
            </div>

            <div className="bg-background01 p-3 text-[#404040] rounded-md">
              Certifique-se de que realmente desejas remover esse aluno, pois
              essa ação é irreversível.
            </div>
            <Button
              className="!bg-red-800 hover:!bg-[#a51e1e]"
              onClick={() => deleteStudent()}
            >
              Remover Aluno
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DeleteStudentComp;
