import ForgetPassForm from "@/components/forget_pass/ForgetPassForm";

const page = async ({ params }: any) => {
  const { userId } = await params;
  return <ForgetPassForm />;
};

export default page;
