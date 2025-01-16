import SideBarDesktop from "@/components/layout/SideBarDesktop";
import VerifyEmailPage from "@/components/profile/verify_email/VerifyEmailPage";

const page = async ({ params }: { params: Promise<{ email: string }> }) => {
  const { email } = await params;
  return (
    <SideBarDesktop>
      <VerifyEmailPage email={email.replace("%40", "@")} />
    </SideBarDesktop>
  );
};

export default page;
