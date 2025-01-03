import { SectionProvider } from "@/contexts/section";
import TanstackProvider from "@/contexts/TanstackProvider";
import { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <TanstackProvider>
      <SectionProvider>{children}</SectionProvider>
    </TanstackProvider>
  );
};

export default Providers;
