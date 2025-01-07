import { ReactNode } from "react";
import PerfilContainer from "./PerfilContainer";
import LinkContainer from "./LinkContainer";
import StudentsContainer from "./StudentsContainer";
import { useUserContext } from "@/contexts/userData";

type SideBarDesktopProps = {
  children: ReactNode;
};

const SideBarDesktop = ({ children }: SideBarDesktopProps) => {
  const { user } = useUserContext();

  return (
    <div className="bg-background01 px-[195px] ">
      <div className="flex w-full gap-10 min-h-screen bg-background01 font-inter lg:gap-12 justify-between">
        <div className="relative bg-background02 border-x-2 border-borderColor shadow-md">
          <PerfilContainer username={user.username} />
          <LinkContainer />
        </div>
        <div className="min-h-full bg-background02 border-x-2 border-borderColor shadow-md">
          {children}
        </div>
        <div className="min-h-full min-w-[400px] background-art bg-background02 border-x-[2px] border-borderColor shadow-md" />
      </div>
    </div>
  );
};

export default SideBarDesktop;
