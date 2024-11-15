import ForgetPassForm from "@/components/forms/ForgetPassForm";
import SectionComp from "@/components/page_/SectionComp";

const page = async ({ params }: any) => {
  const { userId } = await params;
  return (
    <SectionComp>
      <ForgetPassForm />
    </SectionComp>
  );
};

export default page;
