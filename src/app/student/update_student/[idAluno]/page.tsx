import UpdateStudentForm from "@/components/forms/UpdateStudentForm";
import SectionComp from "@/components/page_/SectionComp";

const page = async ({ params }: { params: Promise<{ idAluno: string }> }) => {
  const parametros = await params;
  const idAluno = (await params).idAluno;

  return <UpdateStudentForm idAluno={idAluno} />;
};

export default page;
