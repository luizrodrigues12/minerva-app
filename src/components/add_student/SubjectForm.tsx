"use client";

import CheckComp from "@/components/add_student/CheckComp";
import { useState } from "react";
import { motion } from "motion/react";
import { MateriaType } from "@/models/MateriasModel";
import Accordion from "../layout/Accordion";

interface Props {
  idAluno: string;
  nomeAluno: string;
  subjects: Array<MateriaType>;
  error: any;
}

const SubjectForm = ({ subjects, error }: Props) => {
  const [AllCheckeds, setAllCheckeds] = useState(false);

  const subjectsSorted = subjects?.sort((a, b) =>
    a.ordem < b.ordem ? -1 : a.ordem > b.ordem ? 1 : 0
  );

  const checkAll = (e: any) => {
    e.preventDefault();
    const mat = document.getElementsByName("subject");
    mat.forEach((des: any) =>
      AllCheckeds ? (des.checked = false) : (des.checked = true)
    );
    setAllCheckeds(!AllCheckeds);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="md:self-center rounded-lg md:w-[400px] mb-3 w-full md:px-8"
      >
        <hr className="bg-zinc-800 border-0 h-0.5 my-2" />
        <div className="form_register">
          <div className="flex justify-between">
            <h2 className="text-xl font-medium tracking-wide py-1 px-1 text-zinc-200">
              Matérias
            </h2>
            <div className="flex items-center justify-between">
              <button onClick={(e) => checkAll(e)} className="text-zinc-200">
                {AllCheckeds ? "desmarcar tudo" : "selecionar tudo"}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2 text-[14px]">
            <div className="flex flex-col gap-2">
              {/* PORT 6 ANO */}
              <Accordion
                textLeft="português"
                textRight="6° Ano"
                classNameContent="flex flex-col gap-2 mt-2 px-2"
              >
                {subjectsSorted.map((materia, i) => {
                  if (materia.ordem <= 10 && materia.materia === "português") {
                    return (
                      <CheckComp
                        animateComp={{ opacity: [0, 1] }}
                        transition={{ delay: 0, duration: 0.2 }}
                        key={i}
                        text={materia.nome}
                        name="subject"
                        id={materia._id!}
                        htmlFor={materia.nome}
                        value={materia._id!}
                      />
                    );
                  }
                })}
              </Accordion>
              {/* PORT 1 ANO */}
              <Accordion
                textLeft="português"
                textRight="1° Ano"
                classNameContent="flex flex-col gap-2 mt-2 px-2"
              >
                {subjectsSorted.map((materia, i) => {
                  if (materia.ordem > 10 && materia.materia === "português") {
                    return (
                      <CheckComp
                        animateComp={{ opacity: [0, 1] }}
                        transition={{ delay: 0 }}
                        key={i}
                        text={materia.nome}
                        name="subject"
                        id={materia._id!}
                        htmlFor={materia.nome}
                        value={materia._id!}
                      />
                    );
                  }
                })}
              </Accordion>
              {/* MAT 6 ANO */}
              <Accordion
                textLeft="matemática"
                textRight="6° Ano"
                classNameContent="flex flex-col gap-2 mt-2 px-2"
              >
                {subjectsSorted.map((materia, i) => {
                  if (materia.ordem <= 15 && materia.materia === "matemática") {
                    return (
                      <CheckComp
                        animateComp={{ opacity: [0, 1] }}
                        transition={{ delay: 0 }}
                        key={i}
                        text={materia.nome}
                        name="subject"
                        id={materia._id!}
                        htmlFor={materia.nome}
                        value={materia._id!}
                      />
                    );
                  }
                })}
              </Accordion>
              {/* MAT 1 ANO */}
              <Accordion
                textLeft="Matemática"
                textRight="1° Ano"
                classNameContent="flex flex-col gap-2 mt-2 px-2"
              >
                {subjectsSorted.map((materia, i) => {
                  if (materia.ordem > 15 && materia.materia == "matemática") {
                    return (
                      <CheckComp
                        animateComp={{ opacity: [0, 1] }}
                        transition={{ delay: 0 }}
                        key={i}
                        text={materia.nome}
                        name="subject"
                        id={materia._id!}
                        htmlFor={materia.nome}
                        value={materia._id!}
                      />
                    );
                  }
                })}
              </Accordion>
            </div>

            {error && (
              <p className="text-[14px] py-0.5 bg-zinc-900 text-center text-[#FAA139]">
                {error}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SubjectForm;
