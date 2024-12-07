import InfoAlunoComp from "@/components/student/InfoAlunoComp";
import SectionComp from "@/components/page_/SectionComp";

const page = async ({ params }: { params: Promise<{ idAluno: string }> }) => {
  const parametros = await params;
  const idAluno = parametros.idAluno;
  return <InfoAlunoComp idAluno={idAluno} />;
};

export default page;
