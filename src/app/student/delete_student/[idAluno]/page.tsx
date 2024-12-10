import DeleteStudentComp from "@/components/student/DeleteStudentComp";

const page = async ({ params }: { params: Promise<{ idAluno: string }> }) => {
  const parametros = await params;
  const idAluno = (await params).idAluno;

  return <DeleteStudentComp idAluno={idAluno} />;
};

export default page;
