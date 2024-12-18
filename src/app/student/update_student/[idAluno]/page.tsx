import UpdateStudentForm from "@/components/student/update_student/UpdateStudentForm";

const page = async ({ params }: { params: Promise<{ idAluno: string }> }) => {
  const idAluno = (await params).idAluno;

  return <UpdateStudentForm idAluno={idAluno} />;
};

export default page;
