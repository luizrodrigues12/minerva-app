import { ReactNode } from "react";

type Props = { children: ReactNode; className?: string };

const Container = ({ children, className }: Props) => {
  return (
    <div
      className={`flex flex-col justify-center items-center min-h-screen px-[195px] ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
