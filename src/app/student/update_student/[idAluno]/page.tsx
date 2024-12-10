import UpdateStudentForm from "@/components/forms/UpdateStudentForm";

const page = async ({ params }: { params: Promise<{ idAluno: string }> }) => {
  const parametros = await params;
  const idAluno = (await params).idAluno;

  return <UpdateStudentForm idAluno={idAluno} />;
};

export default page;
