import { motion } from "motion/react";
import { useRouter } from "nextjs-toploader/app";
import { ReactNode } from "react";

type ButtonProps = {
  children: string | ReactNode;
  onClick?: () => void;
  className?: string;
};

const Button = ({ children, onClick, className }: ButtonProps) => {
  const router = useRouter();

  return (
    <motion.div
      whileTap={{ scale: 0.99 }}
      whileHover={{ scale: 1.01 }}
      className={`bg-roxominerva py-2 px-10 flex items-center justify-center text-[14px] text-buttonText rounded-[4px] hover:bg-buttonHover hover:text-zinc-100 cursor-pointer xl:text-[16px] ${className}`}
      style={{ boxShadow: "-2px 2px 5px #00000020" }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default Button;
