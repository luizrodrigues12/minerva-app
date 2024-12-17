import ResetPassForm from "@/components/forms/ResetPassForm";
import SectionComp from "@/components/page_/SectionComp";

const page = async ({ params }: any) => {
  const { userId } = await params;
  return <ResetPassForm />;
};

export default page;
