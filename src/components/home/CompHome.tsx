"use client";

import { useEffect } from "react";
import Loading from "../layout/Loading";
import { unstable_noStore as noStore } from "next/cache";
import { useSectionContext } from "@/contexts/section";
import StudentsContainer from "./StudentsContainer";
import { useUserContext } from "@/contexts/userData";
import SideBarDesktop from "./SideBarDesktop";

const PageHome = () => {
  const { setSection } = useSectionContext();
  const { user } = useUserContext();
  noStore();

  useEffect(() => {
    setSection("students");
  }, []);

  return (
    <div>
      {user ? (
        <>
          <SideBarDesktop>
            <StudentsContainer />
          </SideBarDesktop>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default PageHome;
