import SideBarDesktop from "@/components/layout/SideBarDesktop";
import UpdateStudentForm from "@/components/student/update_student/UpdateStudentForm";

const page = async ({ params }: { params: Promise<{ idAluno: string }> }) => {
  const idAluno = (await params).idAluno;

  return (
    <SideBarDesktop>
      <UpdateStudentForm idAluno={idAluno} />
    </SideBarDesktop>
  );
};

export default page;
