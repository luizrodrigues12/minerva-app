"use client";

import { useEffect } from "react";
import StudentsContainer from "../home/StudentsContainer";
import { useSectionContext } from "@/contexts/section";

const PlannersPage = () => {
  const { setSection } = useSectionContext();

  useEffect(() => {
    setSection("planning");
  }, []);

  return <StudentsContainer isPlanning={true} />;
};

export default PlannersPage;
