import UpdateStudentForm from "@/components/forms/UpdateStudentForm";
import SectionComp from "@/components/page_/SectionComp";

const page = async ({ params }: { params: Promise<{ idAluno: string }> }) => {
  const parametros = await params;
  const idAluno = (await params).idAluno;

  return (
    <SectionComp>
      <UpdateStudentForm idAluno={idAluno} />
    </SectionComp>
  );
};

export default page;
