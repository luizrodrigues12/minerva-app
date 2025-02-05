"use client";

import Container from "@/components/layout/Container";
import SelectStudent from "@/components/layout/SelectStudent";
import { useUserContext } from "@/contexts/userData";
import React, { useState } from "react";

const AddPlanningForm = () => {
  const { user } = useUserContext();
  const alunos = user.alunos;
  const [option, setOption] = useState("Escolha um aluno.");
  const [idAluno, setIdAluno] = useState("");

  return (
    <Container>
      <div className="text-textColor">
        <div className="flex flex-col gap-2">
          <div className="text-[16px] md:text-[18px]">Aluno</div>
          <SelectStudent
            setOption={setOption}
            setValue={setIdAluno}
            value={idAluno}
            option={option}
          />
        </div>
      </div>
    </Container>
  );
};

export default AddPlanningForm;
