import ResetPassForm from "@/components/reset_password/ResetPassForm";

const page = async ({ params }: any) => {
  const { userId } = await params;
  return <ResetPassForm />;
};

export default page;
