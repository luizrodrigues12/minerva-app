import ResetPassForm from "@/components/reset_password/ResetPassForm";

const page = async ({ params }: { params: Promise<{ userId: string }> }) => {
  const { userId } = await params;
  return <ResetPassForm id={userId} />;
};

export default page;
