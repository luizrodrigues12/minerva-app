import DeleteStudentComp from "@/components/student/delete_student/DeleteStudentComp";

const page = async ({ params }: { params: Promise<{ idAluno: string }> }) => {
  const idAluno = (await params).idAluno;

  return <DeleteStudentComp idAluno={idAluno} />;
};

export default page;
