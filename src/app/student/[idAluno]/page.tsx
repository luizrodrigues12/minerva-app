import SideBarDesktop from "@/components/layout/SideBarDesktop";
import InfoAlunoComp from "@/components/student/InfoAlunoComp";

const page = async ({ params }: { params: Promise<{ idAluno: string }> }) => {
  const parametros = await params;
  const idAluno = parametros.idAluno;

  return (
    <SideBarDesktop>
      <InfoAlunoComp idAluno={idAluno} />
    </SideBarDesktop>
  );
};

export default page;
