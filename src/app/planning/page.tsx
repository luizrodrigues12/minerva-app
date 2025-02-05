import SideBarDesktop from "@/components/layout/SideBarDesktop";
import PlannersPage from "@/components/planning/Planning";
import React from "react";

const page = () => {
  return (
    <SideBarDesktop>
      <PlannersPage />
    </SideBarDesktop>
  );
};

export default page;
