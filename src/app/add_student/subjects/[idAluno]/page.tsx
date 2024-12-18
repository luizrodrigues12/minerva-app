import SubjectForm from "@/components/add_student/subjects/SubjectForm";

const page = async ({ params }: { params: Promise<{ idAluno: string }> }) => {
  const idAluno = (await params).idAluno;
  return <SubjectForm idAluno={idAluno} />;
};

export default page;
