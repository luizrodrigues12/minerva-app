"use client";

import { DarkModeProvider } from "@/contexts/darkMode";
import { SectionProvider } from "@/contexts/section";
import { SubjectsProvider } from "@/contexts/subjects";
import TanstackProvider from "@/contexts/TanstackProvider";
import { UserContextProvider } from "@/contexts/userData";
import { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <DarkModeProvider>
      <TanstackProvider>
        <SectionProvider>
          <SubjectsProvider>
            <UserContextProvider>{children}</UserContextProvider>
          </SubjectsProvider>
        </SectionProvider>
      </TanstackProvider>
    </DarkModeProvider>
  );
};

export default Providers;
