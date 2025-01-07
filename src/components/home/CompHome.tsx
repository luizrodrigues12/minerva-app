"use client";

import { useEffect } from "react";
import Loading from "../layout/Loading";
import { unstable_noStore as noStore } from "next/cache";
import PerfilContainer from "./PerfilContainer";
import LinkContainer from "./LinkContainer";
import { useSectionContext } from "@/contexts/section";

import StudentsContainer from "./StudentsContainer";
import { useUserContext } from "@/contexts/userData";
import Image from "next/image";

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
        <div className="bg-background01 px-[195px] ">
          <div className="flex w-full gap-10 min-h-screen bg-background01 font-inter lg:gap-12">
            <div className="relative bg-background02 border-x-2 border-borderColor shadow-md">
              <PerfilContainer username={user.username} />
              <LinkContainer />
            </div>
            <div className="min-h-full bg-background02 border-x-2 border-borderColor shadow-md">
              <StudentsContainer />
            </div>
            <div className="min-h-full min-w-[400px] background-art bg-background02 border-x-[2px] border-borderColor shadow-md"></div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default PageHome;
