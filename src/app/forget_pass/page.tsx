import ForgetPassForm from "@/components/forms/ForgetPassForm";

const page = async ({ params }: any) => {
  const { userId } = await params;
  return <ForgetPassForm />;
};

export default page;
