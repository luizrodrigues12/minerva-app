import SectionComp from "@/components/page_/SectionComp";
import SubjectForm from "@/components/forms/SubjectForm";

const page = async ({ params }: { params: Promise<{ idAluno: string }> }) => {
  const idAluno = (await params).idAluno;
  return (
    <SectionComp>
      <SubjectForm idAluno={idAluno} />
    </SectionComp>
  );
};

export default page;
