import SideBarDesktop from "@/components/layout/SideBarDesktop";
import DeleteStudentComp from "@/components/student/delete_student/DeleteStudentComp";

const page = async ({ params }: { params: Promise<{ idAluno: string }> }) => {
  const idAluno = (await params).idAluno;

  return (
    <SideBarDesktop>
      <DeleteStudentComp idAluno={idAluno} />
    </SideBarDesktop>
  );
};

export default page;
