import SideBarDesktop from "@/components/layout/SideBarDesktop";
import UserDataComp from "@/components/profile/UserDataComp";

const page = async () => {
  return (
    <SideBarDesktop>
      <UserDataComp />;
    </SideBarDesktop>
  );
};

export default page;
