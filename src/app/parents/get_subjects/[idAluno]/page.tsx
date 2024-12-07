import SubjectsStudentForm from "@/components/student/SubjectsStudentForm";
import React from "react";

type Params = { token: string; idAluno: string };

const page = async ({ params }: { params: Promise<Params> }) => {
  const parametros = await params;
  const { idAluno, token } = parametros;
  return <SubjectsStudentForm idAluno={idAluno} />;
};

export default page;
