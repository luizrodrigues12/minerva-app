import { ReactNode } from "react";

type Props = { children: ReactNode; className?: string };

const Container = ({ children, className }: Props) => {
  return (
    <div className={`p-6 py-3 md:py-4 lg:p-6 xl:p-6 2xl:p-8 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
