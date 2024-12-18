import SectionComp from "@/components/pages/SectionComp";
import SubjectsStudentForm from "@/components/student/SubjectsStudentForm";
import React from "react";

type Params = { token: string; idAluno: string };

const page = async ({ params }: { params: Promise<Params> }) => {
  const parametros = await params;
  const { idAluno, token } = parametros;
  return (
    <SectionComp>
      <SubjectsStudentForm idAluno={idAluno} />
    </SectionComp>
  );
};

export default page;
