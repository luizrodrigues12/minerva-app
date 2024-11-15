import DeleteStudentComp from "@/components/student/DeleteStudentComp";
import SectionComp from "@/components/page_/SectionComp";

const page = async ({ params }: { params: Promise<{ idAluno: string }> }) => {
  const parametros = await params;
  const idAluno = (await params).idAluno;

  return (
    <SectionComp>
      <DeleteStudentComp idAluno={idAluno} />
    </SectionComp>
  );
};

export default page;
