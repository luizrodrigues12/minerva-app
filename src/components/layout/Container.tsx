import { ReactNode } from "react";

type Props = { children: ReactNode; className?: string };

const Container = ({ children, className }: Props) => {
  return (
    <div className={`p-3 md:p-4 lg:p-6 xl:p-6 2xl:p-8 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
