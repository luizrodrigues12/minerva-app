import SideBarDesktop from "@/components/layout/SideBarDesktop";
import ChangeEmailPage from "@/components/profile/change_email/ChangeEmailPage";

const page = async ({
  params,
}: {
  params: Promise<{ emailTokenReceived: string }>;
}) => {
  const { emailTokenReceived } = await params;

  return (
    <SideBarDesktop>
      <ChangeEmailPage
        emailTokenReceived={emailTokenReceived.replace("%40", "@")}
      />
    </SideBarDesktop>
  );
};

export default page;
