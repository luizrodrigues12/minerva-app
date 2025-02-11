import SideBarDesktop from "@/components/layout/SideBarDesktop";
import EditPlanningForm from "@/components/planning/edit-planning/[idAluno]/EditPlanningForm";

const page = async ({
  params,
}: {
  params: Promise<{ idAluno: string; numberPlanning: number }>;
}) => {
  const { idAluno, numberPlanning } = await params;
  return (
    <SideBarDesktop>
      <EditPlanningForm
        idAlunoParam={idAluno}
        numberPlanning={numberPlanning}
      />
    </SideBarDesktop>
  );
};

export default page;
