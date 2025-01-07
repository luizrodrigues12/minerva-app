import { motion } from "motion/react";
import { InputHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends InputHTMLAttributes<HTMLDivElement> {}

const Button = ({ children, onClick, className, style }: ButtonProps) => {
  return (
    <motion.div
      whileTap={{ scale: 0.99 }}
      whileHover={{ scale: 1.01 }}
      className={`bg-roxominerva font-inter py-2 px-10 flex items-center justify-center text-[14px] text-buttonText rounded-[4px] hover:bg-buttonHover hover:text-zinc-100 cursor-pointer xl:text-[16px] ${className}`}
      style={style ? { boxShadow: "-2px 2px 5px #00000020" } : style}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default Button;
