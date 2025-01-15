"use client";

import CheckComp from "@/components/add_student/CheckComp";
import { useState } from "react";
import { motion } from "motion/react";
import Accordion from "../layout/Accordion";
import { useSubjectsContext } from "@/contexts/subjects";
import { unstable_noStore as noStore } from "next/cache";
import Loading from "../layout/Loading";

interface Props {
  error: any;
}

const SubjectForm = ({ error }: Props) => {
  noStore();
  const [AllCheckeds, setAllCheckeds] = useState(false);
  const { subjects } = useSubjectsContext();
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
    <div>
      {subjects ? (
        <div className="w-full flex flex-col justify-center items-start text-black text-[16px]">
          <motion.div className="rounded-lg w-full">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <h2 className="tracking-wide pl-1 text-[16px] lg:text-[18px]">
                  Matérias
                </h2>

                <div className="flex items-center justify-between pr-1">
                  <button
                    onClick={(e) => checkAll(e)}
                    className="text-[12px] md:text-[14px]"
                  >
                    {AllCheckeds ? "desmarcar tudo" : "selecionar tudo"}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2 text-[14px]">
                <div className="flex flex-col gap-1.5">
                  {/* PORT 6 ANO */}
                  <Accordion textLeft="português" textRight="6° Ano">
                    {subjectsSorted.map((materia, i) => {
                      if (
                        materia.ordem <= 10 &&
                        materia.materia === "português"
                      ) {
                        return (
                          <CheckComp
                            key={i}
                            text={materia.nome}
                            name="subject"
                            id={materia._id!}
                            value={JSON.stringify(materia)}
                            className="shadow-sm"
                          />
                        );
                      }
                    })}
                  </Accordion>
                  {/* PORT 1 ANO */}
                  <Accordion textLeft="português" textRight="1° Ano">
                    {subjectsSorted.map((materia, i) => {
                      if (
                        materia.ordem > 10 &&
                        materia.materia === "português"
                      ) {
                        return (
                          <CheckComp
                            key={i}
                            text={materia.nome}
                            name="subject"
                            id={materia._id!}
                            value={JSON.stringify(materia)}
                            className="shadow-sm"
                          />
                        );
                      }
                    })}
                  </Accordion>
                  {/* MAT 6 ANO */}
                  <Accordion textLeft="matemática" textRight="6° Ano">
                    {subjectsSorted.map((materia, i) => {
                      if (
                        materia.ordem <= 15 &&
                        materia.materia === "matemática"
                      ) {
                        return (
                          <CheckComp
                            key={i}
                            text={materia.nome}
                            name="subject"
                            id={materia._id!}
                            value={JSON.stringify(materia)}
                            className="shadow-sm"
                          />
                        );
                      }
                    })}
                  </Accordion>
                  {/* MAT 1 ANO */}
                  <Accordion textLeft="Matemática" textRight="1° Ano">
                    {subjectsSorted.map((materia, i) => {
                      if (
                        materia.ordem > 15 &&
                        materia.materia == "matemática"
                      ) {
                        return (
                          <CheckComp
                            key={i}
                            text={materia.nome}
                            name="subject"
                            id={materia._id!}
                            value={JSON.stringify(materia)}
                            className="shadow-sm"
                          />
                        );
                      }
                    })}
                  </Accordion>
                </div>

                {error && (
                  <p className="text-[14px] py-0.5 text-center text-red-700">
                    {error}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default SubjectForm;
