import SectionComp from "@/components/page_/SectionComp";
import SubjectsStudentForm from "@/components/student/SubjectsStudentForm";
import React from "react";

type Params = { token: string; idAluno: string };

const page = async ({ params }: { params: Promise<Params> }) => {
  const parametros = await params;
  const { idAluno, token } = parametros;
  return (
    <section className="w-full flex flex-col justify-center height_pattern">
      <SubjectsStudentForm idAluno={idAluno} />
    </section>
  );
};

export default page;
