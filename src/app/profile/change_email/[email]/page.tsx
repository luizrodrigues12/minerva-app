import SideBarDesktop from "@/components/layout/SideBarDesktop";
import ChangeEmailPage from "@/components/profile/change_email/ChangeEmailPage";

const page = async ({ params }: { params: Promise<{ email: string }> }) => {
  const { email } = await params;

  return (
    <SideBarDesktop>
      <ChangeEmailPage email={email.replace("%40", "@")} />
    </SideBarDesktop>
  );
};

export default page;
