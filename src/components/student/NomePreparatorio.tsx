import { motion } from "motion/react";
import { useUserContext } from "@/contexts/userData";
import { ShareAll } from "flowbite-react-icons/outline";

type Props = {
  idAluno: string;
};

const NomePreparatorio = ({ idAluno }: Props) => {
  const { user } = useUserContext();
  const alunos = user.alunos?.filter((aluno) => aluno.idAluno === idAluno);
  const aluno = alunos![0];

  return (
    <div className="flex flex-col gap-1.5 text-textwhite w-full rounded-md bg-background02 text-[14px] md:text-[16px]">
      <div className="bg-background03 p-2.5 text-[#303030] px-3 rounded-md relative">
        <p>{aluno.nome}</p>
        <motion.div
          whileHover={{ scale: 1.05, transition: { duration: 0.05 } }}
          whileTap={{ scale: 0.99 }}
          className="absolute top-[8px] right-3"
        >
          <ShareAll
            strokeWidth={1.5}
            className="size-[24px] md:size-[28px] cursor-pointer text-corIcones hover:text-roxominerva"
            onClick={() =>
              navigator.share({
                title: `Informações de ${aluno.nome}`,
                url: `${process.env.HOST}/parents/get_subjects/${idAluno}`,
              })
            }
          />
        </motion.div>
      </div>
      <div className="bg-background03 p-2.5 text-[#303030] px-3 rounded-md">
        {aluno.preparatorio?.map((prep, i) =>
          prep == "aplicação"
            ? prep[0].toUpperCase() + prep.substring(1) + " "
            : prep.toUpperCase() + " "
        )}
      </div>
    </div>
  );
};

export default NomePreparatorio;
