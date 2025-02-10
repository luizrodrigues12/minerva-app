import SideBarDesktop from "@/components/layout/SideBarDesktop";
import AllPlannings from "@/components/planning/add-planning/AllPlannings";

const page = async ({ params }: { params: Promise<{ idAluno: string }> }) => {
  const { idAluno } = await params;
  return (
    <SideBarDesktop>
      <AllPlannings idAluno={idAluno} />
    </SideBarDesktop>
  );
};

export default page;
