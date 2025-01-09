"use client";

import { useEffect } from "react";
import Loading from "../layout/Loading";
import { unstable_noStore as noStore } from "next/cache";
import { useSectionContext } from "@/contexts/section";
import StudentsContainer from "./StudentsContainer";
import { useUserContext } from "@/contexts/userData";
import SideBarDesktop from "../layout/SideBarDesktop";
import { useAddStudent } from "@/hooks/useAddStudent";

const PageHome = () => {
  const { setSection } = useSectionContext();
  const { isFetching } = useUserContext();
  noStore();

  useEffect(() => {
    setSection("students");
  }, []);

  return (
    <div>
      {isFetching ? (
        <Loading />
      ) : (
        <>
          <SideBarDesktop>
            <StudentsContainer />
          </SideBarDesktop>
        </>
      )}
    </div>
  );
};

export default PageHome;
