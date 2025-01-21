"use client";

import { DarkModeProvider } from "@/contexts/darkMode";
import { SectionProvider } from "@/contexts/section";
import { SubjectsProvider } from "@/contexts/subjects";
import TanstackProvider from "@/contexts/TanstackProvider";
import { UserContextProvider } from "@/contexts/userData";
import { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <TanstackProvider>
      <DarkModeProvider>
        <SectionProvider>
          <SubjectsProvider>
            <UserContextProvider>{children}</UserContextProvider>
          </SubjectsProvider>
        </SectionProvider>
      </DarkModeProvider>
    </TanstackProvider>
  );
};

export default Providers;
