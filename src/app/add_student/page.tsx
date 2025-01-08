"use client";

import StudentForm from "@/components/add_student/StudentForm";
import SideBarDesktop from "@/components/home/SideBarDesktop";

const addStudent = () => {
  return (
    <SideBarDesktop>
      <StudentForm />
    </SideBarDesktop>
  );
};

export default addStudent;
