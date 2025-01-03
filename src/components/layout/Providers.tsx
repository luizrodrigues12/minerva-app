import { SectionProvider } from "@/contexts/section";
import TanstackProvider from "@/contexts/TanstackProvider";
import { UserContextProvider } from "@/contexts/userData";
import { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <TanstackProvider>
      <SectionProvider>
        <UserContextProvider>{children}</UserContextProvider>
      </SectionProvider>
    </TanstackProvider>
  );
};

export default Providers;
