import SideBarDesktop from "@/components/layout/SideBarDesktop";
import SubjectsStudentForm from "@/components/parents/get_subjects/SubjectsStudentForm";

type Params = { token: string; idAluno: string };

const page = async ({ params }: { params: Promise<Params> }) => {
  const parametros = await params;
  const { idAluno } = parametros;
  return (
    <SideBarDesktop>
      <SubjectsStudentForm idAluno={idAluno} />
    </SideBarDesktop>
  );
};

export default page;
