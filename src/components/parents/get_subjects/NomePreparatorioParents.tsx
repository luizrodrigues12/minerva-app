import { motion } from "motion/react";
import { ShareAll } from "flowbite-react-icons/outline";
import { AlunoObj } from "@/models/userModel";
import Loading from "@/components/layout/Loading";

type Props = {
  idAluno: string;
  aluno: AlunoObj;
};

const NomePreparatorioParents = ({ idAluno, aluno }: Props) => {
  return (
    <div>
      {aluno.nome === undefined ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-1.5 text-textColor w-full rounded-md bg-background02 text-[14px] md:text-[16px]">
          <div className="bg-background03 h-10 px-3 flex items-center justify-between rounded-md">
            <p>{aluno?.nome}</p>
            <div className="flex gap-2.5 items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.05, transition: { duration: 0.05 } }}
                whileTap={{ scale: 0.99 }}
              >
                <ShareAll
                  strokeWidth={1.5}
                  className="size-[28px] cursor-pointer text-corIcones hover:text-corIconesHover"
                  onClick={() =>
                    navigator.share({
                      title: `Informações de ${aluno?.nome}`,
                      url: `${process.env.HOST}/parents/get_subjects/${idAluno}`,
                    })
                  }
                />
              </motion.div>
            </div>
          </div>
          <div className="bg-background03 h-10 flex items-center px-3 rounded-md justify-between">
            {aluno?.preparatorio?.map((prep, i) =>
              prep == "aplicação"
                ? prep[0].toUpperCase() + prep.substring(1) + " "
                : prep.toUpperCase() + " "
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NomePreparatorioParents;
